'use client';

import React from 'react';
import Link from 'next/link';
import { useLang } from "@/hooks/useLang";
import CustomerCareSidebar from '@/components/customer-care/CustomerCareSidebar';
import {
  FaClipboardCheck,
  FaWhatsapp,
  FaEnvelope,
  FaFilePdf
} from "react-icons/fa";


export default function HowToRequestQuotationPage() {
  const lang = useLang();
  const isAr = lang === "ar";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-purple-600">
              {isAr ? "الرئيسية" : "Home"}
            </Link>
            <span className="mx-2">&gt;</span>
            <Link href="/customer-care" className="hover:text-purple-600">
              {isAr ? "خدمة العملاء" : "Customer Care"}
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900">
              {isAr ? "كيفية طلب عرض سعر" : "How to Request a Quotation"}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <CustomerCareSidebar />

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                {isAr ? "كيفية طلب عرض سعر" : "How to Request a Quotation"}
              </h1>

              {/* Quick Start */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-blue-900 mb-3 flex items-center">
                  <span className="text-2xl mr-3">ℹ️</span>
                  {isAr ? "نظرة سريعة" : "Quick Overview"}
                </h2>
                <p className="text-blue-800">
                  {isAr
                    ? "تم تصميم هذه المنصة لخدمة الشركات والمقاولين والجهات الحكومية لطلب عروض أسعار رسمية لمعدات السلامة والمنتجات الصناعية دون الحاجة إلى الدفع الإلكتروني المباشر."
                    : "This platform is designed for businesses, contractors, and organizations to request official quotations for safety and industrial products. No direct online payment is required."}
                </p>
              </div>

              <div className="space-y-8">
                {/* Step 1 */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      1
                    </span>
                    {isAr
                      ? "كيفية طلب عرض سعر من منشأة معنى الجودة التجارية"
                      : "How to Request a Quotation from The Meaning of Quality Trading Establishment"}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gray-50 rounded-lg border">
                      <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">1</div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        {isAr ? "تصفح المنتجات" : "Browse Products"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isAr
                          ? "استعرض المنتجات واطلع على المواصفات الفنية والشهادات والمستندات المتوفرة."
                          : "Explore products and review specifications, certifications, and available technical documents."}
                      </p>
                    </div>

                    <div className="text-center p-6 bg-gray-50 rounded-lg border">
                      <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">2</div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        {isAr ? "إضافة إلى قائمة عرض السعر" : "Add to Quotation List"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isAr
                          ? "حدد الكميات المطلوبة وأضف المنتجات إلى قائمة عرض السعر دون أي التزام."
                          : "Select required quantities and add products to your quotation list with no commitment."}
                      </p>
                    </div>

                    <div className="text-center p-6 bg-gray-50 rounded-lg border">
                      <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">3</div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        {isAr ? "إرسال طلب عرض السعر" : "Submit Quotation Request"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isAr
                          ? "أدخل بيانات المنشأة وسيقوم فريق المبيعات بالتواصل معك بالأسعار والتوفر."
                          : "Submit your company details and our sales team will contact you with pricing and availability."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quotation Submission Methods */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      2
                    </span>
                    {isAr
                      ? "طرق إرسال طلب عرض السعر"
                      : "Quotation Submission Methods"}
                  </h2>

                  <p className="text-gray-600 mb-6">
                    {isAr
                      ? "بعد تجهيز قائمة المنتجات وبيانات الاتصال، يمكنك اختيار إحدى الطرق التالية لإرسال طلب عرض السعر."
                      : "After preparing your product list and contact details, choose one of the following methods to submit your quotation request."}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Direct System */}
                    <div className="bg-gray-50 border rounded-lg p-6 text-center hover:shadow-sm transition">
                      <FaClipboardCheck className="text-purple-600 text-4xl mx-auto mb-4" />
                      <h3 className="font-medium text-gray-900 mb-2">
                        {isAr ? "الإرسال عبر النظام" : "Direct System"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isAr
                          ? "إرسال طلب عرض السعر مباشرة من خلال الموقع."
                          : "Submit your quotation request directly through the website system."}
                      </p>
                    </div>

                    {/* WhatsApp */}
                    <div className="bg-gray-50 border rounded-lg p-6 text-center hover:shadow-sm transition">
                      <FaWhatsapp className="text-green-600 text-4xl mx-auto mb-4" />
                      <h3 className="font-medium text-gray-900 mb-2">
                        {isAr ? "واتساب" : "WhatsApp"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isAr
                          ? "مشاركة قائمة عرض السعر عبر واتساب."
                          : "Share your quotation list with us via WhatsApp."}
                      </p>
                    </div>

                    {/* Email */}
                    <div className="bg-gray-50 border rounded-lg p-6 text-center hover:shadow-sm transition">
                      <FaEnvelope className="text-blue-600 text-4xl mx-auto mb-4" />
                      <h3 className="font-medium text-gray-900 mb-2">
                        {isAr ? "البريد الإلكتروني" : "Email"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isAr
                          ? "إرسال طلب عرض السعر عبر البريد الإلكتروني."
                          : "Send your quotation request via email."}
                      </p>
                    </div>

                    {/* PDF */}
                    <div className="bg-gray-50 border rounded-lg p-6 text-center hover:shadow-sm transition">
                      <FaFilePdf className="text-red-600 text-4xl mx-auto mb-4" />
                      <h3 className="font-medium text-gray-900 mb-2">
                        {isAr ? "تحميل ملف PDF" : "Download PDF"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isAr
                          ? "تحميل عرض السعر بصيغة PDF ومشاركته عبر واتساب أو البريد الإلكتروني."
                          : "Download the quotation as a PDF and share it via WhatsApp or Email."}
                      </p>
                    </div>
                  </div>
                </div>


                {/* Pricing */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      3
                    </span>
                    {isAr ? "الأسعار وشروط الدفع" : "Pricing & Payment Terms"}
                  </h2>

                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>{isAr ? "يتم مشاركة الأسعار عبر عرض سعر رسمي" : "Pricing is shared through official quotations"}</li>
                    <li>{isAr ? "أسعار خاصة للكميات الكبيرة والمشاريع" : "Special pricing for bulk and project orders"}</li>
                    <li>{isAr ? "توفير فواتير ضريبية" : "VAT invoices provided"}</li>
                    <li>{isAr ? "يتم الاتفاق على شروط الدفع بعد اعتماد العرض" : "Payment terms agreed after quotation approval"}</li>
                  </ul>
                </div>

                {/* Delivery */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      4
                    </span>
                    {isAr ? "التوصيل والخدمات اللوجستية" : "Delivery & Logistics"}
                  </h2>

                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>{isAr ? "يتم تحديد مواعيد التسليم في عرض السعر" : "Delivery timelines confirmed in the quotation"}</li>
                    <li>{isAr ? "توصيل لجميع مناطق المملكة" : "Nationwide delivery across Saudi Arabia"}</li>
                    <li>{isAr ? "دعم الطلبات الكبيرة والمشاريع" : "Support for bulk and project deliveries"}</li>
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-4 p-6 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {isAr ? "هل تحتاج مساعدة في عرض السعر؟" : "Need help with your quotation?"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {isAr
                      ? "فريق المبيعات لدينا جاهز لمساعدتك في اختيار المنتجات وتقديم الدعم."
                      : "Our sales team is ready to assist you with product selection and quotation support."}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/customer-care"
                      className="inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      {isAr ? "التواصل مع الدعم" : "Contact Sales"}
                    </Link>

                    <a
                      href="tel:+966590019826"
                      className="inline-flex items-center justify-center px-4 py-2 border border-purple-300 text-purple-700 rounded-md hover:bg-purple-100 transition-colors"
                    >
                      {isAr ? "اتصال" : "Call"}: +966 590 019 826
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
