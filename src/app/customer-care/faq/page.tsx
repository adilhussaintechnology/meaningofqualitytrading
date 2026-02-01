'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLang } from "@/hooks/useLang";
import CustomerCareSidebar from '@/components/customer-care/CustomerCareSidebar';

const faqCategories = [
  {
    title: { en: "Orders, Quotations & Pricing", ar: "الطلبات، عروض الأسعار والتسعير" },
    questions: [
      {
        question: {
          en: "How do I place a bulk or corporate order?",
          ar: "كيف يمكنني تقديم طلب جملة أو طلب شركات؟",
        },
        answer: {
          en: "You can place a bulk or corporate order by contacting our sales team. We assist with quantities, pricing, and delivery schedules.",
          ar: "يمكنك تقديم طلب جملة أو طلب شركات من خلال التواصل مع فريق المبيعات، حيث نقوم بالمساعدة في تحديد الكميات والتسعير وجدولة التسليم.",
        },
      },
      {
        question: {
          en: "Do you offer customized quotations?",
          ar: "هل تقدمون عروض أسعار مخصصة؟",
        },
        answer: {
          en: "Yes. Quotations are customized based on order volume, project scope, and delivery requirements.",
          ar: "نعم، يتم تخصيص عروض الأسعار حسب حجم الطلب ومتطلبات المشروع وجدول التسليم.",
        },
      },
      {
        question: {
          en: "Are prices inclusive of VAT?",
          ar: "هل الأسعار شاملة ضريبة القيمة المضافة؟",
        },
        answer: {
          en: "All prices are exclusive of VAT unless stated otherwise. VAT is clearly shown on invoices.",
          ar: "جميع الأسعار غير شاملة ضريبة القيمة المضافة ما لم يُذكر خلاف ذلك، ويتم توضيح الضريبة في الفواتير.",
        },
      },
    ],
  },
  {
    title: { en: "Payment Terms & Invoicing", ar: "شروط الدفع والفواتير" },
    questions: [
      {
        question: {
          en: "What payment methods are available for B2B customers?",
          ar: "ما طرق الدفع المتاحة لعملاء الشركات؟",
        },
        answer: {
          en: "We accept bank transfers and approved corporate payment methods. Cash on delivery is not available for bulk orders.",
          ar: "نقبل التحويل البنكي ووسائل الدفع المعتمدة للشركات. لا يتوفر الدفع عند الاستلام لطلبات الجملة.",
        },
      },
      {
        question: {
          en: "Do you offer credit payment terms?",
          ar: "هل توفرون شروط دفع آجلة؟",
        },
        answer: {
          en: "Credit terms may be offered to approved corporate clients after evaluation and agreement.",
          ar: "قد يتم توفير شروط دفع آجلة للعملاء المعتمدين بعد التقييم والموافقة على الاتفاقية.",
        },
      },
      {
        question: {
          en: "Will I receive a tax invoice?",
          ar: "هل سأحصل على فاتورة ضريبية؟",
        },
        answer: {
          en: "Yes, a VAT-compliant tax invoice is issued for every order.",
          ar: "نعم، يتم إصدار فاتورة ضريبية متوافقة مع أنظمة ضريبة القيمة المضافة لكل طلب.",
        },
      },
    ],
  },
  {
    title: { en: "Shipping, Delivery & Logistics", ar: "الشحن، التسليم والخدمات اللوجستية" },
    questions: [
      {
        question: {
          en: "Do you deliver across Saudi Arabia?",
          ar: "هل تقومون بالتوصيل داخل المملكة العربية السعودية؟",
        },
        answer: {
          en: "Yes, we deliver to all major cities and industrial areas across Saudi Arabia.",
          ar: "نعم، نقوم بالتوصيل إلى جميع المدن والمناطق الصناعية داخل المملكة العربية السعودية.",
        },
      },
      {
        question: {
          en: "Can delivery be scheduled for projects?",
          ar: "هل يمكن جدولة التسليم للمشاريع؟",
        },
        answer: {
          en: "Yes, deliveries can be scheduled based on project timelines and site readiness.",
          ar: "نعم، يمكن جدولة التسليم حسب جدول المشروع وجاهزية الموقع.",
        },
      },
    ],
  },
  {
    title: { en: "Returns, Warranty & After-Sales Support", ar: "الإرجاع، الضمان وخدمات ما بعد البيع" },
    questions: [
      {
        question: {
          en: "What is your return policy for B2B orders?",
          ar: "ما هي سياسة الإرجاع لطلبات الشركات؟",
        },
        answer: {
          en: "Returns are reviewed case-by-case. Custom or made-to-order items are non-returnable.",
          ar: "يتم مراجعة الإرجاع حسب كل حالة. المنتجات المخصصة أو المصنعة حسب الطلب غير قابلة للإرجاع.",
        },
      },
      {
        question: {
          en: "Do products include a warranty?",
          ar: "هل المنتجات مشمولة بضمان؟",
        },
        answer: {
          en: "Warranty coverage depends on the product and manufacturer and is stated in the quotation.",
          ar: "يعتمد الضمان على المنتج والشركة المصنعة ويتم توضيحه في عرض السعر.",
        },
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);
  const lang = useLang();
  const isAr = lang === "ar";

  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const filteredCategories = faqCategories
    .map(category => ({
      ...category,
      questions: category.questions.filter(q =>
        (isAr ? q.question.ar : q.question.en)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(cat => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50" dir={isAr ? "rtl" : "ltr"}>
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-purple-600">
            {isAr ? "الرئيسية" : "Home"}
          </Link>{" "}
          &gt;{" "}
          <Link href="/customer-care" className="hover:text-purple-600">
            {isAr ? "خدمة العملاء" : "Customer Care"}
          </Link>{" "}
          &gt;{" "}
          <span className="text-gray-900">
            {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <CustomerCareSidebar />

        <div className="lg:col-span-3 bg-white border rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6">
            {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h1>

          <input
            type="text"
            placeholder={isAr ? "ابحث في الأسئلة..." : "Search FAQs..."}
            className="w-full mb-8 px-4 py-3 border rounded-md"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />

          <div className="space-y-8">
            {filteredCategories.map((category, ci) => (
              <div key={ci}>
                <h2 className="text-xl font-semibold mb-4">
                  {isAr ? category.title.ar : category.title.en}
                </h2>

                {category.questions.map((faq, qi) => {
                  const id = `${ci}-${qi}`;
                  const open = openQuestions.includes(id);

                  return (
                    <div key={id} className="border rounded mb-3">
                      <button
                        className="w-full flex justify-between px-4 py-3 font-medium"
                        onClick={() => toggleQuestion(id)}
                      >
                        {isAr ? faq.question.ar : faq.question.en}
                        <span>{open ? "−" : "+"}</span>
                      </button>
                      {open && (
                        <div className="px-4 pb-4 text-gray-600">
                          {isAr ? faq.answer.ar : faq.answer.en}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
