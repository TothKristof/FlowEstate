import React from 'react'
import Spline from '@splinetool/react-spline';

function House3d() {
    // Add timestamp to force fresh load
    const timestamp = new Date().getTime();
    const sceneUrl = `https://prod.spline.design/Bl1J2VR9XTYkL4Nt/scene.splinecode?t=${timestamp}`;
  
    return (
      <div className="w-full h-screen bg-transparent">
        <Spline 
          scene={sceneUrl}
          style={{ 
            width: '100%', 
            height: '100%',
            background: 'transparent',
            scale:'30%',
          }}
          onLoad={() => {
            console.log('Scene loaded');
          }}
        />
      </div>
    )
}

export default House3d