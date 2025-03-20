import { motion } from 'framer-motion';
import { BiUserPlus, BiUserCheck } from 'react-icons/bi';
import { useSocial } from '../../contexts/SocialContext';

const FollowButton = ({ userId, size = 'md' }) => {
  const { following, followUser, unfollowUser } = useSocial();
  const isFollowing = following.includes(userId);

  const handleClick = () => {
    if (isFollowing) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`
        ${sizeClasses[size]}
        rounded-full
        flex
        items-center
        transition-colors
        ${isFollowing ? 'bg-dark-light text-white' : 'bg-primary text-white'}
        hover:bg-opacity-90
      `}
    >
      {isFollowing ? (
        <>
          <BiUserCheck className="mr-2" />
          Following
        </>
      ) : (
        <>
          <BiUserPlus className="mr-2" />
          Follow
        </>
      )}
    </motion.button>
  );
};

export default FollowButton;