import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const AddPost = () => {
  const history = useHistory();
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose file');

  const changeCaption = (e) => {
    setCaption(e.target.value);
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('file', file);

    try {
      const api = 'http://localhost:5000/newsfeed/upload';
      await axios.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: localStorage.token,
        },
      });

      history.push('/');
    } catch (error) {
      if (error.response.status === 500) {
        console.log('There was a problem with server receiving file.');
      } else {
        console.log(error.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      <Form className="py-3" onSubmit={submit}>
        <h3 className="text-center my-3">Add a new post</h3>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="caption"
            value={caption}
            placeholder="Enter what you have to say..."
            onChange={changeCaption}
          />
        </Form.Group>

        <Form.File
          id="custom-file"
          label={filename}
          custom
          onChange={handleChange}
        />
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddPost;
