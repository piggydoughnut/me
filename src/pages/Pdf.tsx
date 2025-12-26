import { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import { WindsorRegularBase64 } from "../fonts/windsor";
import { notifyTelegramDownload } from "../utils/telegramNotification";

export default function Pdf() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const pdfBlobRef = useRef<Blob | null>(null);

  useEffect(() => {
    const generatePDF = async () => {
      try {
        // Calculate years based on current month
        const now = new Date();
        const currentMonth = now.getMonth(); // 0-11 (0 = January, 11 = December)
        const currentYear = now.getFullYear();

        let newYear: number;
        let lastYear: number;

        if (currentMonth === 11) {
          // December
          newYear = currentYear + 1;
          lastYear = currentYear;
        } else if (currentMonth === 0) {
          // January
          newYear = currentYear;
          lastYear = currentYear - 1;
        } else {
          // For other months, assume we're reflecting on current year
          newYear = currentYear + 1;
          lastYear = currentYear;
        }

        // Create A5 booklet in landscape (210mm x 148mm)
        const doc = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a5",
        });

        // Set PDF metadata
        doc.setProperties({
          title: `Reflection and Gratitude Journal ${lastYear}/${newYear}`,
          subject: "Yearly Reflection Journal",
          author: "A Moment Between Years",
          keywords: "reflection, gratitude, journal, yearly check-in",
          creator: "A Moment Between Years",
        });

        // Load fonts
        let fontName = "times"; // Default fallback font
        let titleFontName = "times"; // Font for page titles

        // Try to load Windsor font for titles
        try {
          if (WindsorRegularBase64 && WindsorRegularBase64.length > 0) {
            doc.addFileToVFS("Windsor-Regular.ttf", WindsorRegularBase64);
            doc.addFont("Windsor-Regular.ttf", "Windsor", "normal");
            titleFontName = "Windsor";
            console.log("✅ Windsor font loaded successfully");
          } else {
            console.warn(
              "⚠️ Windsor font not available, using Times as fallback"
            );
          }
        } catch (error) {
          console.warn(
            "⚠️ Error loading Windsor font, using Times as fallback:",
            error
          );
        }

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const halfWidth = pageWidth / 2;
        const margin = 10;
        const dividerX = halfWidth;

        // Helper function to draw divider line between halves
        const drawDivider = () => {
          doc.setDrawColor(200, 200, 200);
          doc.setLineWidth(0.2);
          doc.line(dividerX, 0, dividerX, pageHeight);
        };

        // Helper function to draw dot pattern in a rounded rectangle area
        const drawDotPattern = (x: number, y: number, w: number, h: number) => {
          // Draw dot pattern (no border)
          const dotSpacing = 4; // Space between dots (4mm)
          const dotRadius = 0.15; // Small dot radius (half the original size)
          doc.setFillColor(170, 170, 170); // Medium gray dots (darker than before)

          // Align dots with text - start at same x position as text (x), with small top padding
          // Move 4px (≈1.1mm) to the right
          const startX = x + 1.1; // Align with text start position + 4px offset
          const startY = y + 2; // Small padding from top
          const endX = x + w; // Full width
          const endY = y + h - 2; // Small padding from bottom

          // Draw dots in a grid pattern (extend to include one more line)
          for (
            let dotY = startY;
            dotY <= endY + dotSpacing;
            dotY += dotSpacing
          ) {
            for (let dotX = startX; dotX < endX; dotX += dotSpacing) {
              doc.circle(dotX, dotY, dotRadius, "F");
            }
          }
        };

        // Track page numbers for booklet
        // Start from 1 (first two pages are not numbered, so first numbered page will be "1")
        let pageNumber = 1;

        // Helper function to add page number at bottom of current half-page
        const addPageNumber = () => {
          const pageNumY = pageHeight - margin + 2; // Lower position (moved down by 5mm)
          let pageNumX: number;

          // For double-sided printing: left pages get number on left, right pages on right
          // But since we're doing half-pages, we'll center them in each half
          if (currentHalf === "left") {
            pageNumX = halfWidth / 2; // Center of left half
          } else {
            pageNumX = dividerX + halfWidth / 2; // Center of right half
          }

          // Map page numbers: 2 -> 6, 3 -> 5, 4 -> 2, 5 -> 3, 6 -> 4
          let displayNumber = pageNumber;
          if (pageNumber === 2) {
            displayNumber = 6;
          } else if (pageNumber === 3) {
            displayNumber = 5;
          } else if (pageNumber === 4) {
            displayNumber = 2;
          } else if (pageNumber === 5) {
            displayNumber = 3;
          } else if (pageNumber === 6) {
            displayNumber = 4;
          }

          doc.setFontSize(8);
          doc.setFont(fontName, "normal");
          doc.setTextColor(150, 150, 150); // Light gray for page numbers
          doc.text(displayNumber.toString(), pageNumX, pageNumY, {
            align: "center",
          });
          pageNumber++;
        };

        // Template function for pages with title (lines removed)
        const addPageTemplate = (
          title: string,
          options: {
            fontSize?: number;
            fontStyle?: "normal" | "bold" | "italic";
            titleColor?: [number, number, number]; // RGB color
            topMargin?: number;
            lineSpacing?: number;
          } = {}
        ) => {
          const {
            fontSize = 16,
            fontStyle = "bold",
            titleColor = [26, 33, 46], // Default #1A212E
            topMargin = 15,
            lineSpacing = 8,
          } = options;

          // Calculate positions (lines removed, so title starts at topMargin)
          const titleY = topMargin + fontSize * 0.35; // Adjust for font baseline

          // Calculate x position based on which half we're on
          let titleX: number;

          if (currentHalf === "left") {
            titleX = margin; // Left align
          } else {
            titleX = dividerX + margin; // Left align
          }

          // Add title (lines around title removed) - use Windsor font
          doc.setFontSize(fontSize);
          doc.setFont(titleFontName, fontStyle);
          doc.setTextColor(titleColor[0], titleColor[1], titleColor[2]);
          doc.text(title, titleX, titleY, { align: "left" });

          // Reset text color to black
          doc.setTextColor(0, 0, 0);

          // Update currentY to be below the title
          currentY = titleY + lineSpacing + 5;
        };

        // Helper function to move to next half-page
        const moveToNextHalfPage = () => {
          if (currentHalf === "left") {
            currentHalf = "right";
            currentY = margin + 20;
          } else {
            doc.addPage();
            drawDivider();
            currentHalf = "left";
            currentY = margin + 20;
          }
        };

        // Helper function to get current half-page dimensions
        const getCurrentHalfDimensions = () => {
          const textWidth =
            currentHalf === "left"
              ? dividerX - 2 * margin
              : pageWidth - dividerX - 2 * margin;
          const textX = currentHalf === "left" ? margin : dividerX + margin;
          const rectX = currentHalf === "left" ? margin : dividerX + margin;
          const rectWidth =
            currentHalf === "left"
              ? dividerX - 2 * margin
              : pageWidth - dividerX - 2 * margin;
          return { textWidth, textX, rectX, rectWidth };
        };

        // Helper function to check and move to next half-page if needed
        const ensureSpace = (requiredSpace: number = 60) => {
          if (currentY > pageHeight - margin - requiredSpace) {
            moveToNextHalfPage();
          }
        };

        // Helper function to add prompt text
        const addPromptText = (promptText: string) => {
          ensureSpace(60);

          const { textWidth, textX } = getCurrentHalfDimensions();

          // Set font for prompt
          doc.setFontSize(10);
          doc.setFont(fontName, "normal");
          doc.setTextColor(0, 0, 0);

          // Split text into lines that fit within the half-page width
          const splitText = doc.splitTextToSize(promptText, textWidth);

          // Add each line of text
          splitText.forEach((line: string) => {
            if (currentY > pageHeight - margin - 20) {
              moveToNextHalfPage();
            }
            doc.text(line, textX, currentY, { align: "left" });
            currentY += 6;
          });

          // Add spacing after prompt
          currentY += 1;
        };

        // Helper function to add dot pattern section (fills remaining space)
        const addDotPatternSection = () => {
          const { rectX, rectWidth } = getCurrentHalfDimensions();
          const rectStartY = currentY - 2;
          const rectHeight = pageHeight - rectStartY - margin - 10;
          drawDotPattern(rectX, rectStartY, rectWidth, rectHeight);
        };

        // Helper function to add a complete single-section page
        const addSingleSectionPage = (
          title: string,
          promptText: string,
          titleOptions?: {
            fontSize?: number;
            fontStyle?: "normal" | "bold" | "italic";
            titleColor?: [number, number, number];
            topMargin?: number;
            lineSpacing?: number;
          }
        ) => {
          moveToNextHalfPage();
          addPageTemplate(
            title,
            titleOptions || { fontSize: 12, fontStyle: "bold" }
          );
          addPromptText(promptText);
          addDotPatternSection();
          addPageNumber();
        };

        // Helper function to add a two-section page
        const addTwoSectionPage = (
          title: string,
          prompt1: string,
          prompt2: string,
          titleOptions?: {
            fontSize?: number;
            fontStyle?: "normal" | "bold" | "italic";
            titleColor?: [number, number, number];
            topMargin?: number;
            lineSpacing?: number;
          }
        ) => {
          moveToNextHalfPage();
          addPageTemplate(
            title,
            titleOptions || { fontSize: 12, fontStyle: "bold" }
          );

          // First section: "How would you like to feel in <newYear>?"
          ensureSpace(60);

          // Calculate available width for text in current half
          const { textWidth, textX } = getCurrentHalfDimensions();

          // Set font for prompt
          doc.setFontSize(10);
          doc.setFont(fontName, "normal");
          doc.setTextColor(0, 0, 0);

          // Split text into lines that fit within the half-page width
          const splitText1 = doc.splitTextToSize(prompt1, textWidth);

          // Add each line of text
          splitText1.forEach((line: string) => {
            if (currentY > pageHeight - margin - 20) {
              moveToNextHalfPage();
            }
            doc.text(line, textX, currentY, { align: "left" });
            currentY += 6;
          });

          // Add spacing after first prompt
          currentY += 1;
          const rectStartY1 = currentY - 2;

          // Second section: "Your <newYear> Bucket List" - add prompt first
          // Calculate how much space the second prompt will take
          const splitText2 = doc.splitTextToSize(prompt2, textWidth);
          const prompt2Height = splitText2.length * 6 + 1; // Height of prompt text + spacing

          // Calculate available space for both rectangles
          // Layout: first rectangle + small spacing + second prompt + second rectangle
          const spacingAfterFirstRect = 2; // Small spacing after first rectangle
          const availableSpace = pageHeight - rectStartY1 - margin - 10;
          const totalContentHeight = prompt2Height + spacingAfterFirstRect;
          const rectHeightEach = (availableSpace - totalContentHeight) / 2;

          // Draw gray rounded rectangle for first section
          const { rectX, rectWidth } = getCurrentHalfDimensions();
          drawDotPattern(rectX, rectStartY1, rectWidth, rectHeightEach);

          // Move to second section - start right after first rectangle
          currentY = rectStartY1 + rectHeightEach + 8; // Small spacing after first rectangle
          currentY += 2.1; // Move second title 6px lower (≈2.1mm, net 6px from original)

          // Add second prompt text
          doc.setFontSize(10);
          doc.setFont(fontName, "normal");
          doc.setTextColor(0, 0, 0);

          splitText2.forEach((line: string) => {
            doc.text(line, textX, currentY, { align: "left" });
            currentY += 6;
          });

          // Add spacing after second prompt
          currentY += 1;

          // Draw gray rounded rectangle for second section
          const rectStartY2 = currentY - 2;
          // Ensure same bottom margin as single-section rectangles
          const rectHeight2 = pageHeight - rectStartY2 - margin - 10;

          drawDotPattern(rectX, rectStartY2, rectWidth, rectHeight2);

          // Add page number for this half-page
          addPageNumber();
        };

        // Helper function to add content to a half-page
        let currentHalf: "left" | "right" = "left";
        let currentY = margin + 20;

        // Draw divider on first page
        drawDivider();

        // First page: Left half with "Bye, bye" content, Right half with cover content
        // Start at left half
        currentHalf = "left";

        // Set color for left half title (#1A212E)
        doc.setTextColor(26, 33, 46);

        // Title: "Bye, bye ${lastYear}."
        doc.setFontSize(20);
        doc.setFont(fontName, "normal");
        const leftHalfCenterX = halfWidth / 2;

        // "Made by Dariah" at bottom of left half-page (12px ≈ 9pt)
        const madeByY = pageHeight - margin - 5; // Bottom with small margin
        doc.setFontSize(9); // 12px equivalent (12px ≈ 9pt)
        doc.setFont(fontName, "normal");
        doc.setTextColor(0, 0, 0); // Black text
        doc.text("Made by Dariah", leftHalfCenterX, madeByY, {
          align: "center",
        });

        // Now add cover content to right half
        currentHalf = "right";
        const startY = (pageHeight * 2) / 5; // Content starts at 2/5 of page

        // Calculate positions
        const titleY = startY;

        // Set color for title (#1A212E)
        doc.setTextColor(26, 33, 46); // RGB for #1A212E

        // Title: "A Moment Between Years" (larger, full opacity, bold, Windsor font)
        doc.setFontSize(20);
        doc.setFont(titleFontName, "bold");
        const rightHalfCenterX = dividerX + halfWidth / 2;
        doc.setTextColor(26, 33, 46); // Full opacity
        doc.text("A Moment Between Years", rightHalfCenterX, titleY, {
          align: "center",
        });

        // Subtitle: "A yearly check-in" (smaller, 70% opacity)
        const subtitleY = titleY + 8; // Position below title
        doc.setFontSize(14);
        doc.setFont(fontName, "normal");
        // Calculate color with 70% opacity (blended with white background)
        const opacityColorR = Math.round(26 * 0.7 + 255 * 0.3);
        const opacityColorG = Math.round(33 * 0.7 + 255 * 0.3);
        const opacityColorB = Math.round(46 * 0.7 + 255 * 0.3);
        doc.setTextColor(opacityColorR, opacityColorG, opacityColorB);
        doc.text("A yearly check-in", rightHalfCenterX, subtitleY, {
          align: "center",
        });

        // Year text at bottom of page: "${lastYear} / ${newYear}" (smaller, 70% opacity, centered)
        const bottomY = pageHeight - margin - 5; // Position near bottom with small margin
        doc.setFontSize(14);
        doc.setFont(fontName, "normal");
        // Use same 70% opacity color already calculated above
        doc.setTextColor(opacityColorR, opacityColorG, opacityColorB);
        doc.text(`${lastYear} / ${newYear}`, rightHalfCenterX, bottomY, {
          align: "center",
        });

        // Reset text color to black for rest of document
        doc.setTextColor(0, 0, 0);

        // Move to next half-page for prompts (start fresh on next page)
        // Note: First two pages (cover) are not numbered
        doc.addPage();
        drawDivider();
        currentHalf = "left";
        currentY = margin + 20;

        // First content page: MOMENTS OF GRATITUDE (already on new page, left half)
        addPageTemplate("MOMENTS OF GRATITUDE", {
          fontSize: 12,
          fontStyle: "bold",
          titleColor: [26, 33, 46],
          topMargin: 15,
          lineSpacing: 4,
        });
        addPromptText(
          `Describe the top 3 moments from ${lastYear} which make you feel most grateful.`
        );
        addDotPatternSection();
        addPageNumber();

        // Generate remaining content pages using helper functions

        addTwoSectionPage(
          `${newYear}, WELCOME!`,
          `How would you like to feel in ${newYear}?`,
          `Your ${newYear} Bucket List`,
          {
            fontSize: 12,
            fontStyle: "bold",
            titleColor: [26, 33, 46],
            topMargin: 15,
            lineSpacing: 4,
          }
        );

        addTwoSectionPage(
          "THE NEW YEAR IS HERE",
          `Summarize your ${lastYear} in one word or phrase.`,
          `Create a tagline for ${newYear} (e.g growth, self-love, etc.)`,
          {
            fontSize: 12,
            fontStyle: "bold",
            titleColor: [26, 33, 46],
            topMargin: 15,
            lineSpacing: 4,
          }
        );

        addSingleSectionPage(
          "LOVE THE PEOPLE.",
          `Which 3 people in your life you have been most grateful for in ${lastYear} and why?`,
          {
            fontSize: 12,
            fontStyle: "bold",
            titleColor: [26, 33, 46],
            topMargin: 15,
            lineSpacing: 4,
          }
        );

        addSingleSectionPage(
          "YOU MADE IT HAPPEN",
          `Which are your 3 biggest achievements from ${lastYear}?`,
          {
            fontSize: 12,
            fontStyle: "bold",
            titleColor: [26, 33, 46],
            topMargin: 15,
            lineSpacing: 4,
          }
        );

        addSingleSectionPage(
          "YOU GOT THROUGH IT",
          `What were your 3 biggest challenges in ${lastYear}?`,
          {
            fontSize: 12,
            fontStyle: "bold",
            titleColor: [26, 33, 46],
            topMargin: 15,
            lineSpacing: 4,
          }
        );

        // Generate PDF as blob and create object URL for browser preview
        const pdfBlob = doc.output("blob");
        pdfBlobRef.current = pdfBlob;
        const url = URL.createObjectURL(pdfBlob);
        setPdfUrl(url);
        setIsGenerating(false);
      } catch (error) {
        console.error("Error generating PDF:", error);
        setIsGenerating(false);
      }
    };

    generatePDF();
  }, []);

  // Clean up object URL when component unmounts
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  if (isGenerating) {
    return (
      <div className="mt-40 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Generating PDF...</p>
        </div>
      </div>
    );
  }

  const handleDownload = async () => {
    if (!pdfBlobRef.current) return;

    try {
      const fileName = `Reflection-and-Gratitude-Journal-${new Date().getFullYear()}.pdf`;
      
      // Create download link
      const url = URL.createObjectURL(pdfBlobRef.current);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Send Telegram notification (don't await to avoid blocking)
      notifyTelegramDownload(fileName).catch((error) => {
        console.error("Notification error (non-blocking):", error);
      });
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  if (!pdfUrl) {
    return (
      <div className="mt-40 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">Error generating PDF</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-purple-link text-white rounded hover:bg-purple-700 transition-colors duration-300 shadow-lg"
        >
          Download PDF
        </button>
      </div>
      <iframe
        src={pdfUrl}
        className="w-full h-full border-0"
        title="PDF Preview"
      />
    </div>
  );
}
