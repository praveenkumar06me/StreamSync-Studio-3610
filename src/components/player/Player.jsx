import { useState, useEffect } from 'react';
import { BiSkipPrevious, BiSkipNext, BiPlay, BiPause, BiVolumeFull, BiDownload, BiShuffle, BiRepeat } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useMusic } from '../../contexts/MusicContext';
import { useAuth } from '../../contexts/AuthContext';

const Player = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    volume,
    setVolume,
    nextTrack,
    previousTrack,
    shuffle,
    toggleShuffle,
    repeat,
    toggleRepeat,
    audioQuality
  } = useMusic();
  const { canSkipTracks, canDownloadTracks, USER_TYPES, userType } = useAuth();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = document.querySelector('audio');
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, [currentTrack]);

  const handleProgressChange = (e) => {
    const audio = document.querySelector('audio');
    const newTime = (e.target.value / 100) * duration;
    audio.currentTime = newTime;
    setProgress(e.target.value);
  };

  const formatTime = (time) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="w-full bg-dark-lighter border-t border-gray-800 p-2 md:p-4">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-auto gap-2 md:gap-4">
        {/* Track Info */}
        <div className="flex items-center w-full md:w-1/3 justify-center md:justify-start">
          <img
            src={currentTrack.artwork}
            alt={currentTrack.title}
            className="w-10 h-10 md:w-14 md:h-14 rounded-md"
          />
          <div className="ml-2 md:ml-4 text-center md:text-left">
            <h4 className="text-sm font-medium truncate">{currentTrack.title}</h4>
            <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
            {userType === USER_TYPES.PREMIUM && (
              <span className="text-xs text-primary hidden md:inline">{audioQuality.label}</span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className="flex items-center space-x-2 md:space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleShuffle}
              className={`text-lg md:text-xl ${shuffle ? 'text-primary' : 'text-gray-400'}`}
            >
              <BiShuffle />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={previousTrack}
              className={`text-xl md:text-2xl ${!canSkipTracks() ? 'opacity-50' : ''}`}
            >
              <BiSkipPrevious />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="p-2 rounded-full bg-primary hover:bg-primary-light"
            >
              {isPlaying ? <BiPause /> : <BiPlay />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTrack}
              className={`text-xl md:text-2xl ${!canSkipTracks() ? 'opacity-50' : ''}`}
            >
              <BiSkipNext />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleRepeat}
              className={`text-lg md:text-xl ${repeat !== 'none' ? 'text-primary' : 'text-gray-400'}`}
            >
              <BiRepeat />
            </motion.button>
          </div>
          <div className="w-full mt-2 flex items-center space-x-2 px-4">
            <span className="text-xs text-gray-400 hidden md:inline">
              {formatTime(duration * (progress / 100))}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-gray-400 hidden md:inline">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume & Extra Controls */}
        <div className="hidden md:flex items-center w-1/3 justify-end space-x-4">
          {userType === USER_TYPES.PREMIUM && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {}}
              className="text-xl hover:text-primary"
            >
              <BiDownload />
            </motion.button>
          )}
          <div className="flex items-center">
            <BiVolumeFull className="mr-2" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {userType === USER_TYPES.FREE && (
        <div className="absolute top-0 left-0 right-0 transform -translate-y-full bg-primary text-white text-center py-1 text-xs md:text-sm">
          Upgrade to Premium for ad-free listening and unlimited skips!
        </div>
      )}
    </div>
  );
};

export default Player;