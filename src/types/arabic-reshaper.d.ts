declare module 'arabic-reshaper' {
  export function convertArabic(text: string): string;
  const arabicReshaper = { convertArabic };
  export default arabicReshaper;
}

declare module 'bidi-js' {
  function bidiFactory(): {
    getText(text: string): string;
  };
  export default bidiFactory;
}

