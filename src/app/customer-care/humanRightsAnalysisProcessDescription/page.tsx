'use client';

import Link from 'next/link';
import { useLang } from "@/hooks/useLang";
import CustomerCareSidebar from '@/components/customer-care/CustomerCareSidebar';

export default function HumanRightsAnalysisProcessDescription() {
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
                            {isAr ? "وصف عملية تحليل حقوق الإنسان" : "Human Rights Analysis Process Description"}
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
                            {isAr ? "وصف عملية تحليل حقوق الإنسان" : "Human Rights Risk Analysis Process Description"}
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
                        <p className='text-gray-600'>
                            {isAr
                                ? "تحديد وتقييم وتخفيف الأثر السلبي المحتمل لعملياتنا وعلاقاتنا التجارية على حقوق الإنسان بشكل منهجي."
                                : "To systematically identify, assess, and mitigate potential negative impacts of our operations and business relationships on human rights."}
                        </p>
                    </section>

                    {/* Process */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "العملية" : "Process"}
                        </h2>

                        {/* 1. Scope of Analysis */}
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "1. نطاق التحليل" : "1. Scope of Analysis"}
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>{isAr ? "عملياتنا الداخلية (الموظفون وممارسات مكان العمل)." : "Own operations (employees, workplace practices)."}</li>
                            <li>{isAr ? "سلسلة التوريد المباشرة (المنتجات المستوردة وممارسات الموردين)." : "Direct supply chain (imported products and supplier practices)."}</li>
                            <li>{isAr ? "العلاقات التجارية (الشركاء والعملاء)." : "Business relationships (partners and customers)."}</li>
                        </ul>

                        {/* 2. Risk Identification */}
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "2. تحديد المخاطر" : "2. Risk Identification"}
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>{isAr ? "مراجعة ممارسات العمل (عمالة الأطفال، العمل القسري، التمييز، الأجور، ساعات العمل)." : "Review of labor practices (child labor, forced labor, discrimination, wages, working hours)."}</li>
                            <li>{isAr ? "الامتثال للصحة والسلامة المهنية." : "Occupational health and safety compliance."}</li>
                            <li>{isAr ? "السلوك الأخلاقي (مكافحة الفساد، الشفافية)." : "Ethical conduct (anti-corruption, transparency)."}</li>
                            <li>{isAr ? "الأثر البيئي (التلوث، المواد الخطرة)." : "Environmental impacts (pollution, hazardous materials)."}</li>
                        </ul>

                        {/* 3. Information Sources */}
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "3. مصادر المعلومات" : "3. Information Sources"}
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>{isAr ? "مناقشات داخلية مع الإدارة والموظفين." : "Internal discussions with management and employees."}</li>
                            <li>{isAr ? "تقييم الموردين ومراجعة الوثائق." : "Supplier assessments and documentation reviews."}</li>
                            <li>{isAr ? "المعايير الخارجية (اتفاقيات منظمة العمل الدولية، قانون العمل السعودي، المبادئ التوجيهية للأمم المتحدة)." : "External standards (ILO conventions, Saudi labor law, UN Guiding Principles)."} </li>
                        </ul>

                        {/* 4. Risk Assessment */}
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "4. تقييم المخاطر" : "4. Risk Assessment"}
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>{isAr ? "تحديد الأولويات بناءً على شدة المخاطر وعدد الأشخاص المتأثرين وتأثير السمعة أو القانون." : "Risks prioritized based on severity, number of affected persons, and reputational/legal impact."}</li>
                            <li>{isAr ? "يؤخذ في الاعتبار التأثير المباشر وغير المباشر." : "Both direct and indirect impacts considered."}</li>
                        </ul>

                        {/* 5. Mitigation & Corrective Action */}
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "5. التخفيف والإجراءات التصحيحية" : "5. Mitigation & Corrective Action"}
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>{isAr ? "عدم الامتثال يؤدي إلى اتخاذ إجراءات تصحيحية (التواصل مع المورد، مراجعة العقود، الإصلاح)." : "Non-compliance triggers corrective measures (supplier engagement, contract review, remediation)."}</li>
                            <li>{isAr ? "المراقبة المستمرة وتحديث التحليل السنوي للمخاطر." : "Continuous monitoring and annual updates to risk analysis."}</li>
                        </ul>

                        {/* 6. Reporting & Transparency */}
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "6. التقارير والشفافية" : "6. Reporting & Transparency"}
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>{isAr ? "توثيق النتائج في تقرير العناية الواجبة السنوي لحقوق الإنسان (انظر الفقرة 13 من السياسة)." : "Findings documented in annual Human Rights Due Diligence Report (see Policy Paragraph 13)."}</li>
                            <li>{isAr ? "تكون التقارير متاحة لأصحاب المصلحة." : "Reports made available to stakeholders."}</li>
                        </ul>
                    </section>

                    {/* Evidence */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "الأدلة" : "Evidence"}
                        </h2>
                        <p className="text-gray-600">
                            {isAr
                                ? "تم توثيق هذه العملية في سياسة حقوق الإنسان لدينا (الفقرات 12–14) وتطبيقها في جميع العمليات وعلاقات الموردين."
                                : (
                                    <>
                                        This process is documented in our{" "}
                                        <Link
                                            href="/customer-care/humanRightPolicy"
                                            target="_blank"
                                            className="text-purple-600 underline hover:text-purple-700 font-medium"
                                        >
                                            Human Rights Policy (Paragraphs 12–14)
                                        </Link>{" "}
                                        and applied across operations and supplier relationships.
                                    </>
                                )}
                        </p>
                    </section>

                </main>
            </div>
        </div>
    );
}
