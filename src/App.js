import { Route, Routes } from 'react-router-dom';
import './App.css';
import Posts from './pages/posts';
import PostView from './pages/postview';
import Users from './pages/users';

function App() {
  return (
    <div className="App">
      <header className="App-header"> Forum</header>
      <Routes>
        <Route index element={<Posts />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:postId" element={<PostView />} />
        <Route path="users/:userId" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
