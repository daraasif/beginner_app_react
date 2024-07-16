import Header from './Header'
import Footer from './Footer'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import Missing from './Missing'
import About from './About'
// import { Route, Routes } from 'react'
import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { format } from 'date-fns'
import api from './api/posts'
import EditPost from './EditPost'
import useWindowSize from './hooks/useWindowSize'
import useAxiosFetch from './hooks/useAxiosFetch'


function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const { data, fetchError, isLoading } = useAxiosFetch('http://172.20.0.1:3500/posts')

  useEffect(() => {
    setPosts(data)
  }, [data])

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/posts');
  //       setPosts(response.data);
  //     } catch (error) {
  //       if (error.response) {
  //         console.log('Error Data:', error.response.data);
  //         console.log('Error Status:', error.response.status);
  //         console.log('Error Headers:', error.response.headers);
  //       } else if (error.request) {
  //         console.log('Error Request:', error.request);
  //       } else {
  //         console.log('Error Message:', error.message);
  //       }
  //     }
  //   };
  //   fetchPosts();
  // }, []);


  //   useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await fetch('http://127.0.0.1:3500/posts', { method: "GET" });
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setPosts(data);
  //     } catch (error) {
  //       console.log('Fetch error:', error.message);
  //     }
  //   };
  //   fetchPosts();
  // }, []);


  useEffect(() => {
    const filteredResults = posts.filter(
      post => (
        (post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase()))
    setSearchResults(filteredResults.reverse())
  }, [posts, search])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = { id, title: postTitle, datetime, body: postBody }
    try {
      const response = await api.post('/posts', newPost)
      const allPosts = [...posts, response.data]
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      navigate('/')
    } catch (error) {
      console.log('Error:', error.message)
      }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = { id, title: editTitle, datetime, body: editBody }
    try { 
      const response = await api.put(`/posts/${id}`, updatedPost)
      const allPosts = posts.map(post => post.id === id ? {...response.data} : post)
      setPosts(allPosts)
      setEditTitle('')
      setEditBody('')
      navigate('/')
      } catch (error) {
        console.log('Error:', error.message)
        }
        
    }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
    const postsList = posts.filter((post) => post.id !== id)
    setPosts(postsList)
    navigate('/')
    } catch (error) {
      console.log('Error:', error.message)
      }

  }

  return (
    <div className="App">
      <Header title="React Js Beginner" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route exact path="/" element={<Home posts={searchResults} />} fetchError={fetchError} isLoading={isLoading} />
        <Route exact path="/post" element={<NewPost handleSubmit={handleSubmit} postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody} />} />
        <Route path="/edit/:id" element={<EditPost 
        posts={posts}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editBody={editBody}
        setEditBody={setEditBody}
        handleEdit={handleEdit}
         />} />
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
