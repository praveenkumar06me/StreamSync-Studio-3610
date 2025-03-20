import { motion } from 'framer-motion';

const GenreSelector = ({ genres, selectedGenres, onGenreSelect }) => {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
      {genres.map((genre) => (
        <motion.button
          key={genre}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onGenreSelect(genre)}
          className={`
            w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors
            ${selectedGenres.includes(genre)
              ? 'bg-primary text-white'
              : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
            }
          `}
        >
          {genre}
        </motion.button>
      ))}
    </div>
  );
};

export default GenreSelector;