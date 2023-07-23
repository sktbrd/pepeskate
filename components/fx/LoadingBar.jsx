// components/LoadingBar.js
import React from 'react';

const LoadingBar = () => (
  <center style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
    <img src="https://i.gifer.com/origin/f1/f1a737e4cfba336f974af05abab62c8f_w200.gif" alt="" />
    <h2 style={{margin:"50px", color:"limegreen", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Roll a joint...</h2>
    <div style={{
      height: '20px',
      width: '100%',
      backgroundColor: '#000',
      borderRadius: '3px',
      overflow: 'hidden',
      marginTop: '20px',
      border: '2px solid limegreen',
      boxSizing: 'border-box'
    }}>
      <div style={{
        height: '100%',
        width: '80%', /* You can change this value to represent the loading progress */
        backgroundColor: 'limegreen',
        borderRadius: '3px',
        animation: 'progress 2s ease-out infinite'
      }}></div>
    </div>
    <style jsx>{`
      @keyframes progress {
        0% { margin-left: 0; }
        50% { margin-left: 50%; }
        100% { margin-left: 100%; }
      }
    `}</style>
  </center>
);

export default LoadingBar;
