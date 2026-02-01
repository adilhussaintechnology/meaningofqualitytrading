'use client';

import Link from 'next/link';
import { useLang } from '@/hooks/useLang';
import CustomerCareSidebar from '@/components/customer-care/CustomerCareSidebar';

const termsOfBusiness = {
  en: {
    title: "Terms of Business",
    lastUpdated: "Last updated: December 25, 2025",
    introduction: `Welcome to our services. By using our website and services, you agree to comply with these Terms of Business. Please read them carefully before using our services.`,
    sections: [
      { heading: "1. Services Provided", content: `We provide high-quality products and services as described on our website. All services are subject to availability and may be modified without prior notice.` },
      { heading: "2. Customer Responsibilities", content: `Customers are responsible for providing accurate information, following instructions, and complying with applicable laws when using our services.` },
      { heading: "3. Payments and Pricing", content: `All prices are displayed in SAR and include applicable taxes unless otherwise stated. Payments must be made as specified on the invoice or website.` },
      { heading: "4. Order and Delivery", content: `Orders will be processed promptly, but delivery times are estimates and may vary. We are not responsible for delays beyond our control.` },
      { heading: "5. Returns and Refunds", content: `Refunds and returns are handled according to our refund policy. Customers must contact us within the specified timeframe to initiate a return or refund request.` },
      { heading: "6. Intellectual Property", content: `All content, designs, and materials on this website are our property or licensed to us. Unauthorized use is strictly prohibited.` },
      { heading: "7. Liability", content: `We are not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability will not exceed the amount paid for the services.` },
      { heading: "8. Privacy", content: `We respect your privacy and handle all personal data according to our Privacy Policy.` },
      { heading: "9. Governing Law", content: `These terms are governed by the laws of the Kingdom of Saudi Arabia. Any disputes will be resolved under the jurisdiction of its courts.` },
      { heading: "10. Changes to Terms", content: `We may update these Terms of Business from time to time. Changes will be effective immediately upon posting. Customers are encouraged to review these terms regularly.` },
      { heading: "Contact Us", content: `For any questions regarding these Terms of Business, please contact us via email, phone, or our website contact form.` }
    ]
  },
  ar: {
    title: "شروط العمل",
    lastUpdated: "آخر تحديث: 25 ديسمبر 2025",
    introduction: `مرحبًا بكم في خدماتنا. باستخدام موقعنا وخدماتنا، فإنك توافق على الالتزام بشروط العمل هذه. يرجى قراءتها بعناية قبل استخدام خدماتنا.`,
    sections: [
      { heading: "1. الخدمات المقدمة", content: `نقدم منتجات وخدمات عالية الجودة كما هو موضح على موقعنا. جميع الخدمات تخضع للتوافر وقد يتم تعديلها دون إشعار مسبق.` },
      { heading: "2. مسؤوليات العميل", content: `يتحمل العملاء مسؤولية تقديم معلومات دقيقة، واتباع التعليمات، والامتثال للقوانين المعمول بها عند استخدام خدماتنا.` },
      { heading: "3. الدفع والأسعار", content: `جميع الأسعار معروضة بالريال السعودي وتشمل الضرائب المطبقة إلا إذا ذكر خلاف ذلك. يجب دفع المبالغ كما هو محدد في الفاتورة أو على الموقع.` },
      { heading: "4. الطلب والتوصيل", content: `سيتم معالجة الطلبات بسرعة، ولكن أوقات التسليم تقديرية وقد تختلف. نحن غير مسؤولين عن التأخيرات الخارجة عن إرادتنا.` },
      { heading: "5. الإرجاع والاسترداد", content: `يتم التعامل مع الإرجاع والاسترداد وفقًا لسياسة الاسترداد الخاصة بنا. يجب على العملاء الاتصال بنا ضمن الإطار الزمني المحدد لبدء عملية الإرجاع أو طلب الاسترداد.` },
      { heading: "6. الملكية الفكرية", content: `جميع المحتويات والتصاميم والمواد على هذا الموقع هي ملك لنا أو مرخصة لنا. الاستخدام غير المصرح به ممنوع تمامًا.` },
      { heading: "7. المسؤولية", content: `نحن غير مسؤولين عن أي أضرار غير مباشرة أو عرضية أو تبعية ناتجة عن استخدام خدماتنا. الحد الأقصى لمسؤوليتنا هو المبلغ المدفوع مقابل الخدمات.` },
      { heading: "8. الخصوصية", content: `نحترم خصوصيتك ونتعامل مع جميع البيانات الشخصية وفقًا لسياسة الخصوصية الخاصة بنا.` },
      { heading: "9. القانون الواجب التطبيق", content: `تخضع هذه الشروط لقوانين المملكة العربية السعودية. سيتم حل أي نزاعات تحت اختصاص محاكمها.` },
      { heading: "10. التعديلات على الشروط", content: `قد نقوم بتحديث شروط العمل هذه من وقت لآخر. تكون التغييرات سارية فور نشرها. يُنصح العملاء بمراجعة هذه الشروط بانتظام.` },
      { heading: "اتصل بنا", content: `لأي استفسارات بخصوص شروط العمل هذه، يرجى التواصل معنا عبر البريد الإلكتروني أو الهاتف أو نموذج الاتصال بالموقع.` }
    ]
  }
};

export default function CustomerCarePage() {
  const lang = useLang();
  const isAr = lang === "ar";
  const terms = isAr ? termsOfBusiness.ar : termsOfBusiness.en;

  return (
    <div className={`min-h-screen bg-gray-50 ${isAr ? "rtl" : "ltr"} text-gray-700`}>
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-purple-600">{isAr ? "الرئيسية" : "Home"}</Link>
            <span className="mx-2">&gt;</span>
            <Link href="/customer-care" className="hover:text-purple-600">{isAr ? "خدمة العملاء" : "Customer Care"}</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900">{terms.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <CustomerCareSidebar />

        {/* Terms Content */}
        <div className="lg:col-span-3 space-y-6">
          <h1 className="text-2xl font-bold">{terms.title}</h1>
          <p className="text-sm text-gray-500">{terms.lastUpdated}</p>
          <p className="mt-4">{terms.introduction}</p>

          {terms.sections.map((section, idx) => (
            <div key={idx} className="mt-6">
              <h2 className="text-lg font-semibold mb-2">{section.heading}</h2>
              <p className="text-gray-700">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
