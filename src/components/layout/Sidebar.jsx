import { NavLink } from 'react-router-dom';
import { BiHomeAlt2, BiSearch, BiLibrary, BiHeart, BiX } from 'react-icons/bi';
import { motion } from 'framer-motion';

const Sidebar = ({ onClose }) => {
  const navItems = [
    { icon: BiHomeAlt2, label: 'Home', path: '/' },
    { icon: BiSearch, label: 'Search', path: '/search' },
    { icon: BiLibrary, label: 'Your Library', path: '/library' },
    { icon: BiHeart, label: 'Liked Songs', path: '/playlist/liked' },
  ];

  return (
    <div className="w-full h-full md:w-64 bg-dark-lighter flex flex-col">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-primary">Musicify</h1>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-dark-light rounded-full"
          >
            <BiX className="text-xl" />
          </button>
        </div>
        
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg mb-2 transition-colors ${
                  isActive ? 'bg-dark-light text-primary' : 'text-gray-400 hover:text-white'
                }`
              }
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <item.icon className="text-xl mr-3" />
                <span>{item.label}</span>
              </motion.div>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;