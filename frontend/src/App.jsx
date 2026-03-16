import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import { Routes, Route } from 'react-router-dom';

function App() {
  return(
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />} />
      <Route path='/posts/:id' element={<PostDetail />} />
      <Route path="/posts/create" element={<CreatePost />}/>
    </Routes>
  )
}

export default App
