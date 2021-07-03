import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';

const Vote = (props) => {
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState(23);

  //   change and post vote
  const changeVote = async () => {
    setVoted(true);
    setVotes(votes + 1);

    console.log(props.postID);
    const postId = props.postID;

    try {
      const res = await axios.post(
        'http://localhost:5000/newsfeed/vote',
        { postId, voted },
        {
          headers: {
            token: localStorage.token,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const voteInfo = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/newsfeed/votes/${props.postID}`,
        {
          headers: {
            token: localStorage.token,
          },
        }
      );

      const { voteCount, voted } = res.data;
      setVotes(voteCount);
      setVoted(voted);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    voteInfo();
  }, []);

  return (
    <Fragment>
      {voted ? (
        <Button onClick={changeVote} disabled variant="outline-secondary">
          {votes} Voted
        </Button>
      ) : (
        <Button onClick={changeVote} variant="outline-secondary">
          {votes} Vote
        </Button>
      )}
    </Fragment>
  );
};

export default Vote;
