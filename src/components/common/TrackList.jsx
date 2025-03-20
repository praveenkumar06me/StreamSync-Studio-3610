import { motion } from 'framer-motion';
import { BiPlay, BiPause, BiTime, BiLock } from 'react-icons/bi';
import { useMusic } from '../../contexts/MusicContext';
import { useAuth } from '../../contexts/AuthContext';

const TrackList = ({ tracks }) => {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useMusic();
  const { canPlayMusic, userType, USER_TYPES } = useAuth();

  const handlePlayClick = (track) => {
    if (!canPlayMusic()) {
      alert('Please sign in to play music!');
      return;
    }
    
    if (currentTrack?.id === track.id && isPlaying) {
      pauseTrack();
    } else {
      playTrack(track);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-[auto,1fr,auto] gap-4 px-4 py-2 text-gray-400 border-b border-gray-800">
        <div className="w-8">#</div>
        <div>TITLE</div>
        <div className="flex items-center">
          <BiTime />
        </div>
      </div>
      
      {tracks.map((track, index) => {
        const isCurrentTrack = currentTrack?.id === track.id;
        
        return (
          <motion.div
            key={track.id}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            className={`grid grid-cols-[auto,1fr,auto] gap-4 px-4 py-2 rounded-md ${
              isCurrentTrack ? 'text-primary' : 'text-white'
            }`}
          >
            <div className="w-8 flex items-center">
              {isCurrentTrack && isPlaying ? (
                <div className="flex space-x-1">
                  <div className="w-1 bg-primary animate-music-bar"></div>
                  <div className="w-1 bg-primary animate-music-bar" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 bg-primary animate-music-bar" style={{ animationDelay: '0.4s' }}></div>
                </div>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            
            <div className="flex items-center">
              <img
                src={track.artwork}
                alt={track.title}
                className={`w-10 h-10 rounded mr-4 ${userType === USER_TYPES.GUEST ? 'opacity-50' : ''}`}
              />
              <div>
                <div className="font-medium flex items-center">
                  {track.title}
                  {userType === USER_TYPES.GUEST && (
                    <BiLock className="ml-2 text-gray-400" />
                  )}
                </div>
                <div className="text-sm text-gray-400">{track.artist}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handlePlayClick(track)}
                className={`opacity-0 group-hover:opacity-100 focus:opacity-100 ${
                  userType === USER_TYPES.GUEST ? 'cursor-not-allowed' : ''
                }`}
              >
                {isCurrentTrack && isPlaying ? <BiPause /> : <BiPlay />}
              </button>
              <span>{track.duration}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TrackList;