import React, { useState } from 'react';
import Sound from 'react-native-sound';

const RemoteSound = ({
    url,
    Component
}) => {
  const [isReady, setReady] = useState(false);
  const [isPlay, setPlay] = useState(false);

  const track = new Sound(url, null, (e) => {
    if (e) {
      console.log('error loading track:', e)
    } else {
      setReady(true);
    }
  })

  const handlePlay = () => {
    track.play((success) => {
      if (success) {
        track.release();
        setPlay(false);
      }
    });
    setPlay(true);
  }

  const handlePause = () => {
    if (isPlay) {
      track.pause();
      setPlay(false);
    }
  }

  return <Component 
    onPlay={handlePlay} 
    onPause={handlePause} 
    isReady={isReady}
    isPlay={isPlay}
  />
}

export default RemoteSound;