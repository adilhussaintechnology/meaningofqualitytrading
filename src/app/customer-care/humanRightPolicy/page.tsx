'use client';

import Link from 'next/link';
import { useLang } from "@/hooks/useLang";
import CustomerCareSidebar from '@/components/customer-care/CustomerCareSidebar';

export default function HumanRightsPolicy() {
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
                            {isAr ? "بيان سياسة حقوق الإنسان" : "Human Rights Policy Statement"}
                        </span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
                <CustomerCareSidebar />

                <main className="lg:col-span-3 space-y-14" dir={isAr ? "rtl" : "ltr"}>

                    {/* Header */}
                    <section className="space-y-4 text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold">
                            {isAr ? "بيان سياسة حقوق الإنسان" : "Human Rights Policy Statement"}
                        </h1>
                        <p className="text-gray-600">
                            {isAr ? "تاريخ التقرير: 1 يوليو 2025" : "Report Date: July 1, 2025"}
                        </p>
                    </section>

                    {/* Policy */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "سياسة حقوق الإنسان" : "Human Rights Policy"}
                        </h2>
                        <p className="text-gray-600">
                            {isAr
                                ? "تلتزم مؤسسة معنى الجودة للتجارة بممارسة أعمالها بنزاهة وعدالة واحترام لجميع الأفراد. وندرك مسؤوليتنا في دعم وحماية مبادئ حقوق الإنسان المعترف بها دوليًا في جميع عملياتنا وسلاسل التوريد وعلاقاتنا التجارية."
                                : "The Meaning of Quality Trading Establishment is committed to conducting business with integrity, fairness, and respect for all individuals. We recognize our responsibility to uphold and support internationally accepted principles of human rights in all our operations, supply chains, and business relationships."}
                        </p>
                    </section>

                    {/* 1 */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "1. الالتزام باحترام حقوق الإنسان" : "1. Respect for Human Rights"}
                        </h2>
                        <p className="text-gray-600">
                            {isAr
                                ? "نحترم كرامة وحقوق وحريات جميع الموظفين والعملاء والموردين وأصحاب المصلحة. تتماشى ممارساتنا مع الإعلان العالمي لحقوق الإنسان، واتفاقيات منظمة العمل الدولية الأساسية، والأنظمة المعمول بها في المملكة العربية السعودية."
                                : "We respect the dignity, rights, and freedoms of all employees, customers, suppliers, and stakeholders. Our practices align with the Universal Declaration of Human Rights, the International Labour Organization (ILO) Core Conventions, and relevant laws of the Kingdom of Saudi Arabia."}
                        </p>
                    </section>

                    {/* 2 */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "2. عدم التمييز وتكافؤ الفرص" : "2. Non-Discrimination and Equal Opportunity"}
                        </h2>
                        <p className="text-gray-600">
                            {isAr
                                ? "لا نقبل أي شكل من أشكال التمييز على أساس الجنسية أو الجنس أو الدين أو العرق أو الإعاقة أو العمر أو أي صفة محمية أخرى. نوفر فرصًا متكافئة في التوظيف والتدريب والتطور الوظيفي، وندعم اتفاقية القضاء على جميع أشكال التمييز ضد المرأة واتفاقية حقوق الطفل."
                                : "We do not tolerate any form of discrimination based on nationality, gender, religion, race, disability, age, or any other protected characteristic. We provide equal opportunities in employment, training, and progression. We explicitly support the Convention on the Elimination of Discrimination Against Women (CEDAW) and the Convention on the Rights of the Child (CRC)."}
                        </p>
                    </section>

                    {/* 3 */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "3. بيئة عمل آمنة وصحية" : "3. Safe and Healthy Workplace"}
                        </h2>
                        <p className="text-gray-600">
                            {isAr
                                ? "نلتزم بتوفير بيئة عمل آمنة وصحية، ونلتزم بجميع أنظمة العمل والسلامة والبيئة المعمول بها في المملكة العربية السعودية، ونسعى لتحقيق الامتثال لمعيار ISO 45001 لأنظمة إدارة السلامة والصحة المهنية."
                                : "We are committed to maintaining a safe working environment. We follow all applicable Saudi Arabian labor, safety, and environmental regulations and promote a culture of safety for our employees and partners. We aim to achieve compliance with ISO 45001 Occupational Health & Safety Management Systems."}
                        </p>
                    </section>

                    {/* 4 */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "4. حظر العمل القسري وعمالة الأطفال" : "4. Prohibition of Forced Labor and Child Labor"}
                        </h2>
                        <p className="text-gray-600">
                            {isAr
                                ? "نحظر بشكل صارم أي شكل من أشكال العمل القسري أو الاتجار بالبشر أو عمالة الأطفال داخل عملياتنا أو لدى موردينا، ونتوقع من الموردين التحقق من أعمار العاملين وضمان حرية التنقل بما يتماشى مع معايير منظمة العمل الدولية."
                                : "We strictly prohibit any form of forced labor, human trafficking, or child labor within our operations and among our suppliers. Suppliers must verify worker age and ensure freedom of movement, in line with ILO standards."}
                        </p>
                    </section>

                    {/* 5 */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "5. ظروف عمل عادلة" : "5. Fair Working Conditions"}
                        </h2>
                        <p className="text-gray-600">
                            {isAr
                                ? "نضمن الأجور العادلة وساعات العمل القانونية والالتزام بأنظمة العمل السعودية. يُعامل جميع الموظفين باحترام ويحق لهم العمل في بيئة خالية من التحرش أو الإساءة."
                                : "We ensure fair wages, lawful working hours, and compliance with Saudi labor regulations. All employees are treated with respect and have the right to work in an environment free of harassment or abuse."}
                        </p>
                    </section>

                    {/* 6 */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "6. السلوك التجاري الأخلاقي" : "6. Ethical Business Conduct"}
                        </h2>
                        <p className="text-gray-600">
                            {isAr
                                ? "نمارس أعمالنا بشفافية ونزاهة، ولا نتسامح مع الرشوة أو الفساد أو أي ممارسات غير أخلاقية، ونلتزم بجميع أنظمة مكافحة الفساد."
                                : "Our company conducts business transparently and ethically. Bribery, corruption, and unethical practices are not tolerated."}
                        </p>
                    </section>

                    {/* 7 */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "7. مسؤولية الموردين والشركاء" : "7. Supplier and Partner Responsibility"}
                        </h2>
                        <p className="text-gray-600">
                            {isAr
                                ? "نتوقع من موردينا وشركائنا الالتزام بنفس معايير حقوق الإنسان. يتم تضمين بنود حقوق الإنسان في اتفاقيات الموردين، وإجراء تقييمات دورية، ومنح حوافز للموردين الملتزمين أخلاقيًا."
                                : "We expect our suppliers and business partners to follow similar human rights standards. We integrate human rights clauses into supplier agreements and conduct regular supplier assessments."}
                        </p>
                    </section>

                    {/* 8 */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "8. المسؤولية البيئية" : "8. Environmental Responsibility"}
                        </h2>
                        <p className="text-gray-600">
                            {isAr
                                ? "نلتزم بجميع الأنظمة البيئية المعمول بها في المملكة العربية السعودية ونتماشى مع المعايير الدولية للحد من التلوث وإدارة النفايات."
                                : "We comply with all applicable Saudi Arabian environmental laws and align our practices with internationally recognized standards."}
                        </p>
                    </section>

                    {/* Closing */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {isAr ? "البيان الختامي" : "Closing Statement"}
                        </h2>
                        <p className="text-gray-600">
                            {isAr
                                ? "تؤكد مؤسسة معنى الجودة للتجارة التزامها بحماية حقوق الإنسان والحفاظ على البيئة وتعزيز الممارسات التجارية الأخلاقية باعتبارها أساسًا للنمو المستدام والنجاح طويل الأمد."
                                : "The Meaning of Quality Trading Establishment affirms its commitment to uphold human rights, protect the environment, and foster ethical business practices."}
                        </p>
                    </section>

                </main>
            </div>
        </div>
    );
}
