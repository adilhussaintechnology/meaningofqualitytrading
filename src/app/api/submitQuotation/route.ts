import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Define types for your data structure
interface LocalizedString {
  en?: string;
  ar?: string;
}

interface PriceRange {
  min: number;
  max: number;
}

interface QuotationItem {
  name: string | LocalizedString;
  productCode?: string;
  volume?: string;
  type?: string;
  stockCode?: string;
  priceRange?: PriceRange;
  qty?: number;
}

interface QuotationData {
  name: string;
  company: string;
  email: string;
  phone: string;
  note: string;
  items?: QuotationItem[];
}

function formatItems(items: QuotationItem[]) {
  return items
    .map((it, idx) => {
      // Extract name - prefer English, fallback to Arabic, then default
      let nameStr = "-";
      if (it.name) {
        if (typeof it.name === "string") {
          nameStr = it.name;
        } else if (typeof it.name === "object") {
          nameStr = it.name.en || it.name.ar || "-";
        }
      }
      
      const parts = [
        `${idx + 1}. ${nameStr}`,
        it.productCode ? `Code: ${it.productCode}` : undefined,
        it.volume ? `Volume: ${it.volume}` : undefined,
        it.type && it.type !== "-" ? `Type: ${it.type}` : undefined,
        it.stockCode && it.stockCode !== "-" ? `Stock: ${it.stockCode}` : undefined,
        it.priceRange ? `Price: ${it.priceRange.min} - ${it.priceRange.max}` : undefined,
        `Qty: ${it.qty ?? 1}`,
      ].filter(Boolean);
      return parts.join(" | ");
    })
    .join("\n");
}

export async function POST(req: Request) {
  try {
    const data: QuotationData = await req.json();
    console.log("Received data:", data);

    const itemsText = formatItems(data.items || []);
    console.log("Formatted items:", itemsText);

    // Check if environment variables are set
    if (!process.env.NEXT_PUBLIC_GMAIL_USER || !process.env.NEXT_PUBLIC_GMAIL_APP_PASSWORD) {
      console.error("Missing environment variables");
      return NextResponse.json(
        { success: false, message: "Email configuration is missing" },
        { status: 500 }
      );
    }

    console.log("Creating transporter with user:", process.env.NEXT_PUBLIC_GMAIL_USER);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_GMAIL_USER,
        pass: process.env.NEXT_PUBLIC_GMAIL_APP_PASSWORD,
      },
    });

    console.log("Sending email...");

    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_GMAIL_USER,
      to: process.env.NEXT_PUBLIC_GMAIL_USER,
      cc: "sales@moq.com.sa",
      subject: "New Quotation Request",
      text: `
Name: ${data.name}
Company: ${data.company}
Email: ${data.email}
Phone: ${data.phone}
Note: ${data.note}

Items:
${itemsText}

Total items: ${data.items?.length || 0}
      `,
    });

    console.log("Email sent successfully");

    return NextResponse.json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("Email Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Email failed";
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error("Error message:", errorMessage);
    console.error("Error stack:", errorStack);
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}