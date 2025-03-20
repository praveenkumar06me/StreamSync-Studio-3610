import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { BiUser, BiCrown, BiHistory } from 'react-icons/bi';

const Profile = () => {
  const { user, isPremium } = useAuth();

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="w-32 h-32 rounded-full bg-dark-lighter flex items-center justify-center">
              <BiUser className="text-6xl text-gray-400" />
            </div>
            <div className="ml-6">
              <h1 className="text-4xl font-bold mb-2">
                {user?.name || 'Guest User'}
              </h1>
              {isPremium && (
                <div className="flex items-center text-primary">
                  <BiCrown className="mr-2" />
                  <span>Premium Member</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-dark-lighter rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
            <div className="flex items-center text-gray-400">
              <BiHistory className="mr-2" />
              <span>Your listening history will appear here</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;