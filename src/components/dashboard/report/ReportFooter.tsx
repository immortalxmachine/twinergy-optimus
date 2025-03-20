
import React from 'react';

interface ReportFooterProps {
  date: string;
}

export default function ReportFooter({ date }: ReportFooterProps) {
  return (
    <div className="text-sm text-muted-foreground">
      <p><strong>Prepared By:</strong> Smart Factory Analytics</p>
      <p><strong>Date:</strong> {date}</p>
    </div>
  );
}
