import { motion } from 'framer-motion';

const CallToAction = () => {
  const handleViewResume = () => {
    window.open('https://drive.google.com/drive/folders/1IkzvQ3kuG9lxVvXyffvAz2jEdYTathaN?usp=drive_link', '_blank');
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf'; 
    link.download = 'Resume_Sankalp.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      key="alternate-message"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-full"
    >
      <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 text-center w-full">
        See potential?
      </motion.h1>      <motion.p className="text-xl md:text-2xl mb-8 text-center max-w-2xl mx-auto px-4">
        Let&apos;s collaborate and build something meaningful.
      </motion.p>
      <motion.div className="flex justify-center w-full">
        <a 
          href="https://www.linkedin.com/in/sankalpnad003"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-foreground text-background px-6 py-3 rounded-lg font-medium pointer-events-auto hover:bg-background hover:text-foreground hover:border-2 hover:border-foreground transition-all duration-200"
        >
          Get in Touch
        </a>
      </motion.div>

      {/* <motion.div 
        className="flex justify-center w-full mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <a 
          href="mailto:sankalp.nss@gmail.com"
          className="text-sm text-foreground hover:text-foreground/80 underline underline-offset-4 transition-colors"
        >
          or email me
        </a>
      </motion.div> */}
      
      {/* Second row of buttons */}
      <motion.div 
        className="flex justify-center w-full mt-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button 
          onClick={handleViewResume}
          className="bg-background border-2 border-foreground text-foreground px-6 py-3 rounded-lg font-medium pointer-events-auto hover:bg-foreground hover:text-background transition-all duration-200"
        >
          View Resume
        </button>
        <button 
          onClick={handleDownloadResume}
          className="bg-background border-2 border-foreground text-foreground px-6 py-3 rounded-lg font-medium pointer-events-auto hover:bg-foreground hover:text-background transition-all duration-200"
        >
          Download Resume
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CallToAction;