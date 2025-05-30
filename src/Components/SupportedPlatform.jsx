import { motion } from 'framer-motion';

const SupportedPlatforms = () => {
  const platforms = [{
    name: "Blender",
    logo: "/lovable-Uploads/333ceacb-8d93-4c94-a8f5-edca1f601b91.png"
  }];

  return (
    <section className='w-full px-4 bg-black py-12'>
      <div className='max-w-7xl mx-auto py-0'>
        <div className='text-center mb-10'>
          <motion.h2
            className='section-heading'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            Supported <span className='text-gray-50'>Platforms</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='section-subheading text-xs'
          >
            Seamlessly integrate with your favorite 3D modeling software
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='flex justify-center items-center py-0 relative rounded-xl overflow-hidden border-2 border-transparent bg-clip-padding group'
        >
          <div className='absolute inset-0 rounded-xl border-2 border-transparent  opacity-50 group-hover:opacity-100 transition-opacity duration-300' />
          <img
            src={platforms[0].logo}
            alt='Supported 3D Modeling Platforms'
            className='w-full max-w-6xl rounded-lg object-fill relative z-10 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300'
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SupportedPlatforms;