'use client';

import Link from 'next/link';
import { useLang } from "@/hooks/useLang";
import CustomerCareSidebar from '@/components/customer-care/CustomerCareSidebar';

export default function SupplierIncentiveProcessDescription() {
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
                            {isAr ? "وصف عملية تحفيز الموردين" : "Supplier Incentive Process Description"}
                        </span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Sidebar */}
                <CustomerCareSidebar />

                {/* Main Content */}
                <main className="lg:col-span-3 space-y-14" dir={isAr ? "rtl" : "ltr"}>

                    {/* Header */}
                    <section className="space-y-4 text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold">
                            {isAr ? "وصف عملية تحفيز الموردين" : "Supplier Incentive Process Description"}
                        </h1>
                        <p className="text-gray-600">
                            {isAr ? "تاريخ التقرير: 1 يوليو 2025" : "Report Date: July 1, 2025"}
                        </p>
                    </section>

                    {/* Purpose */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "الغرض" : "Purpose"}
                        </h2>

                        <p className="text-gray-600">
                            {isAr
                                ? "تهدف هذه العملية إلى تشجيع الموردين على الالتزام بحقوق الإنسان، ومعايير العمل، والممارسات التجارية الأخلاقية."
                                : "To encourage suppliers to comply with human rights, labor, and ethical business standards."}
                        </p>
                    </section>

                    {/* Process */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "العملية" : "Process"}
                        </h2>

                        <h3 className="text-xl font-semibold">
                            {isAr ? "1. اتفاقيات الموردين" : "1. Supplier Agreements"}
                        </h3>

                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>
                                {isAr
                                    ? "يتم إجراء مراجعات منتظمة لممارسات الموردين (مثل الوثائق، أو التدقيق، أو الشهادات)."
                                    : "Regular reviews of supplier practices are conducted (documentation, audits, or certifications)."}
                            </li>
                            <li>
                                {isAr
                                    ? "يتم تحديد الموردين غير الملتزمين واتخاذ إجراءات تصحيحية بحقهم."
                                    : "Non-compliant suppliers are flagged for corrective action."}
                            </li>
                        </ul>
                    </section>

                    {/* Incentives */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-semibold">
                            {isAr ? "3. الحوافز للموردين الملتزمين" : "3. Incentives for Compliant Suppliers"}
                        </h3>

                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>
                                {isAr
                                    ? "منح أولوية في قرارات الشراء والطلبات."
                                    : "Preference in procurement decisions (priority orders)."}
                            </li>
                            <li>
                                {isAr
                                    ? "علاقات تجارية طويلة الأمد وتجديد العقود."
                                    : "Longer-term business relationships and contract renewals."}
                            </li>
                            <li>
                                {isAr
                                    ? 'الاعتراف بالموردين كـ "موردين مفضلين" في السجلات الداخلية.'
                                    : 'Recognition as "preferred suppliers" in internal records.'}
                            </li>
                        </ul>
                    </section>

                    {/* Continuous Improvement */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-semibold">
                            {isAr ? "4. التحسين المستمر" : "4. Continuous Improvement"}
                        </h3>

                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>
                                {isAr
                                    ? "يتم مشاركة الملاحظات مع الموردين لتعزيز مستوى الالتزام."
                                    : "Feedback is shared with suppliers to strengthen compliance."}
                            </li>
                            <li>
                                {isAr
                                    ? "يتم إعطاء أولوية للموردين الذين يثبتون ممارسات أخلاقية قوية في عمليات التوريد المستقبلية."
                                    : "Suppliers demonstrating strong ethical practices are prioritized in future sourcing."}
                            </li>
                        </ul>
                    </section>

                    {/* Evidence */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "الأدلة" : "Evidence"}
                        </h2>

                        <p className="text-gray-600">
                            {isAr ? (
                                <>
                                    تم توثيق هذه العملية في{" "}
                                    <Link
                                        href="/customer-care/humanRightPolicy"
                                        target="_blank"
                                        className="text-purple-600 underline hover:text-purple-700 font-medium"
                                    >
                                        سياسة حقوق الإنسان (الفقرة 7)
                                    </Link>{" "}
                                    ويتم تطبيقها في اختيار وتقييم الموردين.
                                </>
                            ) : (
                                <>
                                    This process is documented in our{" "}
                                    <Link
                                        href="/customer-care/humanRightPolicy"
                                        target="_blank"
                                        className="text-purple-600 underline hover:text-purple-700 font-medium"
                                    >
                                        Human Rights Policy (Paragraph 7)
                                    </Link>{" "}
                                    and applied in supplier selection and evaluation.
                                </>
                            )}
                        </p>
                    </section>

                </main>

            </div>
        </div>
    );
}
