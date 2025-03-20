import { motion } from 'framer-motion';
import { BiTime, BiPlay } from 'react-icons/bi';
import { useSocial } from '../../contexts/SocialContext';
import { useMusic } from '../../contexts/MusicContext';
import { formatDistanceToNow } from 'date-fns';

const ActivityFeed = () => {
  const { getFriendActivity } = useSocial();
  const { playTrack } = useMusic();
  const activities = getFriendActivity();

  return (
    <div className="bg-dark-lighter rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Friend Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-dark-light"
          >
            <img
              src={activity.user?.avatar || 'https://picsum.photos/32'}
              alt={activity.user?.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{activity.user?.name}</span>
                {' '}{activity.action}{' '}
                <span className="text-primary">{activity.target}</span>
              </p>
              <div className="flex items-center text-xs text-gray-400 mt-1">
                <BiTime className="mr-1" />
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </div>
            </div>
            {activity.track && (
              <button
                onClick={() => playTrack(activity.track)}
                className="p-2 hover:bg-dark rounded-full"
              >
                <BiPlay className="text-xl" />
              </button>
            )}
          </motion.div>
        ))}
        {activities.length === 0 && (
          <p className="text-center text-gray-400 py-4">
            No recent activity from friends
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;