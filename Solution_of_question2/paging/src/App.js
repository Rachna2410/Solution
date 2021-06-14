import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import {} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';


const App = () => {
  const [posts, setPosts] = useState({page:2,per_page:6,total:12,total_pages:2,data:[],support:{}});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(3);

  let postsLength = Object.keys(posts).length;
 

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://reqres.in/api/users?page=2');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let page = Object.keys(posts);
  const currentPosts = page.slice(indexOfFirstPost, indexOfLastPost);
  

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={postsLength}
        paginate={paginate}
      />
    </div>
  );
};

export default App;