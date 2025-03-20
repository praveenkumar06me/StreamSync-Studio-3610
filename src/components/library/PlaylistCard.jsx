import { motion } from 'framer-motion';
import { BiPlay, BiUserPlus, BiDotsVertical } from 'react-icons/bi';
import { useMusic } from '../../contexts/MusicContext';
import { useState } from 'react';

const PlaylistCard = ({ playlist, onCollaborate, onEdit, onDelete }) => {
  const { playTrack } = useMusic();
  const [showOptions, setShowOptions] = useState(false);

  const handlePlay = () => {
    if (playlist.tracks.length > 0) {
      playTrack(playlist.tracks[0]);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-dark-lighter rounded-lg overflow-hidden group relative"
    >
      <div className="relative aspect-square">
        <img
          src={playlist.coverImage}
          alt={playlist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity" />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlay}
          className="absolute bottom-2 right-2 bg-primary p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <BiPlay className="text-lg sm:text-xl" />
        </motion.button>
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base truncate">
              {playlist.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 truncate">
              {playlist.description}
            </p>
          </div>
          <div className="relative ml-2">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="p-1.5 sm:p-2 hover:bg-dark-light rounded-full"
            >
              <BiDotsVertical className="text-base sm:text-lg" />
            </button>
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-40 sm:w-48 bg-dark-lighter rounded-md shadow-lg z-10"
              >
                {playlist.isCollaborative && (
                  <button
                    onClick={() => onCollaborate(playlist.id)}
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-dark-light"
                  >
                    <BiUserPlus className="mr-2" />
                    Add Collaborator
                  </button>
                )}
                <button
                  onClick={() => onEdit(playlist.id)}
                  className="flex items-center w-full px-3 py-2 text-sm hover:bg-dark-light"
                >
                  Edit Details
                </button>
                <button
                  onClick={() => onDelete(playlist.id)}
                  className="flex items-center w-full px-3 py-2 text-sm text-red-500 hover:bg-dark-light"
                >
                  Delete Playlist
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {playlist.isCollaborative && (
          <div className="mt-2 flex items-center">
            <div className="flex -space-x-2">
              {playlist.collaborators.slice(0, 3).map((collaborator, index) => (
                <div
                  key={index}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-dark-light border-2 border-dark-lighter"
                />
              ))}
            </div>
            {playlist.collaborators.length > 3 && (
              <span className="ml-2 text-xs sm:text-sm text-gray-400">
                +{playlist.collaborators.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PlaylistCard;