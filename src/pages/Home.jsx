import React, { useState } from 'react'
import Login from '../components/Login';
import NavBar from '../components/NavBar';
import NewAds from '../components/NewAds';
import Ads from '../components/Ads';
const Home = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [showNewAds, setShowNewAds] = useState(false);
  const [isLogin, setIsLogin] = useState()

  return (
    <div>
      <NavBar setLogin={setShowLogin} newAds={setShowNewAds} isLogin={isLogin} />
      { showNewAds && <NewAds closeNewAds={setShowNewAds}/> }
      { !showLogin && <Ads/> }
      { showLogin &&  <Login closeLogin={setShowLogin} isLogin={setIsLogin} /> }
    </div>

  )
}

export default Home;
