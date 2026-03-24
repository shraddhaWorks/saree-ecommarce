export const toStaticSlug = (label: string) =>
  label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const createItems = (categorySlug: string, labels: string[]) =>
  labels.map((label) => ({
    label,
    href: `/${categorySlug}/${toStaticSlug(label)}`,
  }));

export const staticNavCategories = {
  traditionalSarees: {
    title: "Traditional Sarees",
    href: "/traditional-sarees",
    items: createItems("traditional-sarees", [
      "Kanchi Pattu Sarees",
      "Banaras Sarees",
      "Paithani Sarees",
      "Patola Sarees",
      "Gadwal Pattu Sarees",
      "Arani Pattu Sarees",
      "Venkatagiri Sarees",
      "Uppada Pattu Sarees",
      "Mangalagiri Pattu Sarees",
      "Mysore Silk Sarees",
    ]),
  },
  weddingSarees: {
    title: "Wedding Sarees",
    href: "/wedding-sarees",
    items: createItems("wedding-sarees", [
      "Bridal Sarees",
      "Reception Sarees",
      "Pradanam & Talambralu Sarees",
      "Nischayathartham/Engagement Sarees",
      "Mehendi & Haldi Sarees",
    ]),
  },
  designerPartyWearSarees: {
    title: "Designer & Party Wear Sarees",
    href: "/designer-and-party-wear-sarees",
    items: createItems("designer-and-party-wear-sarees", [
      "Organza Sarees",
      "Zari Kota & Semi Kota Sarees",
      "Muslin, Dola & Mashru Sarees",
      "Fusion Sarees",
    ]),
  },
  festiveWearSarees: {
    title: "Festive Wear Sarees",
    href: "/festive-wear-sarees",
    items: createItems("festive-wear-sarees", [
      "Pattu Pavada Set / Half Saree Set / Lehengas",
      "Chanderi & Bailu Silk Sarees",
      "Ikkat Sarees",
      "Bandini Sarees",
      "Fancy & Designer Sarees",
      "Soft Pattu",
    ]),
  },
  casualWorkwearSarees: {
    title: "Casual & Workwear Sarees",
    href: "/casual-and-workwear-sarees",
    items: createItems("casual-and-workwear-sarees", [
      "Georgette, Crepe, Satin & Chiffon Silk Sarees",
      "Khadi, Jute, Bhagalpur & Printed Sarees",
      "Tissu Sarees",
      "Tusser Sarees",
    ]),
  },
  dhotiAndKanduva: {
    title: "Dhoti & Kanduva",
    href: "/dhoti-and-kanduva",
    items: createItems("dhoti-and-kanduva", [
      "Silk Dhotis",
      "Cotton Dhotis",
      "Pattu Kanduvas",
      "Dhoti & Kanduva Sets",
    ]),
  },
  stores: {
    title: "Our Stores",
    href: "/stores",
    items: createItems("stores", [
      "Hyderabad Banjara Hills",
      "Secunderabad",
      "Vijayawada",
      "Visakhapatnam",
    ]),
  },
} as const;
