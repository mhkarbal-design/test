import { useCallback, useEffect, useState } from 'react';

export const usePrint = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const handleAfterPrint = () => setIsPrinting(false);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, []);

  const print = useCallback(() => {
    setIsPrinting(true);
    setTimeout(() => window.print(), 0);
  }, []);

  return { isPrinting, print };
};
