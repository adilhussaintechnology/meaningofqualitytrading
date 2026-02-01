import Image from "next/image";

// src/components/ui/RiyalSymbol.tsx
export function RiyalSymbol({ className = 'w-5 h-5 inline-block align-text-bottom' }) {
  return (
    <Image
      src="/images/logo/Saudi_Riyal_Symbo.svg" // removed 'public'
      alt="Saudi Riyal"
      className={className}
      style={{ display: 'inline', verticalAlign: 'middle' }}
      loading="lazy"
      width={20} // adjust to desired inline size
      height={20} // adjust to desired inline size
    />
  );
} 
