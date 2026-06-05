import { CATEGORY_SLUGS } from "./categorySlugs";

const nicotineLabelWarningText =
  "Nicotine is a highly addictive substance. This product is not risk-free and is only recommended for people who are already using nicotine. Nicotine pouches should not be used by pregnant or breastfeeding women and should be kept out of the reach of children.";

const warningText =
  "This product contains nicotine, which is a highly addictive substance.";

export const productContent = {
  [CATEGORY_SLUGS.NICOTINE_POUCHES]: {
    bulletPointsIcon: {
      src: "/images/icons/sketches/nicotine_pouch_sketch-min.png",
      alt: "Nicotine pouch illustration",
      width: 160,
      height: 160,
    },
    nicotineLabelWarningText,
    warningText: warningText,
    sameBrandProductsPicker: {
      title: "Discover more flavors from the same brand",
      description:
        "Explore more flavors and strengths of nicotine pouches from " /* + brandName will be added in the component */,
      emptyMessage:
        "No other products available at the moment.",
      showIfEmpty: false,
    },
  },

  [CATEGORY_SLUGS.NICOTINE_FREE_POUCHES]: {
    bulletPointsIcon: {
      src: "/images/icons/sketches/nicotine_pouch_sketch-min.png",
      alt: "Nicotine-free pouch illustration",
      width: 454,
      height: 652,
    },
    // nicotineLabelWarningText,
    warningText: "This product is nicotine-free.",
    sameBrandProductsPicker: {
      title: "Discover more flavors from the same brand",
      description:
        "Explore more flavors and strengths of nicotine-free pouches from " /* + brandName will be added in the component */,
      emptyMessage:
        "No other products available at the moment.",
      showIfEmpty: false,
    },
  },
  [CATEGORY_SLUGS.ENERGY_POUCHES]: {
    bulletPointsIcon: {
      src: "/images/icons/sketches/nicotine_pouch_sketch-min.png",
      alt: "Energy pouch illustration",
      width: 160,
      height: 200,
    },
    // nicotineLabelWarningText,
    warningText:
      "This product contains caffeine, which is a stimulant. Consume in moderation.",
    sameBrandProductsPicker: {
      title:
        "More energy pouch flavors from the same brand",
      description:
        "Explore more flavors and strengths of energy pouches from " /* + brandName will be added in the component */,
      emptyMessage:
        "No other products available at the moment.",
      showIfEmpty: false,
    },
  },

  [CATEGORY_SLUGS.SWEDISH_CANDY]: {
    bulletPointsIcon: {
      src: "/images/icons/sketches/lollipops_retro_transp.png",
      alt: "Swedish candy illustration",
      width: 160,
      height: 160,
    },
    warningText:
      "This product contains sugar and should be consumed in moderation as part of a balanced diet.",
    sameBrandProductsPicker: {
      title: "More Swedish candy from the same brand",
      description:
        "Explore more flavors and varieties of our nicotine-free candy from " /* + brandName will be added in the component */,
      emptyMessage: "More varieties coming soon.",
      showIfEmpty: false,
    },
  },
  [CATEGORY_SLUGS.ACCESSORIES]: {
    bulletPointsIcon: {
      src: "/images/icons/sketches/usb_charger_sketch.png", // You'll need to create this image
      alt: "Accessories illustration",
      width: 160,
      height: 200,
    },
    warningText:
      "Always use accessories that are compatible with your specific device for optimal performance.",
    sameBrandProductsPicker: {
      title:
        "Explore other accessories from the same brand",
      description:
        "Explore other accessories from " /* + brandName will be added in the component */,
      emptyMessage:
        "No other accessories available at the moment.",
      showIfEmpty: false,
    },
  },
  default: {},
};
