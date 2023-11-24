import React from 'react';
import bg from '../assets/sky.jpg';

function Bg() {
  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
  };

  return (
    <div style={bgStyle}>
      {/* Content of your component goes here */}
    </div>
  );
}

export default Bg;
