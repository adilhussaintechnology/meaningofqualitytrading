import type { CartItem } from "@/contexts/CartContext";

export type ClientInfo = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  note?: string;
};

export function buildWhatsAppMessage(items: CartItem[], info: ClientInfo = {}): string {
  const lines: string[] = [];
  lines.push("Inquiry from Meaning of Quality website");
  if (info.name) lines.push(`Name: ${info.name}`);
  if (info.company) lines.push(`Company: ${info.company}`);
  if (info.email) lines.push(`Email: ${info.email}`);
  if (info.phone) lines.push(`Phone: ${info.phone}`);
  if (info.note) lines.push(`Note: ${info.note}`);
  lines.push("");
  lines.push("Items:");
  items.forEach((it, idx) => {
    const parts = [
      `${idx + 1}. ${it.name}`,
      it.productCode ? `Code: ${it.productCode}` : undefined,
      it.volume ? `Volume: ${it.volume}` : undefined,
      it.type ? `Type: ${it.type}` : undefined,
      it.stockCode ? `Stock: ${it.stockCode}` : undefined,
      it.priceRange ? `Price: ${it.priceRange.min} - ${it.priceRange.max}` : undefined,
      `Qty: ${it.qty}`,
    ].filter(Boolean);
    lines.push(parts.join(" | "));
  });
  const total = items.reduce((acc, it) => acc + it.qty, 0);
  lines.push("");
  lines.push(`Total items: ${total}`);
  return lines.join("\n");
}

