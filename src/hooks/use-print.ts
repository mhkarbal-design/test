import { useCallback, useEffect, useState } from 'react';

export const usePrint = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const handleAfterPrint = () => setIsPrinting(false);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, []);

  useEffect(() => {
    if (isPrinting) window.print();
  }, [isPrinting]);

  const print = useCallback(() => setIsPrinting(true), []);

  return { isPrinting, print };
};
