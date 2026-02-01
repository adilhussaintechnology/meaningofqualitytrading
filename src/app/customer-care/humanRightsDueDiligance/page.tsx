'use client';

import Link from 'next/link';
import { useLang } from "@/hooks/useLang";
import CustomerCareSidebar from '@/components/customer-care/CustomerCareSidebar';



export default function HumanRightsDueDiligencePage() {
    const lang = useLang();
    const isAr = lang === "ar";

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex text-sm text-gray-500">
                        <Link href="/" className="hover:text-purple-600">Home</Link>
                        <span className="mx-2">&gt;</span>
                        <Link href="/customer-care" className="hover:text-purple-600">Customer Care</Link>
                        <span className="mx-2">&gt;</span>
                        <span className="text-gray-900">
                            {isAr ? "العناية الواجبة بحقوق الإنسان" : "Human Rights Due Diligence"}
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
                            {isAr ? "تقرير العناية الواجبة بحقوق الإنسان" : "Human Rights Due Diligence Report"}
                        </h1>
                        <p className="text-gray-600">
                            {isAr ? "تاريخ التقرير: 1 يوليو 2025" : "Report Date: July 1, 2025"}
                        </p>
                    </section>

                    {/* 1. Introduction & Policy Commitment */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "1. المقدمة والالتزام بالسياسة" : "1. Introduction & Policy Commitment"}
                        </h2>

                        <p className='text-gray-600'>
                            {isAr ? "تتعهد مؤسسة معاني الجودة للتجارة بالالتزام بمبادئ حقوق الإنسان الدولية وقوانين العمل السعودية في جميع عملياتها وسلاسل التوريد. يحدد بيان سياسة حقوق الإنسان لدينا مسؤوليات واضحة للإدارة والموظفين والموردين، مما يضمن احترام وحماية وحماية حقوق الإنسان."
                                : "The Meaning of Quality Trading Establishment is committed to upholding international human rights standards and Saudi labor law across all operations and supply chains. Our Human Rights Policy Statement establishes clear responsibilities for management, employees, and suppliers, ensuring that human rights are respected, protected, and promoted."}
                        </p>

                        <h3 className="text-lg font-semibold">
                            {isAr ? "الالتزامات الرئيسية" : "Key Commitments"}
                        </h3>

                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>{isAr ? "حظر عمالة الأطفال والعمل القسري." : "Prohibition of child labor and forced labor."}</li>
                            <li>{isAr ? "عدم التمييز وتكافؤ الفرص." : "Non-discrimination and equal opportunity."}</li>
                            <li>{isAr ? "توفير بيئة عمل آمنة وصحية." : "Safe and healthy working conditions."}</li>
                            <li>{isAr ? "احترام حرية تكوين الجمعيات والمفاوضة الجماعية." : "Respect for freedom of association and collective bargaining."}</li>
                            <li>{isAr ? "آليات تظلم شفافة للموظفين والموردين." : "Transparent grievance mechanisms for employees and suppliers."}</li>
                        </ul>
                    </section>

                    {/* 2. Risk Analysis Process */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "2. عملية تحليل المخاطر" : "2. Risk Analysis Process"}
                        </h2>

                        <p className="text-gray-600">
                            {isAr
                                ? "تبدأ العناية الواجبة بحقوق الإنسان بعملية تحليل مخاطر منهجية."
                                : "Human rights due diligence begins with systematic risk analysis."}
                        </p>

                        <h3 className="text-lg font-semibold">{isAr ? "النطاق" : "Scope"}</h3>
                        <p className="text-gray-600">
                            {isAr
                                ? "يشمل نطاق التحليل العمليات الداخلية والموردين المباشرين وسلسلة التوريد الممتدة."
                                : "Scope includes own operations, direct suppliers, and the extended supply chain."}
                        </p>

                        <h3 className="text-lg font-semibold">{isAr ? "المنهجية" : "Methodology"}</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>{isAr ? "تحديد المخاطر (عمالة الأطفال، العمل القسري، التمييز، السلامة المهنية)." : "Identification of risks (child labor, forced labor, discrimination, occupational safety)."}</li>
                            <li>{isAr ? "تقييم الشدة والاحتمالية والتأثير." : "Assessment of severity, likelihood, and potential impact."}</li>
                            <li>{isAr ? "تحديد الأولويات بناءً على عدد المتأثرين وعدم قابلية الضرر للإصلاح." : "Prioritization based on affected persons, irreversibility, and legal or reputational impact."}</li>
                        </ul>

                        <h3 className="text-lg font-semibold">{isAr ? "المتابعة" : "Monitoring"}</h3>
                        <p className="text-gray-600">
                            {isAr
                                ? "تشمل المتابعة تحديثات سنوية ومراجعات إضافية للمشاريع الجديدة."
                                : "Monitoring includes annual updates, ad-hoc reviews for new projects, and corrective actions."}
                        </p>

                        <p className="text-gray-600 italic">
                            {isAr ? (
                                <>
                                    <span className="font-semibold text-gray-800">الدليل:</span>{' '}
                                    <Link
                                        href="/customer-care/humanRightsAnalysisProcessDescription"
                                        target="_blank"
                                        className="text-purple-600 underline hover:text-purple-700 font-medium"
                                    >
                                        وصف عملية تحليل مخاطر حقوق الإنسان
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <span className="font-semibold text-gray-800">Evidence:</span>{' '}
                                    <Link
                                        href="/customer-care/humanRightsAnalysisProcessDescription"
                                        target="_blank"
                                        className="text-purple-600 underline hover:text-purple-700 font-medium"
                                    >
                                        Human Rights Risk Analysis Process Description
                                    </Link>
                                </>
                            )}
                        </p>

                    </section>

                    {/* 3. Preventive & Corrective Measures */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "3. الإجراءات الوقائية والتصحيحية" : "3. Preventive & Corrective Measures"}
                        </h2>

                        <ul className="list-disc list-inside text-gray-600 space-y-3">
                            <li>
                                {isAr
                                    ? "إلزام الموردين بالامتثال لاتفاقيات منظمة العمل الدولية ونظام العمل السعودي."
                                    : "Suppliers are required to comply with International Labour Organization (ILO) conventions and Saudi labor law."}
                            </li>

                            <li>
                                {isAr
                                    ? "إجراء عمليات تدقيق منتظمة على الموردين للتحقق من الامتثال لمتطلبات حقوق الإنسان."
                                    : "Regular supplier audits are conducted to verify compliance with child labor, forced labor, and occupational safety requirements."}
                            </li>

                            <li>
                                {isAr
                                    ? "تقديم برامج توعوية وتدريبية للموظفين والموردين حول مخاطر ومسؤوليات حقوق الإنسان."
                                    : "Employees and suppliers receive awareness and training programs on human rights risks and responsibilities."}
                            </li>

                            <li>
                                {isAr
                                    ? "إلزام الموردين غير الملتزمين بتنفيذ خطط تصحيحية ومعالجة ضمن أطر زمنية محددة."
                                    : "Non-compliant suppliers are required to implement corrective and remediation plans within defined timelines."}
                            </li>
                        </ul>
                    </section>


                    {/* 4. Supplier Incentive & Monitoring */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "4. تحفيز الموردين ومراقبتهم" : "4. Supplier Incentive & Monitoring"}
                        </h2>

                        <li className="text-gray-600 ml-4">
                            {isAr
                                ? "يتم تحفيز الموردين الملتزمين بعقود أطول وزيادة الطلبات."
                                : "Positive incentives include longer contracts, increased orders, and supplier recognition."}
                        </li>

                        <li className="text-gray-600 ml-4">
                            {isAr
                                ? "تتم مراقبة الأداء من خلال التدقيق وآليات التظلم."
                                : "Supplier performance is monitored through audits, grievance reports, and corrective actions."}
                        </li>

                        <li className="text-gray-600 ml-4 italic">
                            {isAr
                                ? "الدليل: وصف عملية تحفيز الموردين (PDF)"
                                : "Evidence: Supplier Incentive Process Description.pdf"}
                        </li>

                        <p className="text-gray-600 italic">
                            {isAr ? (
                                <>
                                    <span className="font-semibold text-gray-800">الدليل:</span>{' '}
                                    <Link
                                        href="/customer-care/supplierIncentiveProcessDescription"
                                        target="_blank"
                                        className="text-purple-600 underline hover:text-purple-700 font-medium"
                                    >
                                        الدليل: وصف عملية تحفيز الموردين                                    </Link>
                                </>
                            ) : (
                                <>
                                    <span className="font-semibold text-gray-800">Evidence:</span>{' '}
                                    <Link
                                        href="/customer-care/supplierIncentiveProcessDescription"
                                        target="_blank"
                                        className="text-purple-600 underline hover:text-purple-700 font-medium"
                                    >
                                        Supplier Incentive Process Description
                                    </Link>
                                </>
                            )}
                        </p>
                    </section>

                    {/* 5. Grievance Mechanism */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "5. آلية التظلم والمعالجة" : "5. Grievance Mechanism & Remediation"}
                        </h2>

                        <p className="text-gray-600">
                            {isAr
                                ? "تتوفر آلية تظلم رسمية وسرية للموظفين والعاملين في سلسلة التوريد."
                                : "The grievance mechanism is accessible to employees and supply chain workers."}
                        </p>

                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>{isAr ? "تقديم شكاوى بسرية ودون انتقام." : "Confidential complaint submission without retaliation."}</li>
                            <li>{isAr ? "إجراءات واضحة يتم توصيلها عبر الموقع والتدريب." : "Clear procedures communicated via website and training."}</li>
                            <li>{isAr ? "تغطية عمالة الأطفال والعمل القسري والتمييز والسلامة المهنية." : "Coverage of child labor, forced labor, discrimination, and occupational safety."}</li>
                            <li> {isAr
                                ? "تتم المعالجة من خلال إجراءات تصحيحية ومراجعة السياسات."
                                : "Remediation is achieved through corrective actions, supplier engagement, and policy revisions."}</li>
                        </ul>
                    </section>

                    {/* 6. Reporting & Transparency */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "6. التقارير والشفافية" : "6. Reporting & Transparency"}
                        </h2>
                        <p className="text-gray-600">
                            {isAr
                                ? "تبلغ مؤسسة معاني الجودة للتجارة عن تنفيذ العناية الواجبة من خلال:"
                                : "The Meaning of Quality Trading Establishment reports on the implementation of human rights due diligence through:"}
                        </p>

                        <li className="text-gray-600 ml-4">
                            {isAr
                                ? "يتم الإبلاغ عن تنفيذ العناية الواجبة من خلال وثائق داخلية وتقارير خارجية عند الطلب."
                                : "Internal documentation (Risk Analysis, Supplier Incentive, Policy Statement)."}
                        </li>

                        <li className="text-gray-600 ml-4">
                            {isAr
                                ? "التقارير الخارجية عند الطلب من قبل أصحاب المصلحة والمفتشين."
                                : "External reporting upon request by stakeholders and auditors."}
                        </li>
                        <li className="text-gray-600 ml-4">
                            {isAr
                                ? "تحديثات سنوية لضمان الدقة والملاءمة"
                                : "Annual updates to ensure accuracy and relevance."}
                        </li>
                    </section>

                    {/* 7. Conclusion */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "7. الخلاصة" : "7. Conclusion"}
                        </h2>

                        <p className="text-gray-600">
                            {isAr
                                ? "تدمج مؤسسة معاني الجودة للتجارة العناية الواجبة في إدارةها وإدارتها وتوريدها. من خلال تحليل المخاطر، والوقاية، وتحفيز الموردين، وميكانيزم الشكاوي، والإبلاغ الشفاف، نضمن الامتثال للمعايير الدولية وقانون العمل السعودي، ونبني الثقة مع الموظفين والموردين والعملاء."
                                : "The Meaning of Quality Trading Establishment integrates human rights due diligence into its governance, procurement, and supply chain management. Through risk analysis, preventive measures, supplier incentives, grievance mechanisms, and transparent reporting, we ensure compliance with international standards and Saudi labor law, while building trust with employees, suppliers, and customers."}
                        </p>

                    </section>

                </main>
            </div>
        </div>
    );
}
