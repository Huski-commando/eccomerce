import { nanoid } from "nanoid";

export const NavLinks = [
  {
    id: nanoid(),
    navItem: "Home",
    path: "/",
  },
  {
    id: nanoid(),
    navItem: "Contact",
    path: "contact",
  },
];

export const headerVariants = {
  hidden: {
    opacity: 0,
    y: "-50%",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const imageVariant = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.2,
      // ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const formVariant = {
  hidden: {
    opacity: 0,
    y: 150,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.3,
      // ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const passwordVariant = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      // delay: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
