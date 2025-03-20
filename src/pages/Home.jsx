import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { BiPlay, BiTime } from 'react-icons/bi';

const FeaturedCard = ({ playlist }) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="relative group overflow-hidden rounded-xl bg-dark-lighter hover:bg-dark-light transition-all duration-300"
  >
    <div className="p-4">
      <img
        src={playlist.image}
        alt={playlist.title}
        className="w-full aspect-square object-cover rounded-lg shadow-lg mb-4"
      />
      <h3 className="font-bold text-base md:text-lg mb-1 truncate">{playlist.title}</h3>
      <p className="text-gray-400 text-xs md:text-sm line-clamp-2">{playlist.description}</p>
    </div>
    <motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      className="absolute bottom-4 right-4 bg-primary p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
    >
      <BiPlay className="text-xl md:text-2xl" />
    </motion.button>
  </motion.div>
);

const RecentlyPlayed = ({ track }) => (
  <motion.div
    whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
    className="flex items-center p-2 md:p-3 rounded-lg group cursor-pointer"
  >
    <img
      src={track.image}
      alt={track.title}
      className="w-10 h-10 md:w-12 md:h-12 rounded-md"
    />
    <div className="ml-3 md:ml-4 flex-1">
      <h4 className="font-medium text-sm md:text-base">{track.title}</h4>
      <p className="text-xs md:text-sm text-gray-400">{track.artist}</p>
    </div>
    <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <BiTime className="text-gray-400" />
      <span className="text-xs md:text-sm text-gray-400">{track.duration}</span>
    </div>
  </motion.div>
);

const Home = () => {
  const { user, isPremium } = useAuth();

  const timeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  // Mock data for featured playlists
  const featuredPlaylists = [
    {
      id: 1,
      title: "Today's Top Hits",
      description: "The biggest hits right now",
      image: "https://picsum.photos/400/400?random=1"
    },
    {
      id: 2,
      title: "Discover Weekly",
      description: "Your weekly mixtape of fresh music",
      image: "https://picsum.photos/400/400?random=2"
    },
    {
      id: 3,
      title: "Chill Vibes",
      description: "Lay back and enjoy the moment",
      image: "https://picsum.photos/400/400?random=3"
    },
    {
      id: 4,
      title: "Workout Energy",
      description: "Music to keep you motivated",
      image: "https://picsum.photos/400/400?random=4"
    },
    {
      id: 5,
      title: "Rock Classics",
      description: "Rock legends & epic songs",
      image: "https://picsum.photos/400/400?random=5"
    },
    {
      id: 6,
      title: "Sleep Sounds",
      description: "Peaceful ambient sounds",
      image: "https://picsum.photos/400/400?random=6"
    }
  ];

  // Mock data for recently played tracks
  const recentlyPlayed = [
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      duration: "3:20",
      image: "https://picsum.photos/400/400?random=7"
    },
    {
      id: 2,
      title: "Stay",
      artist: "Kid Laroi & Justin Bieber",
      duration: "2:21",
      image: "https://picsum.photos/400/400?random=8"
    },
    {
      id: 3,
      title: "As It Was",
      artist: "Harry Styles",
      duration: "2:47",
      image: "https://picsum.photos/400/400?random=9"
    }
  ];

  return (
    <div className="min-h-full bg-gradient-to-b from-dark-lighter to-dark p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8">
          Good {timeOfDay()}, {user?.name || 'music lover'}!
        </h1>

        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-primary to-primary-dark p-4 md:p-6 rounded-xl mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">Upgrade to Premium</h2>
            <p className="text-base md:text-lg mb-4 opacity-90">
              Enjoy ad-free music, offline downloads, and unlimited skips.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-dark px-6 md:px-8 py-2 md:py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors text-sm md:text-base"
            >
              GET PREMIUM
            </motion.button>
          </motion.div>
        )}

        <section className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Featured Playlists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {featuredPlaylists.map((playlist) => (
              <FeaturedCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Recently Played</h2>
          <div className="bg-dark-lighter rounded-xl p-2 md:p-4">
            {recentlyPlayed.map((track) => (
              <RecentlyPlayed key={track.id} track={track} />
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Home;