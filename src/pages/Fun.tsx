import { useState, useEffect } from "react";
import jsPDF from "jspdf";

export default function Fun() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const generatePDF = () => {
    setIsGenerating(true);

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

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const halfWidth = pageWidth / 2;
    const margin = 10;
    const dividerX = halfWidth;

    // Helper function to draw divider line between halves
    const drawDivider = () => {
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.line(dividerX, 0, dividerX, pageHeight);
    };

    // Template function for pages with title and lines above/below
    const addPageTemplate = (
      title: string,
      options: {
        fontSize?: number;
        fontStyle?: "normal" | "bold" | "italic";
        titleColor?: [number, number, number]; // RGB color
        lineColor?: [number, number, number]; // RGB color
        topMargin?: number;
        lineSpacing?: number;
      } = {}
    ) => {
      const {
        fontSize = 16,
        fontStyle = "bold",
        titleColor = [26, 33, 46], // Default #1A212E
        lineColor = [26, 33, 46], // Default #1A212E
        topMargin = 15,
        lineSpacing = 8,
      } = options;

      // Calculate positions
      const lineTopY = topMargin;
      const titleY = lineTopY + lineSpacing + fontSize * 0.35; // Adjust for font baseline
      const lineBottomY = titleY + lineSpacing;

      // Calculate x positions based on which half we're on
      let lineStartX: number;
      let lineEndX: number;
      let titleX: number;

      if (currentHalf === "left") {
        lineStartX = margin;
        lineEndX = dividerX - margin;
        titleX = halfWidth / 2;
      } else {
        lineStartX = dividerX + margin;
        lineEndX = pageWidth - margin;
        titleX = dividerX + halfWidth / 2;
      }

      // Draw line above
      doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
      doc.setLineWidth(0.5);
      doc.line(lineStartX, lineTopY, lineEndX, lineTopY);

      // Add title
      doc.setFontSize(fontSize);
      doc.setFont("times", fontStyle);
      doc.setTextColor(titleColor[0], titleColor[1], titleColor[2]);
      doc.text(title, titleX, titleY, { align: "center" });

      // Draw line below
      doc.line(lineStartX, lineBottomY, lineEndX, lineBottomY);

      // Reset text color to black
      doc.setTextColor(0, 0, 0);

      // Update currentY to be below the template
      currentY = lineBottomY + lineSpacing + 5;
    };

    // Helper function to add content to a half-page
    let currentHalf: "left" | "right" = "left";
    let currentY = margin + 20;

    const addToHalfPage = (
      content: string,
      options: {
        fontSize?: number;
        fontStyle?: "normal" | "bold" | "italic";
        align?: "left" | "center" | "right";
        xOffset?: number;
        lineHeight?: number;
      } = {}
    ) => {
      const {
        fontSize = 12,
        fontStyle = "normal",
        align = "left",
        xOffset = 0,
        lineHeight = 20,
      } = options;

      // Check if we need a new half-page
      if (currentY > pageHeight - margin) {
        if (currentHalf === "left") {
          // Move to right half
          currentHalf = "right";
          currentY = margin + 20;
        } else {
          // Move to next page
          doc.addPage();
          drawDivider();
          currentHalf = "left";
          currentY = margin + 20;
        }
      }

      // Calculate x position based on which half we're on
      let x: number;
      if (currentHalf === "left") {
        x = margin + xOffset;
      } else {
        x = dividerX + margin + xOffset;
      }

      // Set font (using 'times' serif font as closest match to Playfair Display)
      doc.setFontSize(fontSize);
      doc.setFont("times", fontStyle);

      // Add text
      if (align === "center") {
        const halfCenterX =
          currentHalf === "left" ? halfWidth / 2 : dividerX + halfWidth / 2;
        doc.text(content, halfCenterX, currentY, { align: "center" });
      } else {
        doc.text(content, x, currentY, { align });
      }

      currentY += lineHeight;
    };

    // Draw divider on first page
    drawDivider();

    // First page: Left half with "Bye, bye" content, Right half with cover content
    // Start at left half
    currentHalf = "left";
    const leftStartY = (pageHeight * 2) / 5; // Content starts at 2/5 of page

    // Add "Bye, bye" content to left half
    const leftTitleY = leftStartY;
    const leftSubtitleY = leftTitleY + 12;
    const leftLineY1 = leftTitleY - 15;

    // Set color for left half title (#1A212E)
    doc.setTextColor(26, 33, 46);

    // Draw horizontal line above
    doc.setDrawColor(26, 33, 46);
    doc.setLineWidth(0.5);
    const leftLineStartX = margin;
    const leftLineEndX = dividerX - margin;
    doc.line(leftLineStartX, leftLineY1, leftLineEndX, leftLineY1);

    // Title: "Bye, bye ${lastYear}."
    doc.setFontSize(30);
    doc.setFont("times", "bold");
    const leftHalfCenterX = halfWidth / 2;

    // Third line: "Byyeee."
    const leftByeY = leftSubtitleY + 20;
    doc.setFontSize(20);
    doc.setFont("times", "bold");
    doc.text("Byyeee.", leftHalfCenterX, leftByeY, {
      align: "center",
    });

    // Draw horizontal line below
    const leftLineY2Final = leftByeY + 15;
    doc.line(leftLineStartX, leftLineY2Final, leftLineEndX, leftLineY2Final);

    // "Made by Dariah" at bottom of page (12px ≈ 9pt)
    const madeByY = pageHeight - margin - 5; // Bottom with small margin
    doc.setFontSize(9); // 12px equivalent (12px ≈ 9pt)
    doc.setFont("times", "normal");
    doc.setTextColor(0, 0, 0); // Black text
    doc.text("Made by Dariah", leftHalfCenterX, madeByY, {
      align: "center",
    });

    // Now add cover content to right half
    currentHalf = "right";
    const startY = (pageHeight * 2) / 5; // Content starts at 2/5 of page

    // Calculate positions
    const titleY = startY;
    const subtitleY = titleY + 12; // 12mm gap between title and subtitle

    // Horizontal line above text
    const lineY1 = titleY - 15;
    const lineY2 = subtitleY + 4; // Below subtitle

    // Set color for title (#1A212E)
    doc.setTextColor(26, 33, 46); // RGB for #1A212E

    // Draw horizontal line above
    doc.setDrawColor(26, 33, 46);
    doc.setLineWidth(0.5);
    const lineStartX = dividerX + margin;
    const lineEndX = pageWidth - margin;
    doc.line(lineStartX, lineY1, lineEndX, lineY1);

    // Title: "Oh hi there, 2026!"
    doc.setFontSize(30);
    doc.setFont("times", "bold");
    const rightHalfCenterX = dividerX + halfWidth / 2;
    doc.text(`Oh hi there, ${newYear}!`, rightHalfCenterX, titleY, {
      align: "center",
    });

    // Subtitle: "The Reflection and gratitude journal" (70% opacity, font size 14)
    doc.setFontSize(14);
    doc.setFont("times", "normal");
    // Calculate color with 70% opacity (blended with white background)
    // RGB(26, 33, 46) at 70% opacity on white = RGB(95, 100, 109)
    const opacityColorR = Math.round(26 * 0.7 + 255 * 0.3);
    const opacityColorG = Math.round(33 * 0.7 + 255 * 0.3);
    const opacityColorB = Math.round(46 * 0.7 + 255 * 0.3);
    doc.setTextColor(opacityColorR, opacityColorG, opacityColorB);
    doc.text(
      "The Reflection and gratitude journal",
      rightHalfCenterX,
      subtitleY,
      { align: "center" }
    );

    // Draw horizontal line below (matching subtitle opacity)
    doc.setDrawColor(opacityColorR, opacityColorG, opacityColorB);
    doc.line(lineStartX, lineY2, lineEndX, lineY2);

    // Reset text color to black for rest of document
    doc.setTextColor(0, 0, 0);

    // Move to next half-page for prompts (start fresh on next page)
    doc.addPage();
    drawDivider();
    currentHalf = "left";
    currentY = margin + 20;

    // Apply page template with title and lines
    addPageTemplate("MOMENTS OF GRATITUDE", {
      fontSize: 15, // ~20px equivalent
      fontStyle: "normal",
      titleColor: [26, 33, 46], // #1A212E
      lineColor: [26, 33, 46], // #1A212E
      topMargin: 15,
      lineSpacing: 4, // Reduced spacing between lines and title
    });

    // Add the prompt - ensure it fits in current half-page
    const promptText = `Describe the top 3 moments from ${lastYear} which make you feel most grateful.`;

    // Check if we need to move to next half-page before adding prompt
    if (currentY > pageHeight - margin - 60) {
      // Not enough space, move to next half-page
      if (currentHalf === "left") {
        currentHalf = "right";
        currentY = margin + 20;
      } else {
        doc.addPage();
        drawDivider();
        currentHalf = "left";
        currentY = margin + 20;
      }
    }

    // Calculate available width for text in current half
    const textWidth =
      currentHalf === "left"
        ? dividerX - 2 * margin
        : pageWidth - dividerX - 2 * margin;
    const textX = currentHalf === "left" ? margin : dividerX + margin;

    // Set font for prompt
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.setTextColor(0, 0, 0);

    // Split text into lines that fit within the half-page width
    const splitText = doc.splitTextToSize(promptText, textWidth);

    // Add each line of text
    splitText.forEach((line: string) => {
      // Check if we still have space
      if (currentY > pageHeight - margin - 20) {
        // Move to next half-page
        if (currentHalf === "left") {
          currentHalf = "right";
          currentY = margin + 20;
        } else {
          doc.addPage();
          drawDivider();
          currentHalf = "left";
          currentY = margin + 20;
        }
      }
      doc.text(line, textX, currentY, { align: "left" });
      currentY += 6; // Line height for 12pt font
    });

    // Add spacing after prompt
    currentY += 2;

    // Draw a light gray rounded rectangle as a placeholder for writing
    const rectStartX = currentHalf === "left" ? margin : dividerX + margin;
    const rectWidth =
      currentHalf === "left"
        ? dividerX - 2 * margin
        : pageWidth - dividerX - 2 * margin;
    const rectStartY = currentY;
    const rectHeight = pageHeight - rectStartY - margin - 10; // Fill remaining space with some margin
    const cornerRadius = 3; // Small rounded corners

    // Set fill color to light gray
    doc.setFillColor(240, 240, 240); // Light gray

    // Draw rounded rectangle using a workaround: main rectangle + 4 corner circles
    const x = rectStartX;
    const y = rectStartY;
    const w = rectWidth;
    const h = rectHeight;
    const r = cornerRadius;

    // Draw main rectangle (will be partially covered by corner circles)
    doc.rect(x + r, y, w - 2 * r, h, "F"); // Top and bottom strips
    doc.rect(x, y + r, w, h - 2 * r, "F"); // Left and right strips

    // Draw 4 corner circles to create rounded effect
    doc.circle(x + r, y + r, r, "F"); // Top-left
    doc.circle(x + w - r, y + r, r, "F"); // Top-right
    doc.circle(x + r, y + h - r, r, "F"); // Bottom-left
    doc.circle(x + w - r, y + h - r, r, "F"); // Bottom-right

    // New page with title
    // Ensure we're on a fresh half-page
    if (currentHalf === "left") {
      // Move to right half on same page
      currentHalf = "right";
      currentY = margin + 20;
    } else {
      // Move to next page, left half
      doc.addPage();
      drawDivider();
      currentHalf = "left";
      currentY = margin + 20;
    }

    // Apply page template with title
    addPageTemplate(`${newYear} WHOOP WHOOP!`, {
      fontSize: 15, // ~20px equivalent
      fontStyle: "normal",
      titleColor: [26, 33, 46], // #1A212E
      lineColor: [26, 33, 46], // #1A212E
      topMargin: 15,
      lineSpacing: 4, // Reduced spacing between lines and title
    });

    // New page with title
    // Ensure we're on a fresh half-page
    if (currentHalf === "left") {
      // Move to right half on same page
      currentHalf = "right";
      currentY = margin + 20;
    } else {
      // Move to next page, left half
      doc.addPage();
      drawDivider();
      currentHalf = "left";
      currentY = margin + 20;
    }

    // Apply page template with title
    addPageTemplate("THE NEW YEAR IS HERE!", {
      fontSize: 15, // ~20px equivalent
      fontStyle: "normal",
      titleColor: [26, 33, 46], // #1A212E
      lineColor: [26, 33, 46], // #1A212E
      topMargin: 15,
      lineSpacing: 4, // Reduced spacing between lines and title
    });

    // New page with title
    // Ensure we're on a fresh half-page
    if (currentHalf === "left") {
      // Move to right half on same page
      currentHalf = "right";
      currentY = margin + 20;
    } else {
      // Move to next page, left half
      doc.addPage();
      drawDivider();
      currentHalf = "left";
      currentY = margin + 20;
    }

    // Apply page template with title
    addPageTemplate("LOVE THE PEOPLE.", {
      fontSize: 15, // ~20px equivalent
      fontStyle: "normal",
      titleColor: [26, 33, 46], // #1A212E
      lineColor: [26, 33, 46], // #1A212E
      topMargin: 15,
      lineSpacing: 4, // Reduced spacing between lines and title
    });

    // New page with title
    // Ensure we're on a fresh half-page
    if (currentHalf === "left") {
      // Move to right half on same page
      currentHalf = "right";
      currentY = margin + 20;
    } else {
      // Move to next page, left half
      doc.addPage();
      drawDivider();
      currentHalf = "left";
      currentY = margin + 20;
    }

    // Apply page template with title
    addPageTemplate("YOU ROCK!", {
      fontSize: 15, // ~20px equivalent
      fontStyle: "normal",
      titleColor: [26, 33, 46], // #1A212E
      lineColor: [26, 33, 46], // #1A212E
      topMargin: 15,
      lineSpacing: 4, // Reduced spacing between lines and title
    });

    // New page with title
    // Ensure we're on a fresh half-page
    if (currentHalf === "left") {
      // Move to right half on same page
      currentHalf = "right";
      currentY = margin + 20;
    } else {
      // Move to next page, left half
      doc.addPage();
      drawDivider();
      currentHalf = "left";
      currentY = margin + 20;
    }

    // Apply page template with title
    addPageTemplate("YOU DID IT!", {
      fontSize: 15, // ~20px equivalent
      fontStyle: "normal",
      titleColor: [26, 33, 46], // #1A212E
      lineColor: [26, 33, 46], // #1A212E
      topMargin: 15,
      lineSpacing: 4, // Reduced spacing between lines and title
    });

    // Last half-page: Cover
    // Ensure we're on a fresh half-page
    if (currentHalf === "left") {
      // Move to right half on same page
      currentHalf = "right";
      currentY = margin + 20;
    } else {
      // Move to next page, left half
      doc.addPage();
      drawDivider();
      currentHalf = "left";
      currentY = margin + 20;
    }

    // Generate PDF as blob and create object URL for browser preview
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);

    // Also save the PDF for download
    doc.save(`reflection-${lastYear}-${newYear}.pdf`);
    setIsGenerating(false);
  };

  // Clean up object URL when component unmounts or PDF changes
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  return (
    <div className="mt-40">
      <h1 className="font-bold leading-tight max-w-md mb-3">
        End of the year reflection
      </h1>
      <p className="mt-5 max-w-2xl">
        Take a moment to reflect on the past year with these thoughtful prompts.
        Click the button below to generate a PDF with reflection questions that
        will help you process your experiences, celebrate your achievements, and
        set intentions for the year ahead.
      </p>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold mb-2">Printing Instructions:</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Double sided</li>
          <li>Flip on the short edge</li>
          <li>Landscape orientation</li>
          <li>Scale to fit</li>
        </ul>
      </div>
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className="mt-8 px-6 py-3 bg-purple-link text-white rounded hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? "Generating PDF..." : "Generate PDF"}
      </button>
      {pdfUrl && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">PDF Preview</h2>
          <p className="text-sm text-gray-600 mb-2">
            Refresh this page and click "Generate PDF" again to see your
            changes.
          </p>
          <iframe
            src={pdfUrl}
            className="w-full border border-gray-300 rounded"
            style={{ height: "800px" }}
            title="PDF Preview"
          />
        </div>
      )}
    </div>
  );
}
