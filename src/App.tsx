import React from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import EarthScene from './components/earthScene';

const App = () => {
  return (
    <div className='earth-scene'>
      <Canvas camera={{ position: [10, 10, 10], near: 0.025 }}>
        <EarthScene />
      </Canvas>
    </div>
  );
}

export default App;
