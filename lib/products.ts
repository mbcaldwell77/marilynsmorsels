export type PackSize = 6 | 12;
export type FlavorOption =
  | "chocolate_chip"
  | "butterscotch_chip"
  | "half_half"
  | "cookie_dough";

export interface ProductOption {
  id: string;
  name: string;
  description: string;
  packSize: PackSize;
  flavor: FlavorOption;
  priceCents: number;
  stripePriceId: string;
}

const priceId = (envKey: string, fallback: string) =>
  process.env[envKey] ?? fallback;

export const products: ProductOption[] = [
  {
    id: "cc-6",
    name: "Chocolate Chip · 6-Pack",
    description: "Classic, buttery chocolate chip morsels.",
    packSize: 6,
    flavor: "chocolate_chip",
    priceCents: 1200,
    stripePriceId: priceId("NEXT_PUBLIC_STRIPE_PRICE_CC_6", "price_cc_6"),
  },
  {
    id: "cc-12",
    name: "Chocolate Chip · 12-Pack",
    description: "A dozen of Marilyn’s original favorite.",
    packSize: 12,
    flavor: "chocolate_chip",
    priceCents: 2200,
    stripePriceId: priceId("NEXT_PUBLIC_STRIPE_PRICE_CC_12", "price_cc_12"),
  },
  {
    id: "bc-6",
    name: "Butterscotch Chip · 6-Pack",
    description: "Rich butterscotch & chocolate, caramelized edges.",
    packSize: 6,
    flavor: "butterscotch_chip",
    priceCents: 1300,
    stripePriceId: priceId("NEXT_PUBLIC_STRIPE_PRICE_BC_6", "price_bc_6"),
  },
  {
    id: "bc-12",
    name: "Butterscotch Chip · 12-Pack",
    description: "A full dozen of signature butterscotch chocolate chip.",
    packSize: 12,
    flavor: "butterscotch_chip",
    priceCents: 2400,
    stripePriceId: priceId("NEXT_PUBLIC_STRIPE_PRICE_BC_12", "price_bc_12"),
  },
  {
    id: "hh-6",
    name: "Half & Half · 6-Pack",
    description: "3 chocolate chip, 3 butterscotch chocolate chip.",
    packSize: 6,
    flavor: "half_half",
    priceCents: 1300,
    stripePriceId: priceId("NEXT_PUBLIC_STRIPE_PRICE_HH_6", "price_hh_6"),
  },
  {
    id: "hh-12",
    name: "Half & Half · 12-Pack",
    description: "6 of each flavor. Best of both.",
    packSize: 12,
    flavor: "half_half",
    priceCents: 2400,
    stripePriceId: priceId("NEXT_PUBLIC_STRIPE_PRICE_HH_12", "price_hh_12"),
  },
  {
    id: "dough-pint",
    name: "Chocolate Chip Cookie Dough Pint",
    description: "Ready-to-bake chocolate chip cookie dough, pint size.",
    packSize: 12,
    flavor: "cookie_dough",
    priceCents: 2000,
    stripePriceId: priceId("NEXT_PUBLIC_STRIPE_PRICE_CC_CDP", "price_cc_cdp"),
  },
  {
    id: "dough-quart",
    name: "Chocolate Chip Cookie Dough Quart",
    description: "Party-ready quart of chocolate chip cookie dough.",
    packSize: 12,
    flavor: "cookie_dough",
    priceCents: 3000,
    stripePriceId: priceId("NEXT_PUBLIC_STRIPE_PRICE_CC_CDQ", "price_cc_cdq"),
  },
];

export function getProductById(id: string): ProductOption | undefined {
  return products.find((product) => product.id === id);
}

