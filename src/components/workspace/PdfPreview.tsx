"use client";

import { useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// ✅ Correct for pdfjs-dist v5+
// ✅ Dynamic CDN URL to ensure API and Worker versions always match
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfPreviewProps {
  fileUrl: string;
  scale: number;
  className?: string;
  pageNumber?: number;
}

export default function PdfPreview({
  fileUrl,
  scale,
  className,
  pageNumber = 1,
}: PdfPreviewProps) {
  const memoizedFile = useMemo(() => ({ url: fileUrl }), [fileUrl]);

  return (
    <div className={className}>
      <Document file={memoizedFile} loading={<p>Loading PDF…</p>}>
        <Page
          pageNumber={pageNumber}
          scale={scale}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
    </div>
  );
}
