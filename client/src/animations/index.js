export const buttonClick = {
  whileTap: { scale: 0.95 },
};

export const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const SlideTop = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 30, y: 1 },
  exit: { opacity: 0, y: 30 },
};

export const steggerFadeInOut = (i) => {
  return {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.3, delay: i * 0.15 },
    key: { i },
  };
};


export const SlideIn = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 30, x: 1 },
  exit: { opacity: 0, x: 30 },
};