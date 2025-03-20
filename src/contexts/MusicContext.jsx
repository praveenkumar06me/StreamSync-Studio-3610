import { createContext, useContext, useState, useRef } from 'react';
import { useAuth } from './AuthContext';

const MusicContext = createContext();

const AUDIO_QUALITY = {
  LOW: { bitrate: '128kbps', label: 'Normal' },
  HIGH: { bitrate: '256kbps', label: 'High' },
  LOSSLESS: { bitrate: 'lossless', label: 'Lossless' }
};

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const { userType, USER_TYPES } = useAuth();
  
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [volume, setVolume] = useState(1);
  const [repeat, setRepeat] = useState('none'); // none, track, queue
  const [shuffle, setShuffle] = useState(false);
  const [crossfade, setCrossfade] = useState(0);
  const [audioQuality, setAudioQuality] = useState(AUDIO_QUALITY.HIGH);

  const getAudioQualityOptions = () => {
    if (userType === USER_TYPES.PREMIUM) {
      return Object.values(AUDIO_QUALITY);
    }
    return [AUDIO_QUALITY.LOW, AUDIO_QUALITY.HIGH];
  };

  const handleTrackEnd = () => {
    if (repeat === 'track') {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      nextTrack();
    }
  };

  const playTrack = (track) => {
    const quality = userType === USER_TYPES.PREMIUM ? audioQuality : AUDIO_QUALITY.HIGH;
    const audioUrl = `${track.audioUrl}?quality=${quality.bitrate}`;
    
    audioRef.current.src = audioUrl;
    audioRef.current.load();
    audioRef.current.play();
    
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseTrack();
    } else if (currentTrack) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    if (queue.length > 0) {
      const nextTrack = shuffle ? 
        queue[Math.floor(Math.random() * queue.length)] :
        queue[0];
      
      const newQueue = shuffle ?
        queue.filter(track => track.id !== nextTrack.id) :
        queue.slice(1);
      
      setQueue(newQueue);
      playTrack(nextTrack);
    } else if (repeat === 'queue' && currentTrack) {
      // Restart queue if repeat is enabled
      playTrack(currentTrack);
    }
  };

  const previousTrack = () => {
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else if (queue.length > 0) {
      // Implement previous track logic
    }
  };

  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const toggleRepeat = () => {
    const modes = ['none', 'track', 'queue'];
    const currentIndex = modes.indexOf(repeat);
    setRepeat(modes[(currentIndex + 1) % modes.length]);
  };

  const addToQueue = (track) => {
    setQueue([...queue, track]);
  };

  const clearQueue = () => {
    setQueue([]);
  };

  const setQualityPreference = (quality) => {
    if (userType === USER_TYPES.PREMIUM) {
      setAudioQuality(quality);
      if (currentTrack) {
        playTrack(currentTrack); // Restart current track with new quality
      }
    }
  };

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        queue,
        volume,
        repeat,
        shuffle,
        crossfade,
        audioQuality,
        playTrack,
        pauseTrack,
        togglePlay,
        nextTrack,
        previousTrack,
        seekTo,
        addToQueue,
        clearQueue,
        setVolume,
        toggleShuffle,
        toggleRepeat,
        setCrossfade,
        setQualityPreference,
        getAudioQualityOptions,
        AUDIO_QUALITY,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);