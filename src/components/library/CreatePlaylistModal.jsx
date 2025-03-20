import { useState } from 'react';
import { motion } from 'framer-motion';
import { BiX } from 'react-icons/bi';

const CreatePlaylistModal = ({ onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isCollaborative, setIsCollaborative] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name, description, isCollaborative });
    onClose();
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
          <h2 className="text-2xl font-bold">Create Playlist</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-light rounded-full"
          >
            <BiX className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Playlist Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="My Awesome Playlist"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Add an optional description"
              rows="3"
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isCollaborative}
                onChange={(e) => setIsCollaborative(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Make collaborative</span>
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-light"
            >
              Create
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreatePlaylistModal;