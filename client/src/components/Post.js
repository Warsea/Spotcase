import React from 'react';
import Card from 'react-bootstrap/Card';
import Vote from './Vote';

const Post = (props) => {
  return (
    <Card className="my-2">
      <Card.Body>
        <Card.Title>{props.postData.user_name}</Card.Title>
        <Card.Text>
          <p style={{ whiteSpace: 'pre' }}>{props.postData.caption}</p>
        </Card.Text>
      </Card.Body>
      <Card.Img variant="bottom" src={`/images/${props.postData.image_name}`} />
      <Card.Footer className="bg-transparent border-success">
        <Vote postID={props.postData.post_id} />
      </Card.Footer>
    </Card>
  );
};

export default Post;
