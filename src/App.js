// 3rd party
import { Routes, Route } from "react-router-dom";

// internal
import "./App.css";

// components
import LoginPage from "./pages/LoginPage";
import GameListPage from "./pages/GameListPage";
import GameDetailPage from "./pages/GameDetailPage";
import WatchlistPage from "./pages/WatchlistPage";
import PlayListPage from "./pages/PlayListPage";
import HomePage from "./pages/HomePage";
import PrimaryNav from "./components/PrimaryNav";
import LogoutPage from "./pages/LogoutPage";
import { useEffect, useState } from "react";
import SignupPage from "./pages/SignupPage";

function App() {

  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser'));
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    setToken(null)
    setCurrentUser(null)
  }

  const handleLogin = () => {
    setToken(localStorage.getItem('token'));
    setCurrentUser(localStorage.getItem('currentUser'));
  }

  return (
    <div className="App">
      <header>
        <PrimaryNav currentUser={currentUser} token={token} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route exact path="/games" element={<GameListPage />} />
          <Route path="/games/:game_id" element={<GameDetailPage />} />
          <Route path="/playlists/:playlist_id" element={<PlayListPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<LogoutPage handleLogout={handleLogout} />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
