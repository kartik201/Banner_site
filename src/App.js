
import React, { useState } from 'react';
import './App.css';
import Banner from './banner';
import Dashboard from './dashboard';

function App() {
  const [bannerVisible, setBannerVisible] = useState(true);

  const toggleBanner = () => {
    setBannerVisible(!bannerVisible);
  };

  return (
    <div className="App">
      <Banner visible={bannerVisible} />
      <Dashboard bannerVisible={bannerVisible} toggleBanner={toggleBanner} />
    </div>
  );
}

export default App;
