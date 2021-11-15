import React, { useEffect, useState } from 'react';
import Sound from 'react-native-sound';

const RemoteSound = ({
    url,
    autoPlay = false,
    onPlayEnd = () => {},
    Component
}) => {
  const [isReady, setReady] = useState(false);
  const [isPlay, setPlay] = useState(false);

  let track = new Sound(url, null, (e) => {
    if (e) {
      console.log('error loading track:', e)
    } else {
      setReady(true);
      if (autoPlay) {
        handlePlay();
      }
    }
  })

  const handlePlay = () => {
    if (track && !isPlay) {
      track.play((success) => {
        if (success) {
          track.release();
          setPlay(false);
          onPlayEnd();
        }
      });
      setPlay(true);
    }
  }

  const handlePause = () => {
    if (track && isPlay) {
      track.pause();
      setPlay(false);
    }
  }

  const handleStop = () => {
    if (track && isPlay) {
      track.stop();
      track.release();
      setPlay(false);
    }
  }

  return <Component 
    onPlay={handlePlay} 
    onPause={handlePause} 
    onStop={handleStop}
    isReady={isReady}
    isPlay={isPlay}
  />
}

export default RemoteSound;