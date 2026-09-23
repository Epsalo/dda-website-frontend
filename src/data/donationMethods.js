// Shared catalog of banks and mobile wallets shown on the donate page.
// Bank logos are optional: drop a PNG into public/payments/banks/<id>.png and it
// is picked up automatically; otherwise a colored monogram tile is shown.
export const BANKS = [
  { id: "cbe", name: "Commercial Bank of Ethiopia", short: "CBE", color: "#6a2c91", logo: "/payments/banks/cbe.png" },
  { id: "awash", name: "Awash Bank", short: "AB", color: "#e87722", logo: "/payments/banks/awash.png" },
  { id: "dashen", name: "Dashen Bank", short: "DB", color: "#1b6ca8", logo: "/payments/banks/dashen.png" },
  { id: "abyssinia", name: "Bank of Abyssinia", short: "BoA", color: "#a6192e", logo: "/payments/banks/abyssinia.png" },
  { id: "coop", name: "Cooperative Bank of Oromia", short: "CBO", color: "#f58220", logo: "/payments/banks/coop.png" },
  { id: "hibret", name: "Hibret Bank", short: "HB", color: "#1e7a46", logo: "/payments/banks/hibret.png" },
  { id: "zemen", name: "Zemen Bank", short: "ZB", color: "#0f4c9c", logo: "/payments/banks/zemen.png" },
  { id: "oromia", name: "Oromia Bank", short: "OB", color: "#1e7a46", logo: "/payments/banks/oromia.png" },
];

export const WALLETS = [
  { id: "telebirr", name: "Telebirr", logo: "/payments/telebirr.png" },
  { id: "cbebirr", name: "CBE Birr", logo: "/payments/cbe-birr.jpg" },
  { id: "mpesa", name: "M-Pesa", logo: "/payments/mpesa.webp" },
  { id: "coopay", name: "Coopay-Ebirr", logo: "/payments/coopay-ebirr.png" },
];
