import React from 'react';
import { color } from '../../color';
import { useEffect } from 'react';
import cover from './cover.jpg'
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const HomeCommon = () => {
  useEffect(() => {

  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div>
        <img style={{ width: '100vw', height: '100vh', filter: { blur: '100px' } }} src={cover} />
      </div>
      <div style={{ display: 'flex', position: 'absolute', right: '50%', bottom: '70%', left: '10%', color: 'white', fontSize: '100px', fontWeight: 'bold', }}>
        SMARTSTOCK
      </div>
      <div style={{ display: 'flex', position: 'absolute', right: '10%', bottom: '60%', left: '10%', color: 'white', fontSize: '50px', fontWeight: 'bold',align:'flex-end' }}>
        Login to get started
      </div>
    </div>
  );
};
export default HomeCommon;
