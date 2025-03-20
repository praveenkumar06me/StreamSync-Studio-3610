import { motion } from 'framer-motion';
import { BiPlay, BiHeart } from 'react-icons/bi';
import { useMusic } from '../../contexts/MusicContext';
import { usePlaylist } from '../../contexts/PlaylistContext';

const RecommendedTracks = ({ tracks, title }) => {
  const { playTrack } = useMusic();
  const { toggleLike, isLiked } = usePlaylist();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">{title}</h2>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {tracks.map((track) => (
          <motion.div
            key={track.id}
            variants={item}
            className="bg-dark-lighter rounded-lg p-3 sm:p-4 group hover:bg-dark-light transition-colors"
          >
            <div className="relative">
              <img
                src={track.image}
                alt={track.title}
                className="w-full aspect-square object-cover rounded-md mb-3 sm:mb-4"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => playTrack(track)}
                  className="bg-primary p-3 rounded-full transform hover:scale-105 transition-transform"
                >
                  <BiPlay className="text-xl" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleLike(track)}
                  className={`p-3 rounded-full transform hover:scale-105 transition-transform
                    ${isLiked(track.id) ? 'text-primary' : 'text-white'}
                  `}
                >
                  <BiHeart className="text-xl" />
                </motion.button>
              </div>
            </div>
            <h3 className="font-semibold text-sm sm:text-base truncate">
              {track.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 truncate">
              {track.artist}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RecommendedTracks;