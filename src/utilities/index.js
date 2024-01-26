import { nanoid } from "nanoid";
import image1 from "../assets/carousel/bg-1.jpg";
import image2 from "../assets/carousel/bg-2.jpg";
import image3 from "../assets/carousel/bg-3.jpg";
import image4 from "../assets/carousel/bg-4.jpg";

export const carouselImages = [
  { id: nanoid(), image: image1, name: "image1" },
  { id: nanoid(), image: image2, name: "image2" },
  { id: nanoid(), image: image3, name: "image3" },
  { id: nanoid(), image: image4, name: "image4" },
];

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
    y: -50,
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
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {},
  },
};

export const formVariant = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "linear",
      duration: 0.5,
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
      duration: 0.5,
      // delay: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const borderVariants = {
  hidden: { borderBottomWidth: 0 },
  visible: { hover: { borderBottomWidth: 2 } },
};
