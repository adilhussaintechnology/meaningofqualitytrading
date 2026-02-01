'use client';

import React from 'react';
import Link from 'next/link';
import CustomerCareSidebar from '@/components/customer-care/CustomerCareSidebar';
import { useLang } from '@/hooks/useLang';

export default function PrivacyPolicyPage() {
  const lang = useLang();
  const isAr = lang === 'ar';

  return (
    <div className="min-h-screen bg-gray-50" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-purple-600">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <span className="mx-2">&gt;</span>
            <Link href="/customer-care" className="hover:text-purple-600">
              {isAr ? 'خدمة العملاء' : 'Customer Care'}
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900">
              {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
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
                {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </h1>

              {/* Last Updated */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-10">
                <p className="text-blue-800 font-medium">
                  {isAr ? 'آخر تحديث:' : 'Last Updated:'} December 15, 2025
                </p>
                <p className="text-blue-700 mt-2 text-sm">
                  {isAr
                    ? 'توضح سياسة الخصوصية هذه كيفية قيام مؤسسة معنى الجودة التجارية بجمع واستخدام وحماية المعلومات الخاصة بعملائها وشركائها التجاريين.'
                    : 'This Privacy Policy explains how The Meaning of Quality Trading collects, uses, and protects information related to its customers and business partners.'}
                </p>
              </div>

              <div className="space-y-10 text-gray-700">
                {/* 1 */}
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {isAr ? '1. المعلومات التي نقوم بجمعها' : '1. Information We Collect'}
                  </h2>

                  <p className="mb-3">
                    {isAr
                      ? 'بصفتنا موقع تجارة بين الشركات (B2B)، نقوم بجمع المعلومات الضرورية لإدارة العمليات التجارية.'
                      : 'As a B2B trading establishment, we collect information necessary to manage business operations.'}
                  </p>

                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>{isAr ? 'اسم الشركة والسجل التجاري ورقم ضريبة القيمة المضافة' : 'Company name, trade license, and VAT number'}</li>
                    <li>{isAr ? 'اسم الشخص المفوض والمسمى الوظيفي' : 'Authorized contact person and job title'}</li>
                    <li>{isAr ? 'البريد الإلكتروني ورقم الهاتف والعنوان التجاري' : 'Email address, phone number, and business address'}</li>
                    <li>{isAr ? 'طلبات الشراء والفواتير وسجل المعاملات' : 'Purchase orders, invoices, and transaction history'}</li>
                    <li>{isAr ? 'معلومات الدفع والفوترة' : 'Billing and payment information'}</li>
                  </ul>
                </section>

                {/* 2 */}
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {isAr ? '2. كيفية استخدام المعلومات' : '2. How We Use Information'}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-medium text-green-900 mb-2">
                        {isAr ? 'العمليات التجارية' : 'Business Operations'}
                      </h3>
                      <ul className="text-sm space-y-1">
                        <li>{isAr ? 'معالجة الطلبات وعروض الأسعار' : 'Processing orders and quotations'}</li>
                        <li>{isAr ? 'إدارة العقود والفواتير' : 'Managing contracts and invoices'}</li>
                        <li>{isAr ? 'تنظيم الشحن والتسليم' : 'Coordinating delivery and logistics'}</li>
                        <li>{isAr ? 'إدارة حسابات العملاء' : 'Maintaining client accounts'}</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-medium text-blue-900 mb-2">
                        {isAr ? 'التواصل والدعم' : 'Communication & Support'}
                      </h3>
                      <ul className="text-sm space-y-1">
                        <li>{isAr ? 'الرد على الاستفسارات' : 'Responding to inquiries'}</li>
                        <li>{isAr ? 'تقديم الدعم الفني أو التجاري' : 'Providing technical or commercial support'}</li>
                        <li>{isAr ? 'إرسال التحديثات المتعلقة بالطلبات' : 'Sending order-related updates'}</li>
                        <li>{isAr ? 'التواصل التجاري الرسمي' : 'Official business communication'}</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 3 */}
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {isAr ? '3. مشاركة المعلومات' : '3. Information Sharing'}
                  </h2>

                  <p className="mb-3">
                    {isAr
                      ? 'لا نقوم ببيع أو تأجير المعلومات. قد تتم مشاركة البيانات فقط عند الضرورة.'
                      : 'We do not sell or rent information. Data is shared only when necessary.'}
                  </p>

                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>{isAr ? 'شركات الشحن والخدمات اللوجستية' : 'Logistics and shipping partners'}</li>
                    <li>{isAr ? 'مزودي خدمات الدفع' : 'Payment service providers'}</li>
                    <li>{isAr ? 'الجهات الحكومية عند الطلب القانوني' : 'Government authorities when legally required'}</li>
                  </ul>
                </section>

                {/* 4 */}
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {isAr ? '4. أمن البيانات' : '4. Data Security'}
                  </h2>

                  <p>
                    {isAr
                      ? 'نطبق إجراءات تقنية وتنظيمية لحماية البيانات من الوصول غير المصرح به.'
                      : 'We apply technical and organizational measures to protect data from unauthorized access.'}
                  </p>
                </section>

                {/* 5 */}
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {isAr ? '5. حقوق العملاء' : '5. Your Rights'}
                  </h2>

                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>{isAr ? 'الوصول إلى المعلومات التجارية الخاصة بك' : 'Access your business information'}</li>
                    <li>{isAr ? 'تحديث أو تصحيح البيانات' : 'Update or correct data'}</li>
                    <li>{isAr ? 'طلب حذف البيانات حسب الأنظمة' : 'Request deletion subject to regulations'}</li>
                  </ul>
                </section>

                {/* 6 */}
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {isAr ? '6. التعديلات على السياسة' : '6. Policy Updates'}
                  </h2>

                  <p>
                    {isAr
                      ? 'قد نقوم بتحديث هذه السياسة من وقت لآخر. استمرار استخدام الموقع يعني الموافقة.'
                      : 'We may update this policy from time to time. Continued use indicates acceptance.'}
                  </p>
                </section>

                {/* 7 */}
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {isAr ? '7. التواصل معنا' : '7. Contact Us'}
                  </h2>
                  <p className="text-sm">
                    {isAr
                      ? 'لأي استفسارات، يرجى التواصل عبر البريد الإلكتروني: '
                      : 'For any questions, please contact us at '}
                    <a
                      href="mailto:sales@moq.com.sa"
                      className="font-medium underline"
                    >
                      sales@moq.com.sa
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
