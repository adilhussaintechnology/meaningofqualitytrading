"use client";

import Container from "./ui/Container";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaFacebookF, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import { useLang } from "@/hooks/useLang";
import { t } from "@/data/labels";

export default function Footer() {
  const lang = useLang();
  const isAr = lang === "ar";

  return (
    <footer className="bg-gradient-to-br bg-gray-200 mt-20">

      {/* Main Footer Columns */}
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Logo & Description */}
          <div className="flex flex-col gap-4 col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative w-[150px] h-[100px]">
                <Image
                  src="/images/logo/sultanlogo.png"
                  alt="Sultan Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              {t("footerDescription", lang)}
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="https://www.linkedin.com/company/moqtradingest/"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/moqtrading2016/"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/MOQTradingEst"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <FaFacebookF size={18} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
              {t("productsSection", lang)}
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">➤</span>
                <Link
                  href="/categories"
                  className="hover:text-indigo-600 transition-colors duration-200"
                >
                  {t("allProducts", lang)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
              {t("companySection", lang)}
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">➤</span>
                <Link
                  href="/customer-care/about"
                  className="hover:text-indigo-600 transition-colors duration-200"
                >
                  {t("aboutUs", lang)}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">➤</span>
                <Link
                  href="/customer-care/termsOfBusiness"
                  className="hover:text-indigo-600 transition-colors duration-200"
                >
                  {t("termsOfBusiness", lang)}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">➤</span>
                <Link
                  href="/customer-care/supplierIncentiveProcessDescription"
                  className="hover:text-indigo-600 transition-colors duration-200"
                >
                  {t("supplierIncentiveProcess", lang)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
              {t("customerCareSection", lang)}
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">➤</span>
                <Link
                  href="/customer-care"
                  className="hover:text-indigo-600 transition-colors duration-200"
                >
                  {t("contactUs", lang)}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">➤</span>
                <Link
                  href="/customer-care/shopping-guide"
                  className="hover:text-indigo-600 transition-colors duration-200"
                >
                  {t("shoppingGuide", lang)}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">➤</span>
                <Link
                  href="/customer-care/faq"
                  className="hover:text-indigo-600 transition-colors duration-200"
                >
                  {t("faq", lang)}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">➤</span>
                <Link
                  href="/customer-care/returns"
                  className="hover:text-indigo-600 transition-colors duration-200"
                >
                  {t("returnExchange", lang)}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">➤</span>
                <Link
                  href="/customer-care/privacy"
                  className="hover:text-indigo-600 transition-colors duration-200"
                >
                  {t("privacyPolicy", lang)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Human Rights / Legal */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
              {t("humanRightsSection", lang)}
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">➤</span>
                <Link
                  href="/customer-care/humanRightPolicy"
                  className="hover:text-indigo-600 transition-colors duration-200"
                >
                  {t("humanRightsPolicy", lang)}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">➤</span>
                <Link
                  href="/customer-care/humanRightsAnalysisProcessDescription"
                  className="hover:text-indigo-600 transition-colors duration-200"
                >
                  {t("humanRightsAnalysisProcess", lang)}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">➤</span>
                <Link
                  href="/customer-care/humanRightsDueDiligance"
                  className="hover:text-indigo-600 transition-colors duration-200"
                >
                  {t("humanRightsDueDiligance", lang)}
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </Container>

{/* Customer Care Info Section (New Section Under All) */}
<div className="py-6">
  <Container>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-700">

      {/* Company Info */}
      <div className="space-y-4 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-white to-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">
          {isAr ? "السعودية للسلامة" : "The Meaning of Quality Trading Establishment"}
        </h3>
        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="mt-1 text-purple-600 shrink-0" />
          <p className="whitespace-pre-line text-sm" dir={isAr ? "rtl" : "ltr"}>
            {isAr
              ? "الشارع: جار الله بن فهد\nالحي: الجزيرة ١٤٢٦٢\nالرياض، المملكة العربية السعودية"
              : "Jarallah Bin Fahad Street\nAl Jazeerah District 14262\nRiyadh, Saudi Arabia"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <FaPhoneAlt className="text-purple-600 shrink-0" />
          <p className="text-sm" dir="ltr">{isAr ? "+٩٦٦ ٥٩٠ ٠١٩ ٨٢٦" : "+966 590 019 826"}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-4 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-white to-gray-100">
        <div className="flex items-center gap-3">
          <FaPhoneAlt className="text-purple-600 shrink-0" />
          <p className="text-sm" dir={isAr ? "rtl" : "ltr"}>
            <strong>{isAr ? "خدمات ما بعد البيع:" : "After Sales Service:"}</strong>{" "}
            <span dir="ltr">{isAr ? "+٩٦٦ ٥٩٠ ٠١٩ ٨٢٦" : "+966 590 019 826"}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-purple-600 shrink-0" />
          <p className="text-sm">
            <strong>{isAr ? "البريد الإلكتروني:" : "Email:"}</strong>{" "}
            <a href="mailto:sales@moq.com.sa" className="text-purple-600 hover:underline">
              sales@moq.com.sa
            </a>
          </p>
        </div>
      </div>

      {/* Call Center & Location */}
      <div className="space-y-4 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-white to-gray-100">
        <div className="flex items-center gap-3">
          <FaClock className="text-purple-600 shrink-0" />
          <p className="text-sm" dir={isAr ? "rtl" : "ltr"}>
            <strong>{isAr ? "ساعات عمل مركز الاتصال:" : "Call Center Working Hours:"}</strong>{" "}
            <span dir="ltr">
              {isAr ? "الأحد – الخميس: ٩:٠٠ ص – ٦:٠٠ م" : "Sunday – Thursday: 9:00 AM – 6:00 PM"}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-purple-600 shrink-0" />
          <p className="text-sm" dir={isAr ? "rtl" : "ltr"}>
            {isAr ? "للموقع والفروع:" : "For showroom locations & hours"}{" "}
            <Link
              href="https://maps.app.goo.gl/JHX2DVrRzomWQjeE8?g_st=ipc"
              className="text-purple-600 hover:underline"
              target="_blank"
            >
              {isAr ? "مواقع المتاجر" : "Store locations"}
            </Link>
          </p>
        </div>
      </div>

    </div>
  </Container>
</div>

      {/* Bottom */}
      <div className="border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
        <Container className="py-10">
          <div className="flex justify-center text-center">
            <p
              className={`
                max-w-5xl
                text-sm md:text-[15px]
                leading-loose
                font-normal
                text-gray-600
                tracking-wide
                ${lang === "ar" ? "rtl text-[16px] leading-[2.2] tracking-normal" : ""}
              `}
            >
              {t("copyright", lang)}
            </p>
          </div>
        </Container>
      </div>

    </footer>
  );
}
