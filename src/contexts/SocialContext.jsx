import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const SocialContext = createContext();

export const SocialProvider = ({ children }) => {
  const { user } = useAuth();
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const followUser = (userId) => {
    setFollowing(prev => [...prev, userId]);
  };

  const unfollowUser = (userId) => {
    setFollowing(prev => prev.filter(id => id !== userId));
  };

  const shareContent = async (contentType, contentId, platform) => {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=Check%20out%20this%20${contentType}!&url=`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=`,
      copy: null
    };

    const shareUrl = `${window.location.origin}/${contentType}/${contentId}`;
    
    if (platform === 'copy') {
      await navigator.clipboard.writeText(shareUrl);
      return { success: true, message: 'Link copied to clipboard!' };
    }

    window.open(`${shareUrls[platform]}${encodeURIComponent(shareUrl)}`, '_blank');
    return { success: true };
  };

  const addActivity = (activity) => {
    setActivityFeed(prev => [{
      id: Date.now(),
      userId: user?.id,
      timestamp: new Date().toISOString(),
      ...activity
    }, ...prev]);
  };

  const getFriendActivity = () => {
    return activityFeed.filter(activity => 
      following.includes(activity.userId)
    );
  };

  return (
    <SocialContext.Provider
      value={{
        following,
        followers,
        activityFeed,
        notifications,
        followUser,
        unfollowUser,
        shareContent,
        addActivity,
        getFriendActivity
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => useContext(SocialContext);