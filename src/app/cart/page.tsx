"use client";

import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { useCart } from "@/contexts/CartContext";
import { useLang } from "@/hooks/useLang";
import { t } from "@/data/labels";
import { WHATSAPP_NUMBER } from "@/data/site";
import { buildWhatsAppMessage, type ClientInfo } from "@/utils/whatsapp";
import { useRef, useState, useEffect } from "react";
import ArabicReshaper from 'arabic-reshaper';
import { pickAny } from "@/data/i18n";
import type { jsPDF } from "jspdf";
import { AmiriRegular, AmiriBold } from "@/utils/fonts/amiri";
import { FaShareAlt, FaWhatsapp, FaFilePdf } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import ArabicNumberTranslator from "@/components/ui/ArabicNumberTranslator";


export const hasArabic = (text: string): boolean => {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
};

export default function CartPage() {
  const { items, updateQty, remove, clear } = useCart();
  const lang = useLang();
  const [info, setInfo] = useState<ClientInfo>({});
  const formRef = useRef<HTMLFormElement>(null);
  const [openShare, setOpenShare] = useState(false);
  // const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  const totalItems = items.reduce((acc, it) => acc + it.qty, 0);
  const [isSubmittingQ, setIsSubmittingQ] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // PDF Download Cooldown States
  const [pdfCooldown, setPdfCooldown] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) {
        clearInterval(cooldownTimerRef.current);
      }
    };
  }, []);

  const handleSubmitQuotation = async () => {
    if (!formRef.current || isSubmittingQ) return;
    if (!ensureFormValid()) return;

    // ❌ Stop immediately if offline
    if (!navigator.onLine) {
      toast.error("You are offline. Please connect to the internet and try again.");
      return;
    }

    setIsSubmittingQ(true);
    toast.loading("Submitting quotation...", { id: "quotation" });

    try {
      // ⏱ Fetch with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 sec

      const response = await fetch("/api/submitQuotation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...info, items }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        toast.success("Quotation submitted successfully!", {
          id: "quotation",
        });

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 10000);
      } else {
        toast.error(result.message || "Submission failed", {
          id: "quotation",
        });
        console.error(result);
      }
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "AbortError") {
        toast.warning("Request timed out. Please try again.", {
          id: "quotation",
        });
      } else {
        toast.error("Network error. Please check your internet connection.", {
          id: "quotation",
        });
      }

      console.error("Quotation submit error:", error);
    } finally {
      setIsSubmittingQ(false);
    }

  };


  const ensureFormValid = (): boolean => {
    const form = formRef.current;
    if (!form) return false;
    if (form.checkValidity()) return true;
    form.reportValidity();
    const firstInvalid = form.querySelector<HTMLElement>(":invalid");
    firstInvalid?.focus();
    return false;
  };

  // WhatsApp Integration
  const handleSendWhatsApp = () => {
    if (!ensureFormValid()) return;
    const msg = buildWhatsAppMessage(items, info);
    const encoded = encodeURIComponent(msg);
    const base = WHATSAPP_NUMBER
      ? `https://wa.me/${WHATSAPP_NUMBER}`
      : `https://wa.me/`;
    const url = `${base}?text=${encoded}`;
    window.open(url, "_blank");
  };

  // Email Integration (text-only)
  const handleSendEmail = () => {
    if (!ensureFormValid()) return;
    const msg = buildWhatsAppMessage(items, info); // reuse message generator
    const subject = encodeURIComponent("Quotation Request - Meaning of Quality");
    const body = encodeURIComponent(msg);
    const mailto = `mailto:sale@moq.com.sa?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  };

  // Start cooldown timer
  const startCooldown = (seconds: number) => {
    setPdfCooldown(true);
    setCooldownSeconds(seconds);

    // Clear any existing timer
    if (cooldownTimerRef.current) {
      clearInterval(cooldownTimerRef.current);
    }

    // Start countdown
    cooldownTimerRef.current = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) {
          if (cooldownTimerRef.current) {
            clearInterval(cooldownTimerRef.current);
          }
          setPdfCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleDownloadPDF = async () => {
    // Check if cooldown is active
    if (pdfCooldown) {
      toast.error(`Please wait ${cooldownSeconds} seconds before downloading again.`);
      return;
    }

    if (!ensureFormValid()) return;

    // Start cooldown (10 seconds - you can change this to 5-10 as needed)
    const COOLDOWN_DURATION = 10; // Change to 5 for 5 seconds
    startCooldown(COOLDOWN_DURATION);

    const { jsPDF } = await import("jspdf").then((mod) => mod);
    const QRCode = (await import("qrcode")).default;

    if (typeof window === "undefined") return;

    // Get current language
    const isArabic = lang === "ar";

    // ===== PDF LABELS =====
    const labels = {
      requestForQuotation: isArabic ? "طلب عرض أسعار" : "Request for Quotation",
      quoteNumber: isArabic ? "رقم العرض" : "Quote#",
      companyInfo: isArabic ? "معلومات الشركة" : "Company Info",
      companyName: isArabic ? "مؤسسة معنى الجودة التجارية" : "The Meaning of Quality Trading Establishment",
      companyAddress1: isArabic ? "شارع جار الله بن فهد" : "Jarallah Bin Fahad Street",
      companyAddress2: isArabic ? "حي الجزيرة 14262 الرياض، المملكة العربية السعودية" : "Al Jazeerah District 14262 Riyadh, Saudi Arabia",
      phone: isArabic ? "الهاتف" : "Phone",
      email: isArabic ? "البريد الإلكتروني" : "Email",
      customerInfo: isArabic ? "معلومات العميل" : "Customer Info",
      name: isArabic ? "الاسم" : "Name",
      company: isArabic ? "الشركة" : "Company",
      customerNote: isArabic ? "ملاحظة العميل" : "Customer Note",
      generatedBy: isArabic ? "تم الإنشاء بواسطة" : "Generated By",
      generatedByText: isArabic ? "مؤسسة معنى الجودة التجارية - الموقع الإلكتروني" : "The Meaning of Quality Trading Establishment - Website",
      scanQR: isArabic ? "امسح رمز الاستجابة السريعة لتفاصيل الاستفسار" : "Scan QR for inquiry details",
      index: "#",
      image: isArabic ? "الصورة" : "Image",
      item: isArabic ? "الصنف" : "Item",
      details: isArabic ? "التفاصيل" : "Details",
      quantity: isArabic ? "الكمية" : "Qty",
      code: isArabic ? "الكود" : "Code",
      volume: isArabic ? "الحجم" : "Vol",
      type: isArabic ? "النوع" : "Type",
      stock: isArabic ? "المخزون" : "Stock",
      price: isArabic ? "السعر" : "Price",
      footerPrefix: isArabic ? "للحصول على عرض أسعار: يرجى إرسال هذا الملف إلى " : "For Quotation: Please forward this PDF to ",
      footerMiddle: isArabic ? " أو إرساله عبر واتساب" : " or send via WhatsApp",
      page: isArabic ? "صفحة" : "Page",
      of: isArabic ? "من" : "of"
    };

    const loadArabicFonts = (doc: jsPDF): boolean => {
      try {
        doc.addFileToVFS("Amiri-Regular.ttf", AmiriRegular.data);
        doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");

        doc.addFileToVFS("Amiri-Bold.ttf", AmiriBold.data);
        doc.addFont("Amiri-Bold.ttf", "Amiri", "bold");

        return true;
      } catch (e) {
        console.error("Arabic font load failed:", e);
        return false;
      }
    };


    // ===== ARABIC TEXT HELPERS =====
    const hasArabic = (text: string): boolean => {
      return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
    };

    const arabicText = (text: string): string => {
      if (typeof text !== "string") text = String(text);

      // Use ArabicReshaper for proper text processing
      try {
        return ArabicReshaper.convertArabic(text);
      } catch (e) {
        console.error("Arabic reshaping failed:", e);
        return text;
      }
    };


    // ===== INITIALIZE PDF =====
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();

    // ALWAYS load Arabic fonts (needed for mixed content and Arabic mode)
    const fontLoaded = await loadArabicFonts(doc);
    if (!fontLoaded) {
      console.warn('Arabic fonts failed to load. Arabic text may not display correctly.');
    }

    // ===== DIMENSIONS =====
    const COLORS = {
      primary: { r: 22, g: 163, b: 74 },
      gray: (v: number) => ({ r: v, g: v, b: v }),
    };

    const DIMENSIONS = {
      margin: 12,
      headerBarH: 22,
      infoBoxH: 40,
      bottomMargin: 14,
      table: { idxW: 8, imgW: 20, nameW: 80, metaW: 60, qtyW: 12, minRowH: 24 },
    };

    // ===== DATE CALCULATION =====
    const now = new Date();
    const localOffset = now.getTimezoneOffset();
    const saudiOffset = 3 * 60;
    const saudiTime = new Date(now.getTime() + (saudiOffset + localOffset) * 60000);

    const day = String(saudiTime.getDate()).padStart(2, '0');
    const month = String(saudiTime.getMonth() + 1).padStart(2, '0');
    const year = saudiTime.getFullYear();
    const hours = String(saudiTime.getHours()).padStart(2, '0');
    const minutes = String(saudiTime.getMinutes()).padStart(2, '0');
    const seconds = String(saudiTime.getSeconds()).padStart(2, '0');

    const inquiryNumber = `${day}${month}${year}${hours}${minutes}${seconds}`;

    // ===== IMPROVED TEXT DRAWING HELPERS =====
    const drawText = (
      text: string,
      x: number,
      y: number,
      options?: {
        align?: "left" | "center" | "right";
        maxWidth?: number;
        fontSize?: number;
        fontStyle?: "normal" | "bold";
      }
    ) => {
      const fontSize = options?.fontSize || 10;
      const fontStyle = options?.fontStyle || "normal";

      doc.setFontSize(fontSize);

      const needsArabic = hasArabic(text) || isArabic;

      if (needsArabic) {
        doc.setFont("Amiri", fontStyle);
        const processed = hasArabic(text) ? arabicText(text) : text;

        doc.text(processed, x, y, {
          align: options?.align || (isArabic ? "right" : "left"),
          maxWidth: options?.maxWidth
        });
      } else {
        doc.setFont("helvetica", fontStyle);
        doc.text(text, x, y, {
          align: options?.align || "left",
          maxWidth: options?.maxWidth
        });
      }
    };



    const splitText = (text: string, maxWidth: number): string[] => {
      const needsArabicFont = hasArabic(text) || isArabic;

      if (needsArabicFont) {
        doc.setFont("Amiri", "normal");
        const processed = hasArabic(text) ? arabicText(text) : text;

        return doc.splitTextToSize(processed, maxWidth);
      } else {
        doc.setFont("helvetica", "normal");
        return doc.splitTextToSize(text, maxWidth);
      }
    };

    // ===== UTILITY FUNCTIONS =====
    const toDataURL = async (src?: string): Promise<string | null> => {
      if (!src) return null;
      try {
        const abs = src.startsWith("http")
          ? src
          : new URL(src, window.location.origin).href;
        const res = await fetch(abs);
        if (!res.ok) return null;
        const blob = await res.blob();
        return await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      } catch {
        return null;
      }
    };

    const generateQR = async (inquiryNumber: string): Promise<string> => {
      const qrText = [
        labels.requestForQuotation,
        `${labels.quoteNumber}: ${inquiryNumber}`,
        `${isArabic ? 'التاريخ' : 'Date'}: ${new Date().toLocaleDateString()}`,
        `${labels.name}: ${info.name || 'N/A'}`,
        `${labels.company}: ${info.company || 'N/A'}`,
        `${labels.email}: ${info.email || 'N/A'}`,
        `${labels.phone}: ${info.phone || 'N/A'}`
      ].join('\n');

      return await QRCode.toDataURL(qrText, {
        errorCorrectionLevel: "M",
        margin: 1,
        width: 256,
        color: { dark: "#000000", light: "#FFFFFF" },
      });
    };

    // ===== HEADER BAR =====
    const drawHeaderBar = (showInquiry: boolean) => {
      doc.setFillColor(106, 106, 106);
      doc.rect(0, 0, pageW, DIMENSIONS.headerBarH, "F");

      if (showInquiry) {
        doc.setTextColor(255, 255, 255);

        if (isArabic) {
          // Arabic layout - logo on right
          const logoX = pageW - DIMENSIONS.margin - 12;
          const logoY = 6;
          const logoSize = 8;
          doc.setFillColor(255, 255, 255);
          doc.roundedRect(logoX, logoY, logoSize + 4, logoSize + 4, 2, 2, "F");
          doc.setTextColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
          doc.setFont("helvetica", "bold").setFontSize(9);
          doc.text("MOQ", logoX + 2.5, logoY + 6, { baseline: "middle" });

          doc.setTextColor(255, 255, 255);
          drawText(labels.companyName, logoX - 2, 14, {
            align: "right",
            fontSize: 10,
            fontStyle: "bold"
          });

          // Center title
          drawText(labels.requestForQuotation, pageW / 2, 11, {
            align: "center",
            fontSize: 16,
            fontStyle: "bold"
          });
          drawText(`${labels.quoteNumber}: ${inquiryNumber}`, pageW / 2, 17, {
            align: "center",
            fontSize: 9
          });

          // Date on left
          let generatedAt = saudiTime.toLocaleString("ar-SA", {
            dateStyle: "short",
            timeStyle: "short"
          });

          // Reverse the string for basic RTL support
          generatedAt = generatedAt.split("").reverse().join("");

          // Draw using your current drawText
          drawText(generatedAt, DIMENSIONS.margin, 14, {
            fontSize: 9,
            align: "left"
          });
        } else {
          // English layout - logo on left
          const logoX = DIMENSIONS.margin;
          const logoY = 6;
          const logoSize = 8;
          doc.setFillColor(255, 255, 255);
          doc.roundedRect(logoX, logoY, logoSize + 4, logoSize + 4, 2, 2, "F");
          doc.setTextColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
          doc.setFont("helvetica", "bold").setFontSize(9);
          doc.text("MOQ", logoX + 2.5, logoY + 6, { baseline: "middle" });

          doc.setTextColor(255, 255, 255);
          doc.setFont("helvetica", "bold").setFontSize(10);
          doc.text("Meaning of Quality", logoX + 15, 14);

          doc.setFont("helvetica", "bold").setFontSize(16);
          doc.text(labels.requestForQuotation, pageW / 2, 11, { align: "center" });
          doc.setFont("helvetica", "normal").setFontSize(9);
          doc.text(`${labels.quoteNumber}: ${inquiryNumber}`, pageW / 2, 17, { align: "center" });

          const generatedAt = saudiTime.toLocaleString('en-US', {
            dateStyle: 'short',
            timeStyle: 'short'
          });
          doc.setFont("helvetica", "normal").setFontSize(9);
          doc.text(generatedAt, pageW - DIMENSIONS.margin, 14, { align: "right" });
        }

        doc.setTextColor(0, 0, 0);
      }

      doc.setDrawColor(200);
      doc.setLineWidth(0.2);
      doc.line(0, DIMENSIONS.headerBarH, pageW, DIMENSIONS.headerBarH);
    };

    const drawCompanyAndCustomer = async (yStart: number) => {
      const colW = (pageW - DIMENSIONS.margin * 2 - 6) / 2;

      // Determine box positions based on language
      const companyBoxX = isArabic ? DIMENSIONS.margin + colW + 6 : DIMENSIONS.margin;
      const customerBoxX = isArabic ? DIMENSIONS.margin : DIMENSIONS.margin + colW + 6;

      // ========================================
      // COMPANY BOX
      // ========================================
      doc.setDrawColor(220).setLineWidth(0.4);
      doc.roundedRect(companyBoxX, yStart, colW, DIMENSIONS.infoBoxH, 2, 2, "S");

      const companyX = isArabic ? companyBoxX + colW - 4 : companyBoxX + 4;

      drawText(labels.companyInfo, companyX, yStart + 6, {
        fontSize: 11,
        fontStyle: "bold",
        align: isArabic ? "right" : "left"
      });

      let y = yStart + 12;
      const companyLines = [
        labels.companyName,
        labels.companyAddress1,
        labels.companyAddress2,
        `${labels.phone}: 00966 590019826`,
        `${labels.email}: sale@moq.com.sa`,
      ];

      companyLines.forEach((line) => {
        if (isArabic) {
          // For Arabic mode, process each line
          const parts = line.split(':');
          if (parts.length === 2) {
            // Has colon - it's a label: value pair
            const label = parts[0].trim();
            const value = parts[1].trim();

            // Check if value has Arabic
            if (hasArabic(value)) {
              // Both Arabic
              doc.setFont("Amiri", "normal");
              doc.setFontSize(9);
              const fullText = arabicText(`${label} : ${value}`);
              doc.text(fullText, companyX, y, { align: "right" });
            } else {
              // Arabic label, English value
              doc.setFont("Amiri", "normal");
              doc.setFontSize(9);
              const labelText = arabicText(':' + label);
              doc.text(labelText, companyX, y, { align: "right" });

              const labelWidth = doc.getTextWidth(labelText);
              doc.setFont("helvetica", "normal");
              doc.text(value, companyX - labelWidth - 2, y, { align: "right" });
            }
          } else {
            // No colon - just Arabic text
            doc.setFont("Amiri", "normal");
            doc.setFontSize(9);
            doc.text(arabicText(line), companyX, y, { align: "right" });
          }
        } else {
          // English mode
          drawText(line, companyX, y, {
            fontSize: 9,
            align: "left",
            maxWidth: colW - 8
          });
        }
        y += 5;
      });


      doc.roundedRect(customerBoxX, yStart, colW, DIMENSIONS.infoBoxH, 2, 2, "S");

      const customerX = isArabic ? customerBoxX + colW - 4 : customerBoxX + 4;

      drawText(labels.customerInfo, customerX, yStart + 6, {
        fontSize: 11,
        fontStyle: "bold",
        align: isArabic ? "right" : "left"
      });

      let cy = yStart + 12;
      const customerFields: Array<{ label: string; value: string }> = [];

      if (info.name) customerFields.push({ label: labels.name, value: info.name });
      if (info.company) customerFields.push({ label: labels.company, value: info.company });
      if (info.email) customerFields.push({ label: labels.email, value: info.email });
      if (info.phone) customerFields.push({ label: labels.phone, value: info.phone });

      customerFields.forEach(field => {
        const valueHasArabic = hasArabic(field.value);
        doc.setFontSize(9);

        if (isArabic) {
          if (valueHasArabic) {
            // Both Arabic
            doc.setFont("Amiri", "normal");
            const fullText = arabicText(`${field.label}: ${field.value}`);
            doc.text(fullText, customerX, cy, { align: "right" });
          } else {
            // Arabic label + English value
            doc.setFont("Amiri", "normal");
            const labelText = arabicText(`: ${field.label}`);
            doc.text(labelText, customerX, cy, { align: "right" });

            const labelWidth = doc.getTextWidth(labelText);
            doc.setFont("helvetica", "normal");
            doc.text(field.value, customerX - labelWidth - 2, cy, { align: "right" });
          }
        } else {
          if (valueHasArabic) {
            // English label + Arabic value
            doc.setFont("helvetica", "normal");
            const labelPart = `${field.label}: `;
            doc.text(labelPart, customerX, cy);

            const labelWidth = doc.getTextWidth(labelPart);
            doc.setFont("Amiri", "normal");
            doc.text(arabicText(field.value), customerX + labelWidth, cy);
          } else {
            // Both English
            drawText(`${field.label}: ${field.value}`, customerX, cy, {
              fontSize: 9,
              align: "left",
              maxWidth: colW - 8
            });
          }
        }
        cy += 5;
      });

      let nextY = Math.max(y, cy);

      // ========================================
      // NOTE SECTION
      // ========================================
      if (info.note) {
        const noteY = nextY + 10;
        const maxWidth = pageW - DIMENSIONS.margin * 2 - 10;
        const noteHasArabic = hasArabic(info.note);

        let processedNote = info.note;
        if (noteHasArabic) {
          processedNote = ArabicReshaper.convertArabic(info.note);
        }

        doc.setFont(noteHasArabic || isArabic ? "Amiri" : "helvetica", "normal");
        doc.setFontSize(9);
        const wrapped = doc.splitTextToSize(processedNote, maxWidth);

        const lineHeight = 5.5;
        const boxHeight = wrapped.length * lineHeight + 14;

        doc.roundedRect(
          DIMENSIONS.margin,
          noteY,
          pageW - DIMENSIONS.margin * 2,
          boxHeight,
          2, 2, "S"
        );

        const noteX = isArabic ? pageW - DIMENSIONS.margin - 4 : DIMENSIONS.margin + 4;
        drawText(`${labels.customerNote}:`, noteX, noteY + 8, {
          fontSize: 10,
          fontStyle: "bold",
          align: isArabic ? "right" : "left"
        });

        let lineY = noteY + 14;
        doc.setFont(noteHasArabic || isArabic ? "Amiri" : "helvetica", "normal");
        doc.setFontSize(9);

        wrapped.forEach((line: string | string[]) => {
          if (isArabic || noteHasArabic) {
            doc.text(line, noteX, lineY, { align: isArabic ? "right" : "left" });
          } else {
            doc.text(line, noteX, lineY);
          }
          lineY += lineHeight;
        });

        nextY = noteY + boxHeight + 6;
      }

      // ========================================
      // GENERATED BY BOX
      // ========================================
      const genY = nextY;
      const boxHeight = 28;
      doc.setDrawColor(220);
      doc.roundedRect(
        DIMENSIONS.margin,
        genY,
        pageW - DIMENSIONS.margin * 2,
        boxHeight,
        2, 2, "S"
      );

      const genX = isArabic ? pageW - DIMENSIONS.margin - 4 : DIMENSIONS.margin + 4;
      drawText(`${labels.generatedBy}:`, genX, genY + 8, {
        fontSize: 9,
        fontStyle: "bold",
        align: isArabic ? "right" : "left"
      });

      drawText(labels.generatedByText, genX, genY + 14, {
        fontSize: 9,
        align: isArabic ? "right" : "left",
        maxWidth: pageW - DIMENSIONS.margin * 2 - 30
      });

      const qrData = await generateQR(inquiryNumber);
      const qrSize = 24;
      const qrX = isArabic ? DIMENSIONS.margin + 2 : pageW - DIMENSIONS.margin - qrSize - 2;
      doc.addImage(qrData, "PNG", qrX, genY + 2, qrSize, qrSize);

      return genY + boxHeight + 8;
    };

    // ===== TABLE HEADER =====
    const drawTableHeader = (y: number) => {
      const { idxW, imgW, nameW, metaW } = DIMENSIONS.table;
      doc.setFillColor(245, 247, 250);
      doc.rect(DIMENSIONS.margin, y, pageW - DIMENSIONS.margin * 2, 9, "F");
      doc.setTextColor(60);

      if (isArabic) {
        // RTL layout - start from right (mirror of English)
        let x = pageW - DIMENSIONS.margin - 4;

        drawText(labels.index, x, y + 6, { align: "right", fontStyle: "bold", fontSize: 10 });
        x -= idxW;

        drawText(labels.image, x, y + 6, { align: "right", fontStyle: "bold", fontSize: 10 });
        x -= imgW;

        drawText(labels.item, x, y + 6, { align: "right", fontStyle: "bold", fontSize: 10 });
        x -= nameW;

        drawText(labels.details, x, y + 6, { align: "right", fontStyle: "bold", fontSize: 10 });
        x -= metaW;

        drawText(labels.quantity, x, y + 6, { align: "right", fontStyle: "bold", fontSize: 10 });
      } else {
        // LTR layout - start from left
        doc.setFont("helvetica", "bold").setFontSize(10);
        let x = DIMENSIONS.margin + 2;
        doc.text(labels.index, x, y + 6);
        x += idxW;
        doc.text(labels.image, x, y + 6);
        x += imgW;
        doc.text(labels.item, x, y + 6);
        x += nameW;
        doc.text(labels.details, x, y + 6);
        x += metaW;
        doc.text(labels.quantity, x, y + 6);
      }

      doc.setTextColor(0, 0, 0);
      return { rowY: y + 11 };
    };

    const drawFooter = (pageNum: number, pageCount: number) => {
      const y = pageH - 6; // single line position for footer
      const rightX = pageW - DIMENSIONS.margin;
      const leftX = DIMENSIONS.margin;

      if (isArabic) {
        doc.setFontSize(10);

        // Arabic text prefix
        doc.setFont("Amiri", "normal");
        doc.setTextColor(100);
        const prefix = "للحصول على عرض أسعار يرجى إرسال هذا الملف إلى ";
        doc.text(prefix, rightX, y, { align: "right" });

        // Email (right after prefix)
        doc.setFont("Amiri", "normal");
        doc.setTextColor(26, 115, 232);
        const emailX = rightX - doc.getTextWidth(prefix);
        doc.textWithLink("sales@moq.com.sa", emailX, y, {
          url: "mailto:sales@moq.com.sa",
          align: "right"
        });

        // Middle text (Arabic)
        doc.setFont("Amiri", "normal");
        doc.setTextColor(100);
        const middle = " أو إرساله عبر واتساب: ";
        const middleX = emailX - doc.getTextWidth("sales@moq.com.sa");
        doc.text(middle, middleX, y, { align: "right" });

        // WhatsApp link
        doc.setFont("Amiri", "normal");
        doc.setTextColor(37, 211, 102);
        const whatsappX = middleX - doc.getTextWidth(middle);
        doc.textWithLink("00966 590019826", whatsappX, y, {
          url: "https://wa.me/966590019826",
          align: "right"
        });

        // Page number on the left
        doc.setFont("Amiri", "normal");
        doc.setTextColor(100);
        doc.text(`${labels.page} ${pageNum} ${labels.of} ${pageCount}`, leftX, y, { align: "left" });

      } else {
        // English footer stays unchanged
        doc.setFontSize(8);
        const startX = DIMENSIONS.margin;

        doc.setTextColor(100);
        doc.setFont("helvetica", "normal");

        const prefix = "For Quotation: Please forward this PDF to ";
        doc.text(prefix, startX, y);

        const emailStart = startX + doc.getTextWidth(prefix);
        doc.setTextColor(0, 102, 204);
        doc.textWithLink("sales@moq.com.sa", emailStart, y, {
          url: "mailto:sales@moq.com.sa"
        });

        const middle = " or send via WhatsApp: ";
        const middleStart = emailStart + doc.getTextWidth("sales@moq.com.sa");
        doc.setTextColor(100);
        doc.text(middle, middleStart, y);

        const whatsappStart = middleStart + doc.getTextWidth(middle);
        doc.setTextColor(37, 211, 102);
        doc.textWithLink("00966 590019826", whatsappStart, y, {
          url: "https://wa.me/966590019826"
        });

        doc.setTextColor(100);
        doc.text(`${labels.page} ${pageNum} ${labels.of} ${pageCount}`, pageW - DIMENSIONS.margin, y, {
          align: "right"
        });
      }

      doc.setTextColor(0, 0, 0);
    };

    // ===== TABLE ROWS =====
    const renderRows = async (startIdx: number, startY: number) => {
      const { idxW, imgW, nameW, metaW, minRowH } = DIMENSIONS.table;
      let yPos = startY;

      const drawRow = async (rowIndex: number, yRow: number): Promise<number | -1> => {
        const it = items[rowIndex];
        if (!it) return 0;

        // Get product name in current language
        const productName = pickAny(it.name, lang);

        let calculatedRowH = minRowH;
        const nameLines = splitText(productName, nameW - 4);
        const nameHeight = nameLines.length * 4 + 4;
        if (nameHeight > calculatedRowH) {
          calculatedRowH = nameHeight;
        }

        const rowH = calculatedRowH;

        if (yRow + rowH > pageH - DIMENSIONS.bottomMargin) {
          doc.addPage();
          drawHeaderBar(false);
          drawTableHeader(DIMENSIONS.headerBarH + 2);
          return -1;
        }

        doc.setDrawColor(230).setLineWidth(0.3);
        doc.rect(DIMENSIONS.margin, yRow, pageW - DIMENSIONS.margin * 2, rowH);

        if (isArabic) {
          // RTL layout - right to left (mirror of English)
          let x = pageW - DIMENSIONS.margin - 4;

          // Index (rightmost)
          doc.setFont("Amiri", "normal");
          doc.setFontSize(10);
          doc.text(String(rowIndex + 1), x, yRow + 7, { align: "right" });
          x -= idxW;

          // Image
          if (it.img) {
            try {
              const imgData = await toDataURL(it.img);
              if (imgData) {
                const imgProps = (doc as unknown as { getImageProperties: (data: string) => { width: number; height: number } }).getImageProperties(imgData);
                const imgRatio = imgProps.width / imgProps.height;
                const maxW = imgW - 4;
                const maxH = rowH - 4;
                let drawW = maxW;
                let drawH = maxH;
                if (imgRatio > 1) drawH = maxW / imgRatio;
                else drawW = maxH * imgRatio;
                const imgX = x - imgW + (imgW - drawW) / 2;
                const imgY = yRow + (rowH - drawH) / 2;
                doc.addImage(imgData, "PNG", imgX, imgY, drawW, drawH);
              }
            } catch (e) {
              console.error("Image load failed:", e);
            }
          }
          x -= imgW;

          // Product name
          let nameY = yRow + 6;
          nameLines.forEach((line, idx) => {
            if (idx < 3) {
              drawText(line, x, nameY, {
                fontSize: 9,
                align: "right"
              });
              nameY += 4;
            }
          });
          x -= nameW;

          // Details
          const details: string[] = [];
          if (it.productCode) details.push(`${labels.code}: ${it.productCode}`);
          if (it.volume) details.push(`${labels.volume}: ${it.volume}`);
          if (it.type) details.push(`${labels.type}: ${it.type}`);
          if (it.stockCode) details.push(`${labels.stock}: ${it.stockCode}`);
          if (it.priceRange) {
            details.push(`${labels.price}: ${it.priceRange.min} – ${it.priceRange.max}`);
          }

          if (details.length > 0) {
            const detailText = details.join(" | ");
            const detailLines = splitText(detailText, metaW - 8);
            let detailY = yRow + 6;
            detailLines.forEach((line, idx) => {
              if (idx < 3) {
                drawText(line, x, detailY, {
                  fontSize: 8,
                  align: "right"
                });
                detailY += 4;
              }
            });
          }
          x -= metaW;

          // Quantity (leftmost)
          doc.setFont("Amiri", "normal");
          doc.setFontSize(10);
          doc.text(String(it.qty), x, yRow + 7, { align: "right" });
        } else {
          // LTR layout
          let x = DIMENSIONS.margin + 2;

          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.text(String(rowIndex + 1), x, yRow + 7);
          x += idxW;

          if (it.img) {
            try {
              const imgData = await toDataURL(it.img);
              if (imgData) {
                const imgProps = (doc as unknown as { getImageProperties: (data: string) => { width: number; height: number } }).getImageProperties(imgData);
                const imgRatio = imgProps.width / imgProps.height;
                const maxW = imgW - 4;
                const maxH = rowH - 4;
                let drawW = maxW;
                let drawH = maxH;
                if (imgRatio > 1) drawH = maxW / imgRatio;
                else drawW = maxH * imgRatio;
                const imgX = x + (imgW - drawW) / 2;
                const imgY = yRow + (rowH - drawH) / 2;
                doc.addImage(imgData, "PNG", imgX, imgY, drawW, drawH);
              }
            } catch (e) {
              console.error("Image load failed:", e);
            }
          }
          x += imgW;

          let nameY = yRow + 6;
          nameLines.forEach((line, idx) => {
            if (idx < 3) {
              drawText(line, x + 1, nameY, {
                fontSize: 9,
                align: hasArabic(line) ? "right" : "left",
                maxWidth: nameW - 4
              });
              nameY += 4;
            }
          });
          x += nameW;

          const details: string[] = [];
          if (it.productCode) details.push(`${labels.code}: ${it.productCode}`);
          if (it.volume) details.push(`${labels.volume}: ${it.volume}`);
          if (it.type) details.push(`${labels.type}: ${it.type}`);
          if (it.stockCode) details.push(`${labels.stock}: ${it.stockCode}`);
          if (it.priceRange) {
            details.push(`${labels.price}: ${it.priceRange.min} – ${it.priceRange.max}`);
          }

          const detailText = details.join(" | ");
          const detailLines = splitText(detailText, metaW - 4);
          let detailY = yRow + 6;
          detailLines.forEach((line, idx) => {
            if (idx < 3) {
              drawText(line, x + 1, detailY, {
                fontSize: 8,
                align: hasArabic(line) ? "right" : "left",
                maxWidth: metaW - 4
              });
              detailY += 4;
            }
          });
          x += metaW;

          doc.setFont("helvetica", "normal");
          doc.text(String(it.qty), x + 4, yRow + 7);
        }

        return rowH;
      };

      for (let i = startIdx; i < items.length; i++) {
        const rowH = await drawRow(i, yPos);
        if (rowH === -1) {
          yPos = DIMENSIONS.headerBarH + 2 + 11;
          i--;
          continue;
        }
        yPos += rowH;
      }
    };

    // ===== EXECUTION =====
    drawHeaderBar(true);
    const y = await drawCompanyAndCustomer(DIMENSIONS.headerBarH + 2);
    const header = drawTableHeader(y);
    await renderRows(0, header.rowY);

    const pages = doc.getNumberOfPages();
    for (let p = 1; p <= pages; p++) {
      doc.setPage(p);
      drawFooter(p, pages);
    }

    const filename = isArabic
      ? `طلب-عرض-أسعار-${inquiryNumber}.pdf`
      : `Quotation#-${inquiryNumber}.pdf`;
    doc.save(filename);

  };

  return (
    <div className="py-10 sm:py-12">
      <Container className="max-w-5xl">
        <div className="flex items-end justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t("cartTitle", lang)}
          </h1>
          {totalItems > 0 && (
            <div className="text-sm text-muted-foreground">
              {t("totalItemsQuntity", lang)}:{" "}
              <span className="font-semibold text-foreground">
                {totalItems}
              </span>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-6 rounded-xl border border-foreground/10 bg-background p-6 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 6h15l-1.5 9h-12L6 6z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                <circle cx="18" cy="20" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("emptyCart", lang)}
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Link
                href="/categories"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-white text-sm hover:brightness-110"
              >
                {t("continueShopping", lang)}
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ================= ITEMS LIST ================= */}
            <div
              className="
              lg:col-span-2
              space-y-4
              max-h-[65vh]
              lg:max-h-[70vh]
              overflow-y-auto
              pr-1
            "
            >
              {items.map((it) => {
                const key = `${it.id}|${it.productCode ?? ""}|${it.volume ?? ""}|${it.stockCode ?? ""}|${it.type ?? ""}`;

                return (
                  <div
                    key={key}
                    className="group relative flex items-center gap-4 rounded-2xl border border-foreground/10 bg-gradient-to-br from-background to-muted p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-foreground/10" />

                    <div className="relative h-20 w-20 rounded-xl bg-background/90 ring-1 ring-foreground/10 overflow-hidden">
                      {it.img ? (
                        <Image
                          src={it.img}
                          alt={pickAny(it.name, lang)}
                          fill
                          sizes="80px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="grid h-full w-full place-items-center text-xs text-muted-foreground">
                          {t("imgPlaceholder", lang)}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary">
                        <Link href={`/p/${it.id}`} className="hover:underline">
                          {pickAny(it.name, lang)}
                        </Link>
                      </div>

                      {it.priceRange && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {t("priceRange", lang)}:
                          <span className="text-lg font-semibold text-foreground">
                            {typeof it.priceRange.min === "number" &&
                              typeof it.priceRange.max === "number" && (
                                <ArabicNumberTranslator
                                  min={it.priceRange.min}
                                  max={it.priceRange.max}
                                />
                              )}
                          </span>
                        </div>
                      )}

                      <div className="mt-1 flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
                        {it.productCode && (
                          <span className="rounded-full bg-muted px-2 py-0.5 ring-1 ring-foreground/10">
                            {t("codeLabel", lang)} {it.productCode}
                          </span>
                        )}
                        {it.volume && (
                          <span className="rounded-full bg-muted px-2 py-0.5 ring-1 ring-foreground/10">
                            {t("volumeLabel", lang)} {it.volume}
                          </span>
                        )}
                        {it.type && (
                          <span className="rounded-full bg-muted px-2 py-0.5 ring-1 ring-foreground/10">
                            {t("typeLabel", lang)} {it.type}
                          </span>
                        )}
                        {it.stockCode && (
                          <span className="rounded-full bg-muted px-2 py-0.5 ring-1 ring-foreground/10">
                            {t("stockLabel", lang)} {it.stockCode}
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <div className="inline-flex items-center rounded-lg border bg-background/70 shadow-sm">
                          <button
                            type="button"
                            className="h-8 w-8 rounded-l-lg hover:bg-muted"
                            onClick={() =>
                              updateQty(it.id, Math.max(1, it.qty - 1), key)
                            }
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min={1}
                            value={it.qty}
                            onChange={(e) =>
                              updateQty(
                                it.id,
                                Math.max(1, Number(e.target.value) || 1),
                                key
                              )
                            }
                            className="h-8 w-22 border-x px-2 text-center text-sm"
                          />
                          <button
                            type="button"
                            className="h-8 w-8 rounded-r-lg hover:bg-muted"
                            onClick={() => updateQty(it.id, it.qty + 1, key)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
                          onClick={() => remove(it.id, key)}
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ================= SUMMARY ================= */}
            {/* Summary + actions */}
            <aside className="space-y-4 lg:sticky lg:top-24 self-start">
              <div className="rounded-2xl border border-foreground/10 bg-gradient-to-br from-background to-muted p-4 shadow-sm">
                <div className="text-sm text-muted-foreground">{t("items", lang)}</div>
                <div className="text-2xl font-bold">{items.length}</div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link
                    href="/categories"
                    className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm hover:bg-muted"
                  >
                    {t("continueShopping", lang)}
                  </Link>
                  <button
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-muted"
                    onClick={() => clear()}
                    type="button"
                  >
                    {t("clearCart", lang)}
                  </button>
                </div>
                <p className="text-xs mt-4 ml-3">
                  {t("addtoquotepara", lang).split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>

              </div>

              <div className="rounded-2xl border border-foreground/10 bg-gradient-to-br from-background to-muted p-4 space-y-3 shadow-sm">
                <h2 className="text-base font-semibold">{t("yourInfo", lang)}</h2>
                <form ref={formRef} className="space-y-3">
                  {/* Your existing input fields remain unchanged */}
                  <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY} />
                  <input type="hidden" name="subject" value="New Quotation Request" />
                  <input type="hidden" name="from_name" value="MOQ Website" />
                  <input type="hidden" name="redirect" value="https://web3forms.com/success" />
                  <input type="checkbox" name="botcheck" className="hidden" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      id="name"
                      name="name"
                      required
                      className="w-full rounded border px-3 py-2 text-sm"
                      placeholder={t("name", lang)}
                      value={info.name ?? ""}
                      onChange={(e) => setInfo((v) => ({ ...v, name: e.target.value }))}
                    />
                    <input
                      id="company"
                      name="company"
                      required
                      className="w-full rounded border px-3 py-2 text-sm"
                      placeholder={t("company", lang)}
                      value={info.company ?? ""}
                      onChange={(e) => setInfo((v) => ({ ...v, company: e.target.value }))}
                    />
                    <div className="sm:col-span-2">
                      <input
                        id="email"
                        name="email"
                        required
                        type="email"
                        className="w-full rounded border px-3 py-2 text-sm"
                        placeholder={t("email", lang)}
                        value={info.email ?? ""}
                        onChange={(e) => setInfo((v) => ({ ...v, email: e.target.value }))}
                      />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      required
                      type="tel"
                      pattern="^[+]?[-0-9 ()]{6,}$"
                      title="Please enter a valid phone number"
                      className="w-full rounded border px-3 py-2 text-sm sm:col-span-2"
                      placeholder={t("phone", lang)}
                      value={info.phone ?? ""}
                      onChange={(e) => setInfo((v) => ({ ...v, phone: e.target.value }))}
                    />
                  </div>
                  <textarea
                    id="note"
                    name="note"
                    required
                    className="w-full rounded border px-3 py-2 text-sm"
                    placeholder={t("note", lang)}
                    rows={3}
                    value={info.note ?? ""}
                    onChange={(e) => setInfo((v) => ({ ...v, note: e.target.value }))}
                  />
                </form>
                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                  {t("infoNoteSteps", lang)}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="space-y-3">
                {/* Submit + Share Row */}
                <div className="grid grid-cols-4 gap-2">
                  {/* Submit Quotation */}
                  <button
                    className="col-span-3 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-white text-sm font-semibold shadow-md transition-all duration-200 hover:brightness-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSubmitQuotation}
                    type="button"
                    disabled={isSubmittingQ}
                  >
                    {isSubmittingQ ? "Submitting..." : t("submitQuotation", lang)}
                  </button>

                  {/* Share */}
                  <button
                    type="button"
                    onClick={() => setOpenShare(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-muted hover:shadow-md"
                    aria-label={t("share", lang)}
                  >
                    <FaShareAlt className="h-4 w-4" />
                    {t("share", lang)}
                  </button>
                </div>

                {/* Download PDF - WITH COOLDOWN */}
                <button
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm shadow-sm transition-all duration-200 hover:bg-muted hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleDownloadPDF}
                  type="button"
                  disabled={pdfCooldown}
                >
                  <FaFilePdf className="h-5 w-5" />
                  {pdfCooldown 
                    ? `Wait ${cooldownSeconds}s...` 
                    : t("downloadPDF", lang)
                  }
                </button>

                {/* SHARE MODAL */}
                <div
                  className={`fixed inset-0 z-40 flex items-center justify-center transition-all duration-300 ${openShare
                    ? "visible bg-black/50 backdrop-blur-sm opacity-100"
                    : "invisible opacity-0"
                    }`}
                >
                  {/* Modal Card */}
                  <div
                    className={`w-80 max-w-[90%] rounded-xl bg-background p-6 shadow-2xl space-y-4 transform transition-all duration-300 ease-out ${openShare ? "scale-100 opacity-100" : "scale-95 opacity-0"
                      }`}
                  >
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-center">
                      {t("shareVia", lang)}
                    </h3>

                    {/* WhatsApp */}
                    <button
                      className="flex w-full items-center justify-center gap-3 rounded-lg bg-green-600 px-4 py-2 text-white text-sm font-medium shadow-md transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
                      onClick={() => {
                        handleSendWhatsApp();
                        setOpenShare(false);
                      }}
                    >
                      <FaWhatsapp className="h-5 w-5" />
                      {t("whatsapp", lang)}

                    </button>

                    {/* Email */}
                    <button
                      className="flex w-full items-center justify-center gap-3 rounded-lg border px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-muted hover:scale-[1.02]"
                      onClick={() => {
                        handleSendEmail();
                        setOpenShare(false);
                      }}
                    >
                      <HiOutlineMail className="h-5 w-5" />
                      {t("email", lang)}
                    </button>

                    {/* Cancel */}
                    <button
                      className="w-full pt-2 text-sm text-muted-foreground transition hover:text-red-600"
                      onClick={() => setOpenShare(false)}
                    >
                      {t("cancel", lang)}
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </Container>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="rounded-xl bg-background p-6 shadow-2xl text-center w-80 max-w-[90%]">
            <h2 className="text-lg font-semibold mb-2">{t("thankyou", lang)}</h2>
            <p className="text-sm text-muted-foreground">
              {t("thankSubmited", lang)}
            </p>
            <button
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-white text-sm font-semibold"
              onClick={() => setShowSuccess(false)}
            >
              {t("submitClose", lang)}
            </button>
          </div>
        </div>
      )}
    </div>
  );

}