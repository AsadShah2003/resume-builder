"use client";
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { HiOutlineCloudDownload, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { pdf } from "@react-pdf/renderer";
import { ImSpinner3 } from "react-icons/im";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
}

import { ReactPDFTemplate1 } from "./ReactPDFTemplates/Template1";
import { ReactPDFTemplate2 } from "./ReactPDFTemplates/Template2";
import useWindowWidth from "@/app/hooks/useWindowWidth";

const getTemplateDocument = (activeTemplate: string, data: any, templateColor: string) => {
  switch (activeTemplate) {
    case "template1":
      return <ReactPDFTemplate1 data={data} themeColor={templateColor} />;
    case "template2":
      return <ReactPDFTemplate2 data={data} themeColor={templateColor} />;
    default:
      return <ReactPDFTemplate1 data={data} themeColor={templateColor} />;
  }
};

const MobileResumePreview = () => {
  const {
    education,
    workExperience,
    skills,
    socialLinks,
    personalProfile,
    languages,
    activeTemplate,
    personalDetails,
    templateColor,
    resumeFontSize,
    setActiveTab,
  } = useResumeStore();

  const windowWidth = useWindowWidth();
  const [urls, setUrls] = useState<[string | null, string | null]>([null, null]);
  const [frontLayer, setFrontLayer] = useState<0 | 1>(0);
  const [isFading, setIsFading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const backLayer = frontLayer === 0 ? 1 : 0;
  const isInitialRender = useRef(true);
  const blobUrls = useRef<string[]>([]);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Measure the actual container width (not window width)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    setContainerWidth(el.clientWidth);
    return () => observer.disconnect();
  }, []);

  const dataSnapshot = useMemo(() => ({
    education,
    workExperience,
    skills,
    socialLinks,
    personalProfile,
    languages,
    personalDetails,
    activeTemplate,
    templateColor,
    resumeFontSize,
  }), [
    education,
    workExperience,
    skills,
    socialLinks,
    personalProfile,
    languages,
    personalDetails,
    activeTemplate,
    templateColor,
    resumeFontSize,
  ]);

  const backLayerRef = useRef(backLayer);
  useEffect(() => {
    backLayerRef.current = backLayer;
  }, [backLayer]);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      setIsGenerating(true);
      setPdfError(false);
      try {
        const doc = getTemplateDocument(activeTemplate, {
          education,
          workExperience,
          skills,
          socialLinks,
          personalProfile,
          languages,
          personalDetails,
          resumeFontSize,
        }, templateColor);

        const blob = await pdf(doc).toBlob();
        const newUrl = URL.createObjectURL(blob);
        blobUrls.current.push(newUrl);

        if (isInitialRender.current) {
          setUrls([newUrl, newUrl]);
          isInitialRender.current = false;
          setIsGenerating(false);
        } else {
          setUrls((prev) => {
            const next = [...prev] as [string | null, string | null];
            next[backLayerRef.current] = newUrl;
            return next;
          });
        }
      } catch (error) {
        console.error("Error generating PDF:", error);
        setIsGenerating(false);
        setPdfError(true);
      }
    }, 500);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [dataSnapshot]);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    if (pageNumber > numPages) {
      setPageNumber(numPages);
    }
  };

  const handlePageRenderSuccess = useCallback((layer: 0 | 1) => {
    if (isInitialRender.current) return;
    
    if (layer === backLayerRef.current && urls[layer]) {
      setIsFading(true);
      
      setTimeout(() => {
        setFrontLayer(layer);
        setIsFading(false);
        setIsGenerating(false);

        while (blobUrls.current.length > 2) {
          const old = blobUrls.current.shift();
          if (old) URL.revokeObjectURL(old);
        }
      }, 300);
    }
  }, [urls]);

  useEffect(() => {
    return () => {
      blobUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 1160) {
      setActiveTab("Editor");
    }
  }, [windowWidth, setActiveTab]);

  const handleDownload = () => {
    const currentUrl = urls[frontLayer];
    if (currentUrl) {
      const link = document.createElement("a");
      link.href = currentUrl;
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const hasContent = urls[0] !== null;

  const previousPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const nextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));

  return (
    <main className={`mx-auto h-[100vh] overflow-hidden w-full flex bl:hidden flex-col relative bg-[#98A2AE]`}>
      {/* Preview Area */}
      <div ref={containerRef} className="w-full flex-1 relative flex justify-center items-center">
        {pdfError ? (
          <div className="flex flex-col items-center justify-center text-white h-full px-4 text-center">
            <div className="bg-red-500/20 p-4 rounded-full mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <span className="text-lg font-medium mb-2">Preview Failed</span>
            <span className="text-sm text-[#D1D5DB] max-w-[280px]">We couldn't generate the PDF. This usually happens on mobile networks if custom fonts fail to load. Please try again.</span>
          </div>
        ) : hasContent ? (
          <div className="relative h-full w-full flex justify-center items-start overflow-auto py-2">
            {/* Layer 0 */}
            <div
              className="absolute shadow-2xl rounded-sm bg-white"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                opacity: frontLayer === 0 && isFading ? 0 : 1,
                zIndex: frontLayer === 0 ? 2 : 1,
                transition: frontLayer === 0 && isFading ? "opacity 0.3s ease-in-out" : "none",
                pointerEvents: frontLayer === 0 ? "auto" : "none",
              }}
            >
              {urls[0] && (
                <Document
                  file={urls[0]}
                  onLoadSuccess={handleDocumentLoadSuccess}
                  loading={null}
                >
                  <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    onRenderSuccess={() => handlePageRenderSuccess(0)}
                    width={containerWidth ? Math.min(containerWidth - 32, 600) : 350}
                  />
                </Document>
              )}
            </div>
            
            {/* Layer 1 */}
            <div
              className="absolute shadow-2xl rounded-sm bg-white"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                opacity: frontLayer === 1 && isFading ? 0 : 1,
                zIndex: frontLayer === 1 ? 2 : 1,
                transition: frontLayer === 1 && isFading ? "opacity 0.3s ease-in-out" : "none",
                pointerEvents: frontLayer === 1 ? "auto" : "none",
              }}
            >
              {urls[1] && (
                <Document
                  file={urls[1]}
                  onLoadSuccess={handleDocumentLoadSuccess}
                  loading={null}
                >
                  <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    onRenderSuccess={() => handlePageRenderSuccess(1)}
                    width={containerWidth ? Math.min(containerWidth - 32, 600) : 350}
                  />
                </Document>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-white h-full">
            <ImSpinner3 size={40} className="animate-spin mb-4" />
            <span>Generating Preview...</span>
          </div>
        )}
      </div>

      {/* Floating compact toolbar */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 bg-black/70 backdrop-blur-md rounded-full px-3 py-2 shadow-xl">
        <button
          onClick={previousPage}
          disabled={pageNumber <= 1}
          className="p-1 text-white disabled:opacity-40 transition-colors"
        >
          <HiChevronLeft size={18} />
        </button>
        <span className="text-white text-xs font-medium whitespace-nowrap">
          {pageNumber} / {numPages}
        </span>
        <button
          onClick={nextPage}
          disabled={pageNumber >= numPages}
          className="p-1 text-white disabled:opacity-40 transition-colors"
        >
          <HiChevronRight size={18} />
        </button>
        <div className="w-px h-5 bg-white/30" />
        <button
          onClick={handleDownload}
          disabled={!urls[frontLayer] || isGenerating}
          className={`p-1.5 rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-400 ${
            !urls[frontLayer] || isGenerating ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          {isGenerating ? (
            <ImSpinner3 size={16} className="animate-spin" />
          ) : (
            <HiOutlineCloudDownload size={16} />
          )}
        </button>
      </div>
    </main>
  );
};

export default MobileResumePreview;
