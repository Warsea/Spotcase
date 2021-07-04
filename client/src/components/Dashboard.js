import axios from 'axios';
import React, { Fragment, useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import Button from 'react-bootstrap/Button';
import Post from './Post';
import InfiniteScroll from 'react-infinite-scroll-component';

const Dashboard = () => {
  const { setIsAuthenticated } = useContext(UserContext);
  const [name, setName] = useState('');
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  async function getName() {
    try {
      const res = await axios.get('http://localhost:5000/newsfeed/', {
        headers: {
          token: localStorage.token,
        },
      });
      console.log(res.data);
      setName(res.data.user_name);
    } catch (error) {
      console.log(error);
    }
  }

  const getPosts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/newsfeed/posts/${pageNumber}`,
        {
          headers: {
            token: localStorage.token,
          },
        }
      );
      if (res.data.length === 0) {
      } else {
        let copy = [...posts];
        let newPosts = [...new Set(copy.concat(res.data))];
        console.log(res.data);
        setPosts(newPosts);
        console.log(posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function nextPage() {
    setPageNumber((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    getName();
  }, []);
  useEffect(() => {
    getPosts();
  }, [pageNumber]);
  return (
    <div className="mt-2">
      <InfiniteScroll dataLength={posts.length} next={nextPage} hasMore={true}>
        {posts.length === 0 ? (
          <h3>No posts yet</h3>
        ) : (
          posts.map((post, index) => (
            <Post key={post.post_id} postData={post} />
          ))
        )}
      </InfiniteScroll>
    </div>
  );
};

export default Dashboard;
