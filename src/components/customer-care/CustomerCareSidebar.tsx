'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '@/hooks/useLang';
import { t } from '@/data/labels';

export default function CustomerCareSidebar() {
  const pathname = usePathname();
  const lang = useLang();

  const sections = [
    {
      title: t('company', lang),
      items: [
        { id: 'about', label: t('aboutUs', lang), path: '/customer-care/about' },
        { id: 'human-rights-policy', label: t('humanRightsPolicy', lang), path: '/customer-care/humanRightPolicy' },
        {
          id: 'human-rights-analysis',
          label: t('humanRightsAnalysisProcess', lang),
          path: '/customer-care/humanRightsAnalysisProcessDescription',
        },
        {
          id: 'human-rights-dd',
          label: t('humanRightsDueDiligance', lang),
          path: '/customer-care/humanRightsDueDiligance',
        },
        {
          id: 'supplier-incentive',
          label: t('supplierIncentiveProcess', lang),
          path: '/customer-care/supplierIncentiveProcessDescription',
        },
      ],
    },
    {
      title: t('customerCare', lang),
      items: [
        { id: 'contact', label: t('contactUs', lang), path: '/customer-care' },
        {
          id: 'quotation',
          label: t('shoppingGuide', lang),
          path: '/customer-care/shopping-guide',
        },
        { id: 'faq', label: t('faq', lang), path: '/customer-care/faq' },
        { id: 'returns', label: t('returnExchange', lang), path: '/customer-care/returns' },
        { id: 'terms', label: t('termsOfBusiness', lang), path: '/customer-care/termsOfBusiness' },
        { id: 'privacy', label: t('privacyPolicy', lang), path: '/customer-care/privacy' },
      ],
    },
  ];

  return (
    <aside className="lg:col-span-1">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <nav className="p-5 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              {/* SECTION HEADING */}
              <h3 className="px-3 mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {section.title}
              </h3>

              {/* LINKS */}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.path;

                  return (
                    <li key={item.id}>
                      <Link
                        href={item.path}
                        className={`
                          group relative flex items-center
                          px-4 py-2.5 text-sm rounded-lg
                          transition-all duration-200
                          ${
                            isActive
                              ? 'bg-purple-50 text-purple-700 font-semibold'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                          }
                        `}
                      >
                        {/* LEFT ACCENT BAR */}
                        <span
                          className={`
                            absolute left-0 top-2 bottom-2 w-1 rounded-full
                            transition-all duration-200
                            ${
                              isActive
                                ? 'bg-purple-600'
                                : 'bg-transparent group-hover:bg-purple-300'
                            }
                          `}
                        />

                        {/* LABEL */}
                        <span className="ml-2 leading-tight">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
