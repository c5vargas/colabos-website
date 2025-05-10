import { type Variants } from 'framer-motion';

export const useAnimations = () => {
  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const fadeInDown: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const fadeInLeft: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const fadeInRight: Variants = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const zoomIn: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const popIn: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 10 },
    },
  };

  const slowFadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };

  const staggerItems: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const hoverScale = {
    scale: 1.05,
    transition: { type: 'spring', stiffness: 400, damping: 10 },
  };

  const hoverBounce = {
    scale: 1.1,
    transition: { type: 'spring', stiffness: 400, damping: 10 },
  };

  const hoverRotate = {
    rotate: 5,
    transition: { type: 'spring', stiffness: 300, damping: 10 },
  };

  return {
    // Contenedores
    fadeIn,
    staggerContainer,
    staggerItems,
    slowFadeIn,

    // Elementos
    fadeInUp,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    zoomIn,
    popIn,

    // Hover
    hoverScale,
    hoverBounce,
    hoverRotate,
  };
};
