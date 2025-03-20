import { motion } from 'framer-motion';
import { useMusic } from '../../contexts/MusicContext';

const QualitySelector = () => {
  const { 
    audioQuality, 
    setQualityPreference, 
    getAudioQualityOptions 
  } = useMusic();

  const options = getAudioQualityOptions();

  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-lg font-semibold mb-2">Streaming Quality</h3>
      {options.map((quality) => (
        <motion.button
          key={quality.bitrate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setQualityPreference(quality)}
          className={`p-3 rounded-lg transition-colors ${
            audioQuality.bitrate === quality.bitrate
              ? 'bg-primary text-white'
              : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
          }`}
        >
          <div className="flex justify-between items-center">
            <span>{quality.label}</span>
            <span className="text-sm opacity-75">{quality.bitrate}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default QualitySelector;