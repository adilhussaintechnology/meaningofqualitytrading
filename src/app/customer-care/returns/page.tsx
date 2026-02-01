'use client';

import React from 'react';
import Link from 'next/link';
import { useLang } from "@/hooks/useLang";
import CustomerCareSidebar from '@/components/customer-care/CustomerCareSidebar';

export default function ReturnsPage() {
  const lang = useLang();
  const isAr = lang === "ar";

  return (
    <div className="min-h-screen bg-gray-50" dir={isAr ? "rtl" : "ltr"}>
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-purple-600">
              {isAr ? "الرئيسية" : "Home"}
            </Link>
            <span className="mx-2">/</span>
            <Link href="/customer-care" className="hover:text-purple-600">
              {isAr ? "خدمة العملاء" : "Customer Care"}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">
              {isAr ? "سياسة الإرجاع والاستبدال" : "Return & Exchange Policy"}
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
                {isAr ? "سياسة الإرجاع والاستبدال" : "Return & Exchange Policy"}
              </h1>

              <div className="space-y-10 text-gray-700">
                {/* Overview */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-3">
                    {isAr ? "نظرة عامة" : "Overview"}
                  </h2>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li>• {isAr ? "سياسة الإرجاع مخصصة لعملاء الشركات فقط (B2B)" : "Policy applies to B2B customers only"}</li>
                    <li>• {isAr ? "تخضع جميع المرتجعات للموافقة المسبقة" : "All returns require prior approval"}</li>
                    <li>• {isAr ? "فحص المنتجات المرتجعة قبل القبول" : "Returned items are subject to inspection"}</li>
                    <li>• {isAr ? "لا يتم قبول الإرجاع للطلبات الخاصة أو المخصصة" : "Custom or special orders are non-returnable"}</li>
                  </ul>
                </div>

                {/* 1 */}
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    1. {isAr ? "سياسة الإرجاع" : "Return Policy"}
                  </h2>

                  <p>
                    {isAr
                      ? "نظرًا لطبيعة المعاملات التجارية بين الشركات، فإن جميع طلبات الإرجاع تخضع لمراجعة وموافقة إدارة مؤسسة معنى الجودة التجارية."
                      : "Due to the nature of B2B transactions, all return requests are subject to review and approval by The Meaning of Quality Trading Establishment."}
                  </p>

                  <h3 className="font-medium text-gray-900 mt-4">
                    {isAr ? "مدة الإرجاع" : "Return Timeframe"}
                  </h3>
                  <p className="text-sm">
                    {isAr
                      ? "يجب تقديم طلب الإرجاع خلال 7 أيام من تاريخ استلام البضاعة."
                      : "Return requests must be submitted within 7 days from the delivery date."}
                  </p>

                  <h3 className="font-medium text-gray-900 mt-4">
                    {isAr ? "شروط قبول الإرجاع" : "Return Conditions"}
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                    <li>{isAr ? "أن تكون المنتجات غير مستخدمة" : "Items must be unused"}</li>
                    <li>{isAr ? "بحالتها الأصلية والتغليف الأصلي" : "Original condition and packaging required"}</li>
                    <li>{isAr ? "إرفاق الفاتورة الأصلية" : "Original invoice must be provided"}</li>
                    <li>{isAr ? "عدم وجود تلف ناتج عن سوء الاستخدام أو التخزين" : "No damage due to misuse or improper storage"}</li>
                  </ul>
                </section>

                {/* 2 */}
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    2. {isAr ? "المنتجات غير القابلة للإرجاع" : "Non-Returnable Items"}
                  </h2>

                  <ul className="list-disc list-inside ml-4 space-y-2 text-sm">
                    <li>{isAr ? "الطلبات الخاصة أو المصنعة حسب الطلب" : "Custom-made or special orders"}</li>
                    <li>{isAr ? "المواد التي تم فتحها أو استخدامها" : "Opened or used materials"}</li>
                    <li>{isAr ? "المنتجات المخزنة بشكل غير صحيح لدى العميل" : "Improperly stored items at client premises"}</li>
                    <li>{isAr ? "المنتجات القابلة للاستهلاك أو محدودة الصلاحية" : "Consumable or limited-shelf-life products"}</li>
                  </ul>
                </section>

                {/* 3 */}
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    3. {isAr ? "سياسة الاستبدال" : "Exchange Policy"}
                  </h2>

                  <p className="text-sm">
                    {isAr
                      ? "يمكن استبدال المنتجات فقط في حال وجود خطأ في التوريد أو عيب مصنعي مثبت بعد الفحص."
                      : "Exchanges are permitted only in cases of supply error or confirmed manufacturing defects after inspection."}
                  </p>

                  <ul className="list-disc list-inside ml-4 space-y-1 text-sm mt-2">
                    <li>{isAr ? "يتم الاستبدال حسب توفر المخزون" : "Subject to stock availability"}</li>
                    <li>{isAr ? "لا يتم الاستبدال بناءً على تغيير الرأي" : "No exchanges for change of mind"}</li>
                  </ul>
                </section>

                {/* 4 */}
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    4. {isAr ? "الاسترداد المالي" : "Refunds"}
                  </h2>

                  <p className="text-sm">
                    {isAr
                      ? "في حال الموافقة على الإرجاع، يتم إصدار الاسترداد المالي حسب وسيلة الدفع المتفق عليها في العقد أو الفاتورة."
                      : "If a return is approved, refunds are processed according to the payment terms stated in the contract or invoice."}
                  </p>

                  <ul className="list-disc list-inside ml-4 space-y-1 text-sm mt-2">
                    <li>{isAr ? "قد يتم خصم تكاليف الشحن أو الفحص" : "Inspection or shipping costs may be deducted"}</li>
                    <li>{isAr ? "لا يتم استرداد الرسوم الحكومية أو الضريبية" : "Government or tax fees are non-refundable"}</li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
