const router = require('express').Router();
const { JsonWebTokenError } = require('jsonwebtoken');
const pool = require('../db');
const authorize = require('../middleware/authorization');
const multer = require('multer');

// multer setup
const fileStorageEngine = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, '../client/public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
});

var upload = multer({ storage: fileStorageEngine });

router.get('/', authorize, async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT user_name FROM users WHERE user_id = $1',
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('server error');
  }
});

// api for uploading image file
router.post('/upload', authorize, upload.single('file'), async (req, res) => {
  const { caption } = req.body;
  console.log(caption);

  try {
    if (req.file === null) {
      return res.status(400).json({ msg: 'No file was uploaded.' });
    }

    console.log(req.file.filename);
    const post = await pool.query(
      'INSERT INTO posts (posted_by, caption, image_name) VALUES ($1, $2, $3)',
      [req.user, caption, req.file.filename]
    );
    res.send('file stored.');
  } catch (error) {
    console.log(error.message);
    res.status(500).send('server error');
  }
});

// api for serving posts
router.get('/posts/:id', authorize, async (req, res) => {
  let pageNumber = req.params.id;
  let postSkip = pageNumber * 2;

  try {
    const posts = await pool.query(
      'SELECT post_id, caption, image_name, users.user_name FROM posts INNER JOIN users ON posts.posted_by = users.user_id ORDER BY post_id DESC OFFSET $1 LIMIT 2',
      [postSkip]
    );
    res.json(posts.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('server error');
  }
});

// api for serving vote count and whether user has voted on a post or not
router.get('/votes/:postID', authorize, async (req, res) => {
  const postId = parseInt(req.params.postID);

  if (!postId) {
    return res.json({ msg: 'Invalid post para.' });
  }

  try {
    const votes = await pool.query(
      'SELECT voter FROM votes WHERE post_id = $1',
      [postId]
    );

    if (votes.rows.length === 0) {
      return res.json({ voteCount: 0, voted: false });
    }

    let voted = false;
    const voteCount = votes.rows.length;

    votes.rows.forEach((vote) => {
      if (vote.voter === req.user) {
        voted = true;
      }
    });

    res.json({ voteCount, voted });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('server error');
  }
});

// api for casting vote
router.post('/vote', authorize, async (req, res) => {
  const { postId, vote } = req.body;

  if (!postId) {
    return res.json('Invalid vote.');
  }

  try {
    const voted = await pool.query(
      'INSERT INTO votes (post_id, voter) VALUES ($1, $2) RETURNING *',
      [postId, req.user]
    );

    res.json({ msg: 'Voted successfully!' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
