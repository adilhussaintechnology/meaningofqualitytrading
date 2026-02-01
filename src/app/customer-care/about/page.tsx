'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Users, Target, Award, Clock } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import CustomerCareSidebar from '@/components/customer-care/CustomerCareSidebar';

export default function AboutPage() {
  const lang = useLang();
  const isAr = lang === "ar";
  const HandshakeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12l2-2m0 0l2 2m-2-2v6m4-6l2-2m0 0l2 2m-2-2v6" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-purple-600">{isAr ? "الرئيسية" : "Home"}</Link>
            <span className="mx-2">&gt;</span>
            <Link href="/customer-care" className="hover:text-purple-600">{isAr ? "خدمة العملاء" : "Customer Care"}</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900">{isAr ? "من نحن" : "About Us"}</span>
          </nav>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <CustomerCareSidebar />

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-16" dir={isAr ? "rtl" : "ltr"}>
          {/* Header Section */}
          <section className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              {isAr ? "ملف الشركة" : "Company Profile"}
            </h1>
            <p className="mt-2 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
              {isAr
                ? "مؤسسة معنى الجودة للتجارة (سلطان) شركة رائدة في توريد منتجات عالية الجودة وخدمات موثوقة، تلتزم بمعايير الجودة والأداء وتجربة العملاء."
                : "The Meaning of Quality Trading Establishment (Sultan) is a leading provider of high-quality products and reliable services, committed to quality, performance, and customer experience."}
            </p>
          </section>



          {/* History & Operations */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">{isAr ? "التاريخ والعمليات" : "History & Operations"}</h2>
            <p className="text-gray-600 leading-relaxed">``
              {isAr
                ? "تأسست الشركة عام 2015 في الرياض، المملكة العربية السعودية، وتعمل تحت العلامة التجارية 'سلطان'. منذ إنشائها، تلتزم الشركة بتقديم منتجات عالية الجودة وخدمات موثوقة لعملائها، لتصبح اسمًا معروفًا وموثوقًا في قطاع التجارة والاستيراد بالجملة."
                : "The company was founded in 2015 in Riyadh, Saudi Arabia, operating under the brand name 'Sultan'. Since its inception, Sultan has been committed to delivering premium-quality products and reliable services, becoming a recognized and respected name in wholesale trading and importing."}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {isAr
                ? "تختص الشركة بالتجارة والاستيراد بالجملة لمجموعة متنوعة من المنتجات عالية الجودة، لتلبية احتياجات الأسواق المحلية والموزعين وتجار التجزئة والمصانع وورش العمل في جميع أنحاء المملكة."
                : "Sultan specializes in wholesale trading and importing high-quality products, serving retail markets, wholesale distributors, factories, and workshops across Saudi Arabia."}
            </p>
          </section>

          {/* Mission, Vision & Core Values */}
          <section className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">{isAr ? "مهمتنا" : "Our Mission"}</h2>
              <p className="text-gray-600 leading-relaxed">
                {isAr
                  ? "تقديم منتجات عالية الجودة وخدمة عملاء استثنائية، وبناء شراكات طويلة الأمد تقوم على الثقة والمصلحة المشتركة."
                  : "To provide clients with premium-quality products and exceptional customer service, fostering long-term partnerships built on trust and mutual benefit."}
              </p>

              <h2 className="text-2xl font-semibold">{isAr ? "رؤيتنا" : "Our Vision"}</h2>
              <p className="text-gray-600 leading-relaxed">
                {isAr
                  ? "أن نكون من أبرز وأوثق مؤسسات التجارة في المنطقة، معروفين بالجودة والموثوقية ورضا العملاء."
                  : "To be one of the leading and most trusted trading establishments in the region, renowned for quality, reliability, and customer satisfaction."}
              </p>


            </div>

            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/aboutus.jpg"
                alt={isAr ? "صورة عن الشركة" : "About Us Image"}
                className="w-full h-full object-cover"
                width={600}
                height={800}
              />
            </div>
          </section>

          {/* Our Values */}
          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-center">
              {isAr ? "قيمنا الأساسية" : "Our Core Values"}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <ValueCard
                icon={<Users className="w-6 h-6" />}
                title={isAr ? "العملاء" : "Customers"}
                description={isAr ? "نحن نضع عملاءنا في قلب كل ما نقوم به، مع التركيز على احتياجاتهم وتطلعاتهم." : "We prioritize our customers, ensuring their needs and expectations are at the heart of everything we do."}
              />
              <ValueCard
                icon={HandshakeIcon}
                title={isAr ? "الشراكات" : "Partnerships"}
                description={isAr ? "نحن نؤمن بأن النجاح يأتي من خلال بناء شراكات قوية مع موردينا وشركائنا." : "We believe success comes from building strong partnerships with our suppliers and partners."}
              />
              <ValueCard
                icon={<Award className="w-6 h-6" />}
                title={isAr ? "الجودة" : "Quality"}
                description={isAr ? "نحن ملتزمون بتوفير منتجات عالية الجودة تلبي معاييرنا الشديدة." : "We are committed to delivering high-quality products that meet our stringent standards."}
              />
              <ValueCard
                icon={<Clock className="w-6 h-6" />}
                title={isAr ? "الوقت" : "Time"}
                description={isAr ? "نحن نقدر الوقت ونضمن تقديم منتجاتنا في الوقت المحدد." : "We value time and ensure our products are delivered on schedule."}
              />
            </div>
          </section>



          {/* Product & Services */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-center">{isAr ? "المنتجات والخدمات" : "Products & Services"}</h2>
            <p className="text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
              {isAr
                ? "تشمل منتجاتنا مجموعة متنوعة من الفئات عالية الجودة من موردين موثوقين عالميًا، لتلبية احتياجات قطاعات مختلفة."
                : "Our catalogue includes a wide range of high-quality products sourced from reputable suppliers worldwide, serving diverse industries."}
            </p>

            {/* Features */}
            <div className="grid gap-8 sm:grid-cols-3">
              <FeatureCard
                icon={<Award className="w-6 h-6" />}
                title={isAr ? "الملابس الموحدة" : "Uniforms"}
                description={isAr ? "توفير الملابس الموحدة عالية الجودة للمؤسسات والشركات." : "Providing high-quality uniforms for businesses and institutions."}
              />
              <FeatureCard
                icon={<Target className="w-6 h-6" />}
                title={isAr ? "مواد السلامة" : "Safety Materials"}
                description={isAr ? "منتجات السلامة لضمان بيئة عمل آمنة." : "Safety products to ensure a secure working environment."}
              />
              <FeatureCard
                icon={<Users className="w-6 h-6" />}
                title={isAr ? "معدات الحماية الشخصية" : "PPE Equipment"}
                description={isAr ? "معدات الحماية الشخصية لتلبية متطلبات العمال والمصانع." : "Personal protective equipment to meet worker and factory requirements."}
              />
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <FeatureCard
                icon={<Award className="w-6 h-6" />}
                title={isAr ? "اللاصقات والرغوة" : "Adhesives & PU Foam"}
                description={isAr ? "منتجات لاصقة ورغوية عالية الأداء." : "High-performance adhesives and PU foam products."}
              />
              <FeatureCard
                icon={<Target className="w-6 h-6" />}
                title={isAr ? "السيليكون والمواد العازلة" : "Silicones & Sealants"}
                description={isAr ? "حلول سيليكون ومواد عازلة لمختلف التطبيقات." : "Silicone and sealant solutions for various applications."}
              />
              <FeatureCard
                icon={<Users className="w-6 h-6" />}
                title={isAr ? "أثاث وإكسسوارات" : "Furniture Hardware & Fabrics"}
                description={isAr ? "إكسسوارات الأثاث والأقمشة عالية الجودة." : "Furniture hardware accessories and upholstery fabrics."}
              />
            </div>
          </section>

          {/* Logistics */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">{isAr ? "اللوجستيات" : "Logistics"}</h2>
            <p className="text-gray-600 leading-relaxed">
              {isAr
                ? "يقع المستودع في حي الجزيرة، الرياض، مما يضمن تسليم الطلبات بسرعة في جميع أنحاء المملكة. تعتمد الشركة أنظمة فعالة لإدارة المخزون وتتعاون مع شركاء اللوجستيات لضمان الإمداد المستمر والتنفيذ السريع للطلبات."
                : "The warehouse is located in the Al Jazeerah District, Riyadh, ensuring prompt deliveries across Saudi Arabia. The company maintains efficient inventory management systems and works closely with logistics partners to ensure consistent supply and quick order fulfillment."}
            </p>
          </section>

          {/* CTA */}
          <div className="text-center">
            <a
              href="/customer-care"
              className="inline-flex items-center justify-center rounded-full bg-purple-600 px-8 py-3 text-sm font-medium text-white shadow-md hover:bg-purple-700 transition"
            >
              {isAr ? "تواصل معنا الآن" : "Get in Touch"}
            </a>
          </div>

        </main>

      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition text-center space-y-4">
      <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-purple-100 text-purple-600">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition text-center space-y-4">
      <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-purple-100 text-purple-600">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
