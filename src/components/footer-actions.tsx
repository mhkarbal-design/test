import React from 'react';

interface FooterActionsProps {
  onDateChange: (date: Date) => void;
  onPrintClick: () => void;
  onSearchChange: (value: string) => void;
}

export const FooterActions: React.FC<FooterActionsProps> = ({
  onDateChange,
  onPrintClick,
  onSearchChange,
}) => {
  return (
    <div data-noprint={false}>
      {/* Footer actions: search, date picker, print button */}
    </div>
  );
};
