import { useState, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import imageCompression from 'browser-image-compression';
import { ProcessPhase } from '../components/ProgressDisplay';

interface ConversionResult {
  blob: Blob;
  originalSize: number;
  compressedSize: number;
}

interface UsePdfConverterReturn {
  phase: ProcessPhase;
  progress: number;
  result: ConversionResult | null;
  convert: (files: File[]) => Promise<void>;
  reset: () => void;
}

const usePdfConverter = (): UsePdfConverterReturn => {
  const [phase, setPhase] = useState<ProcessPhase>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ConversionResult | null>(null);

  const reset = useCallback(() => {
    setPhase('idle');
    setProgress(0);
    setResult(null);
  }, []);

  const convert = useCallback(async (files: File[]) => {
    if (!files.length) return;

    try {
      // ── Phase 1: Uploading ──────────────────────────
      setPhase('uploading');
      setProgress(0);

      // Read files as data URLs with progress
      const fileDataUrls: string[] = [];
      let originalTotalSize = 0;

      for (let i = 0; i < files.length; i++) {
        originalTotalSize += files[i].size;
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = e => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(files[i]);
        });
        fileDataUrls.push(dataUrl);
        setProgress(Math.round(((i + 1) / files.length) * 30));
        await delay(80);
      }

      setProgress(35);
      await delay(200);

      // ── Phase 2: Converting ─────────────────────────
      setPhase('converting');
      setProgress(35);

      // Get image dimensions for each file
      const imageDimensions: { w: number; h: number }[] = [];
      for (let i = 0; i < fileDataUrls.length; i++) {
        const dims = await getImageDimensions(fileDataUrls[i]);
        imageDimensions.push(dims);
        setProgress(35 + Math.round(((i + 1) / fileDataUrls.length) * 25));
        await delay(60);
      }

      setProgress(62);
      await delay(200);

      // Build PDF
      const firstDim = imageDimensions[0];
      const isLandscape = firstDim.w > firstDim.h;

      const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'px',
        format: [firstDim.w, firstDim.h],
        compress: true,
        hotfixes: ['px_scaling'],
      });

      for (let i = 0; i < fileDataUrls.length; i++) {
        if (i > 0) {
          const dim = imageDimensions[i];
          pdf.addPage([dim.w, dim.h], dim.w > dim.h ? 'landscape' : 'portrait');
        }
        const dim = imageDimensions[i];
        // Use SLOW compression mode for better initial quality in the base PDF
        pdf.addImage(fileDataUrls[i], 'JPEG', 0, 0, dim.w, dim.h, undefined, 'SLOW');
        setProgress(62 + Math.round(((i + 1) / fileDataUrls.length) * 13));
        await delay(60);
      }

      setProgress(75);
      await delay(200);

      // ── Phase 3: Compressing ────────────────────────
      setPhase('compressing');
      setProgress(75);

      // Get raw PDF as blob
      const rawPdfBlob = pdf.output('blob');
      const rawSize = rawPdfBlob.size;

      // Simulate compression progress
      for (let p = 75; p <= 95; p += 5) {
        setProgress(p);
        await delay(120);
      }

      // Try to compress the PDF blob using browser-image-compression on individual images
      // and rebuild PDF with compressed images for better results
      let finalBlob: Blob;
      let finalSize: number;

      try {
        // Re-compress each image at balanced quality (60% reduction target) and rebuild PDF
        const compressedPdf = new jsPDF({
          orientation: isLandscape ? 'landscape' : 'portrait',
          unit: 'px',
          format: [firstDim.w, firstDim.h],
          compress: true,
          hotfixes: ['px_scaling'],
        });

        for (let i = 0; i < files.length; i++) {
          const originalFileSizeMB = files[i].size / (1024 * 1024);
          // Target ~40% of original size → achieves ~60% compression while preserving quality
          const targetSizeMB = Math.max(originalFileSizeMB * 0.40, 0.05);

          const compressedFile = await imageCompression(files[i], {
            maxSizeMB: targetSizeMB,
            // Preserve full resolution — do NOT downscale the image
            maxWidthOrHeight: Math.max(imageDimensions[i].w, imageDimensions[i].h) * 2,
            useWebWorker: true,
            fileType: 'image/jpeg',
            // 0.65 = good mid-point: visually sharp, meaningfully smaller
            initialQuality: 0.65,
            alwaysKeepResolution: true,
          });

          const compressedDataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target?.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(compressedFile);
          });

          if (i > 0) {
            const dim = imageDimensions[i];
            compressedPdf.addPage([dim.w, dim.h], dim.w > dim.h ? 'landscape' : 'portrait');
          }
          const dim = imageDimensions[i];
          // SLOW mode = better JPEG encoding quality inside the PDF
          compressedPdf.addImage(compressedDataUrl, 'JPEG', 0, 0, dim.w, dim.h, undefined, 'SLOW');
        }

        finalBlob = compressedPdf.output('blob');
        finalSize = finalBlob.size;

        // If compression somehow made it bigger, fallback to raw
        if (finalSize > rawSize) {
          finalBlob = rawPdfBlob;
          finalSize = rawSize;
        }
      } catch {
        // Fallback to raw PDF
        finalBlob = rawPdfBlob;
        finalSize = rawSize;
      }

      setProgress(100);
      await delay(300);

      // ── Phase 4: Done ───────────────────────────────
      setPhase('done');
      setResult({
        blob: finalBlob,
        originalSize: originalTotalSize,
        compressedSize: finalSize,
      });

    } catch (err) {
      console.error('PDF conversion failed:', err);
      setPhase('error');
      setProgress(0);
    }
  }, []);

  return { phase, progress, result, convert, reset };
};

// Utility: delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Utility: get image dimensions from data URL
const getImageDimensions = (dataUrl: string): Promise<{ w: number; h: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = reject;
    img.src = dataUrl;
  });
};

export default usePdfConverter;
