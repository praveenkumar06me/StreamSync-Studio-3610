import { motion } from 'framer-motion';
import { BiX, BiLink, BiLogoTwitter, BiLogoFacebook } from 'react-icons/bi';
import { useSocial } from '../../contexts/SocialContext';
import { useState } from 'react';

const ShareModal = ({ onClose, contentType, contentId, title }) => {
  const { shareContent } = useSocial();
  const [shareStatus, setShareStatus] = useState(null);

  const handleShare = async (platform) => {
    const result = await shareContent(contentType, contentId, platform);
    if (result.success) {
      setShareStatus(result.message || 'Shared successfully!');
      if (platform !== 'copy') onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-dark-lighter rounded-lg p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Share</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-light rounded-full"
          >
            <BiX className="text-xl" />
          </button>
        </div>

        <p className="text-gray-400 mb-6">
          Share "{title}" with your friends
        </p>

        <div className="space-y-4">
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center w-full p-3 rounded-lg bg-[#1DA1F2] hover:bg-opacity-90 transition-colors"
          >
            <BiLogoTwitter className="text-xl mr-3" />
            Share on Twitter
          </button>

          <button
            onClick={() => handleShare('facebook')}
            className="flex items-center w-full p-3 rounded-lg bg-[#4267B2] hover:bg-opacity-90 transition-colors"
          >
            <BiLogoFacebook className="text-xl mr-3" />
            Share on Facebook
          </button>

          <button
            onClick={() => handleShare('copy')}
            className="flex items-center w-full p-3 rounded-lg bg-dark-light hover:bg-opacity-90 transition-colors"
          >
            <BiLink className="text-xl mr-3" />
            Copy Link
          </button>
        </div>

        {shareStatus && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-primary"
          >
            {shareStatus}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ShareModal;