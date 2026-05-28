import { CATEGORY_SLUGS } from "./categorySlugs";

const nicotineLabelWarningText =
  "Nikotin är ett mycket beroendeframkallande ämne. Denna produkt är inte riskfri och rekommenderas endast för personer som redan använder nikotin. Produkten ska inte användas av gravida eller ammande och ska förvaras utom räckhåll för barn.";

const warningText =
  "Denna produkt innehåller nikotin som är ett beroendeframkallande ämne.";

export const productContent = {
  [CATEGORY_SLUGS.START_KIT_PREFILLED]: {
    bulletPointsIcon: {
      src: "/images/icons/sketches/vape_sketch_bg.png",
      alt: "Vape pod startkit illustration",
      width: 160,
      height: 200,
    },
    nicotineLabelWarningText,
    warningText: warningText,
    sameBrandProductsPicker: {
      title: "Upptäck övriga startkit",
      description: "Välj bland alla övriga förfyllda vape start-kit från ",
      emptyMessage: "Inga andra produkter tillgängliga just nu.",
      showIfEmpty: false,
    },
  },

  [CATEGORY_SLUGS.START_KIT_VAPE]: {
    bulletPointsIcon: {
      src: "/images/icons/sketches/vape_sketch_bg.png",
      alt: "Påfyllningsbart podsystem illustration",
      width: 160,
      height: 200,
    },
    nicotineLabelWarningText,
    warningText: warningText,
    sameBrandProductsPicker: {
      title: "Fler varianter av samma modell",
      description:
        "Välj bland alla övriga påfyllningsbara vape start-kit från " /* + brandName will be added in the component */,
      emptyMessage: "Inga andra produkter tillgängliga just nu.",
      showIfEmpty: false,
    },
  },

  [CATEGORY_SLUGS.PREFILLED_PODS]: {
    bulletPointsIcon: {
      src: "/images/icons/sketches/vape_pod_sketch.png",
      alt: "Förfylld pod illustration",
      width: 454,
      height: 652,
    },
    nicotineLabelWarningText,
    warningText: warningText,
    sameBrandProductsPicker: {
      title: "Upptäck övriga smaker av samma märke",
      description:
        "Välj bland alla övriga förfyllda pods från " /* + brandName will be added in the component */,
      emptyMessage: "Inga andra produkter tillgängliga just nu.",
      showIfEmpty: false,
    },
  },
  [CATEGORY_SLUGS.E_JUICE]: {
    bulletPointsIcon: {
      src: "/images/icons/sketches/e-juice_sketch.png",
      alt: "E-juice flaska illustration",
      width: 160,
      height: 200,
    },
    nicotineLabelWarningText,
    warningText: warningText,
    sameBrandProductsPicker: {
      title: "Fler e-juice smaker av samma märke",
      description: "Utforska fler smaker och nikotinstyrkor av e-juice från ",
      emptyMessage: "Inga andra produkter tillgängliga just nu.",
      showIfEmpty: false,
    },
  },

  [CATEGORY_SLUGS.WHITE_SNUS]: {
    bulletPointsIcon: {
      src: "/images/icons/sketches/nicotine_pouch_sketch-min.png",
      alt: "Vitt snus illustration",
      width: 160,
      height: 200,
    },
    nicotineLabelWarningText,
    warningText: warningText,
    sameBrandProductsPicker: {
      title: "Fler varianter av vitt snus av samma märke",
      description: "Utforska fler smaker och styrkor av vitt snus från ",
      emptyMessage: "Inga andra produkter tillgängliga just nu.",
      showIfEmpty: false,
    },
  },
  [CATEGORY_SLUGS.CANDY]: {
    bulletPointsIcon: {
      src: "/images/icons/sketches/lollipops_retro_transp.png",
      alt: "Konfektyr illustration",
      width: 160,
      height: 160,
    },
    warningText:
      "Dessa produkter innehåller INTE nikotin och är ett nikotinfritt alternativ för personer som försöker sluta med nikotinprodukter.",
    sameBrandProductsPicker: {
      title: "Konfektyr av samma märke",
      description:
        "Utforska fler smaker och varianter av vårt nikotinfria godis från " /* + brandName will be added in the component */,
      emptyMessage: "Fler varianter kommer snart.",
      showIfEmpty: false,
    },
  },
  [CATEGORY_SLUGS.SUBSCRIPTIONS]: {
    bulletPointsIcon: {
      src: "/images/icons/sketches/subscription_box_sketch.png",
      alt: "Prenumerationslåda illustration",
      width: 160,
      height: 200,
    },
    warningText:
      "OBS! Vissa produkter i prenumerationen innehåller nikotin som är ett beroendeframkallande ämne.",
    sameBrandProductsPicker: {
      title: "Upptäck våra prenumerationsalternativ",
      description: "Välj den prenumeration som passar dig bäst!",
      emptyMessage: "Inga andra prenumerationer tillgängliga just nu.",
      showIfEmpty: false,
    },
  },
  [CATEGORY_SLUGS.NICOTINE_CESSATION]: {
    bulletPointsIcon: {
      src: "/images/icons/sketches/nicotine_chewing-gum_blister.png", // You'll need to create this image
      alt: "Nikotintuggummi illustration",
      width: 160,
      height: 200,
    },
    warningText:
      "Detta är ett receptfritt läkemedel som innehåller nikotin. Läs bipacksedeln noga före användning. Från 18 år. För farmaceutisk rådgivning, kontakta apotek eller Läkemedelsupplysningen.",
    sameBrandProductsPicker: {
      title: "Hitta rätt hjälpmedel för dig",
      description:
        "Utforska fler nikotinavvänjningsprodukter, nikotintuggummin och plåster från " /* + brandName will be added in the component */,
      emptyMessage: "Inga andra produkter tillgängliga just nu.",
      showIfEmpty: false,
    },
  },
  [CATEGORY_SLUGS.ACCESSORIES]: {
    bulletPointsIcon: {
      src: "/images/icons/sketches/usb_charger_sketch.png", // You'll need to create this image
      alt: "Vape accessories illustration",
      width: 160,
      height: 200,
    },
    warningText:
      "Använd alltid tillbehör som är kompatibla med din specifika enhet för bästa resultat och säkerhet.",
    sameBrandProductsPicker: {
      title: "Utforska övriga tillbehör",
      description:
        "Övriga tillbehör från " /* + brandName will be added in the component */,
      emptyMessage: "Inga andra tillbehör tillgängliga just nu.",
      showIfEmpty: false,
    },
  },
  default: {},
};
