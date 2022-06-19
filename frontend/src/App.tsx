import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import CreateProfile from "./pages/createProfile/CreateProfile";
import { UserProvider } from "./context/userContext";
import { MoralisProvider } from "react-moralis";
import "./App.css";
import MyNFTs from "./pages/myNFTs/MyNFTs";
import { appId, serverUrl } from "./utils/constants";

function App() {
  return (
    <UserProvider>
      <MoralisProvider serverUrl={serverUrl} appId={appId}>
        <Router>
          <Routes>
            <Route path="/createprofile" element={<CreateProfile />}></Route>
            <Route path="/mynfts" element={<MyNFTs />}></Route>
            <Route path="/profile/:address" element={<Profile />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </Router>
      </MoralisProvider>
    </UserProvider>
  );
}

export default App;
