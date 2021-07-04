-- This is the file I used to write sql commands before executing them. The commented commands are ones that I ran to experiment, but didn't need for the application, in the end.
CREATE DATABASE postinger;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    posted_by INT,
    caption VARCHAR(3000),
    image_name VARCHAR(1000), 
    CONSTRAINT fk_posts_users
    FOREIGN KEY (posted_by)
    REFERENCES users(user_id)
);

CREATE TABLE votes (
    vote_id SERIAL PRIMARY KEY,
    post_id INT,
    voter INT, 
    CONSTRAINT fk_votes_posts
    FOREIGN KEY (post_id)
    REFERENCES posts(post_id),
    CONSTRAINT fk_votes_users
    FOREIGN KEY (voter)
    REFERENCES users(user_id)
);

-- CREATE TABLE votes(
--     vote_id SERIAL PRIMARY KEY,
--     post_id INT NOT NULL,
--     voter INT
--     );


--  DROP TABLE posts CASCADE;

-- SELECT * FROM posts ORDER BY post_id DESC LIMIT 5

-- SELECT post_id, caption, image_name, users.user_name FROM posts INNER JOIN users ON posts.posted_by = users.user_id;

SELECT post_id, caption, image_name, users.user_name FROM posts INNER JOIN users ON posts.posted_by = users.user_id ORDER BY post_id DESC OFFSET 1 LIMIT 2;

-- SELECT EXISTS(SELECT user_id FROM users WHERE user_id = 143);

SELECT voter FROM votes WHERE post_id = 2;

