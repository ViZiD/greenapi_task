import { Routes, Route } from 'react-router-dom';
import './App.css';

import { Login } from './components/login/login';
import { UserNumberInput } from './components/user/user';
import { Chat } from './components/chat/chat';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route index element={<Login />} />
        <Route path="auth" element={<Login />} />
        <Route path="user" element={<UserNumberInput />} />
        <Route path="chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
