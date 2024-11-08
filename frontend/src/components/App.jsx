import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import BlogPostForm from './BlogPostForm';
import PostList from './PostList';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Outlet />} >
          <Route index element={<PostList />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/create' element={<BlogPostForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;