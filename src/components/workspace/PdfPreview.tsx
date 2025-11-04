"use client";

import { useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// ✅ Correct for pdfjs-dist v5+
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

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
