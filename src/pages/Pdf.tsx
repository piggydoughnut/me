import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { WindsorRegularBase64 } from "../fonts/windsor";

export default function Pdf() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

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

        // Horizontal line above text
        // const lineY1 = titleY - 15;
        // const lineY2 = subtitleY + 4; // Below subtitle

        // Set color for title (#1A212E)
        doc.setTextColor(26, 33, 46); // RGB for #1A212E

        // Draw horizontal line above
        doc.setDrawColor(26, 33, 46);
        // doc.setLineWidth(0.5);
        // const lineStartX = dividerX + margin;
        // const lineEndX = pageWidth - margin;
        // doc.line(lineStartX, lineY1, lineEndX, lineY1);

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

        // Draw horizontal line below (matching subtitle opacity)
        // doc.setDrawColor(opacityColorR, opacityColorG, opacityColorB);
        // doc.line(lineStartX, lineY2, lineEndX, lineY2);

        // Reset text color to black for rest of document
        doc.setTextColor(0, 0, 0);

        // Move to next half-page for prompts (start fresh on next page)
        // Note: First two pages (cover) are not numbered
        doc.addPage();
        drawDivider();
        currentHalf = "left";
        currentY = margin + 20;

        // Apply page template with title
        addPageTemplate("MOMENTS OF GRATITUDE", {
          fontSize: 12, // ~20px equivalent
          fontStyle: "bold",
          titleColor: [26, 33, 46], // #1A212E
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
        // Set font size to 10pt, which is approximately 13.3 pixels (1pt ≈ 1.333px)
        doc.setFontSize(10);
        doc.setFont(fontName, "normal");
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
        currentY += 1;

        // Draw a light gray rounded rectangle as a placeholder for writing
        const rectStartX = currentHalf === "left" ? margin : dividerX + margin;
        const rectWidth =
          currentHalf === "left"
            ? dividerX - 2 * margin
            : pageWidth - dividerX - 2 * margin;
        const rectStartY = currentY - 2;
        const rectHeight = pageHeight - rectStartY - margin - 10; // Fill remaining space with some margin
        const cornerRadius = 2; // Small rounded corners

        // Draw dot pattern in rounded rectangle
        const x = rectStartX;
        const y = rectStartY;
        const w = rectWidth;
        const h = rectHeight;

        drawDotPattern(x, y, w, h);

        // Add page number for this half-page
        addPageNumber();

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
        addPageTemplate(`${newYear}, WELCOME!`, {
          fontSize: 12,
          fontStyle: "bold",
          titleColor: [26, 33, 46], // #1A212E
          topMargin: 15,
          lineSpacing: 4, // Reduced spacing between lines and title
        });

        // First section: "How would you like to feel in <newYear>?"
        const promptText1 = `How would you like to feel in ${newYear}?`;

        // Check if we need to move to next half-page before adding prompt
        if (currentY > pageHeight - margin - 60) {
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
        const textWidth1 =
          currentHalf === "left"
            ? dividerX - 2 * margin
            : pageWidth - dividerX - 2 * margin;
        const textX1 = currentHalf === "left" ? margin : dividerX + margin;

        // Set font for prompt
        doc.setFontSize(10);
        doc.setFont(fontName, "normal");
        doc.setTextColor(0, 0, 0);

        // Split text into lines that fit within the half-page width
        const splitText1 = doc.splitTextToSize(promptText1, textWidth1);

        // Add each line of text
        splitText1.forEach((line: string) => {
          if (currentY > pageHeight - margin - 20) {
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
          doc.text(line, textX1, currentY, { align: "left" });
          currentY += 6;
        });

        // Add spacing after first prompt
        currentY += 1;
        const rectStartY1 = currentY - 2;

        // Second section: "Your <newYear> Bucket List" - add prompt first
        const promptText2 = `Your ${newYear} Bucket List`;

        // Calculate how much space the second prompt will take
        const textWidth2 =
          currentHalf === "left"
            ? dividerX - 2 * margin
            : pageWidth - dividerX - 2 * margin;
        const splitText2 = doc.splitTextToSize(promptText2, textWidth2);
        const prompt2Height = splitText2.length * 6 + 1; // Height of prompt text + spacing

        // Calculate available space for both rectangles
        // Layout: first rectangle + small spacing + second prompt + second rectangle
        const spacingAfterFirstRect = 2; // Small spacing after first rectangle
        const availableSpace = pageHeight - rectStartY1 - margin - 10;
        const totalContentHeight = prompt2Height + spacingAfterFirstRect;
        const rectHeightEach = (availableSpace - totalContentHeight) / 2;

        // Draw gray rounded rectangle for first section
        const rectStartX1 = currentHalf === "left" ? margin : dividerX + margin;
        const rectWidth1 =
          currentHalf === "left"
            ? dividerX - 2 * margin
            : pageWidth - dividerX - 2 * margin;
        const cornerRadius1 = 2;

        // Draw dot pattern in rounded rectangle
        const x1 = rectStartX1;
        const y1 = rectStartY1;
        const w1 = rectWidth1;
        const h1 = rectHeightEach;
        const r1 = cornerRadius1;

        drawDotPattern(x1, y1, w1, h1);

        // Move to second section - start right after first rectangle
        currentY = rectStartY1 + rectHeightEach + 8; // Small spacing after first rectangle
        currentY += 2.1; // Move second title 6px lower (≈2.1mm, net 6px from original)

        // Add second prompt text
        const textX2 = currentHalf === "left" ? margin : dividerX + margin;
        doc.setFontSize(10);
        doc.setFont(fontName, "normal");
        doc.setTextColor(0, 0, 0);

        splitText2.forEach((line: string) => {
          doc.text(line, textX2, currentY, { align: "left" });
          currentY += 6;
        });

        // Add spacing after second prompt
        currentY += 1;

        // Draw gray rounded rectangle for second section
        const rectStartX2 = currentHalf === "left" ? margin : dividerX + margin;
        const rectWidth2 =
          currentHalf === "left"
            ? dividerX - 2 * margin
            : pageWidth - dividerX - 2 * margin;
        const rectStartY2 = currentY - 2;
        // Ensure same bottom margin as single-section rectangles
        const rectHeight2 = pageHeight - rectStartY2 - margin - 10;
        const cornerRadius2 = 2;

        // Draw dot pattern in rounded rectangle
        const x2 = rectStartX2;
        const y2 = rectStartY2;
        const w2 = rectWidth2;
        const h2 = rectHeight2;
        const r2 = cornerRadius2;

        drawDotPattern(x2, y2, w2, h2);

        // Add page number for this half-page
        addPageNumber();

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
        addPageTemplate("THE NEW YEAR IS HERE", {
          fontSize: 12,
          fontStyle: "bold",
          titleColor: [26, 33, 46], // #1A212E
          topMargin: 15,
          lineSpacing: 4, // Reduced spacing between lines and title
        });

        // First section: "Summarize your <lastYear> in one word or phrase."
        const promptText3 = `Summarize your ${lastYear} in one word or phrase.`;

        // Check if we need to move to next half-page before adding prompt
        if (currentY > pageHeight - margin - 60) {
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
        const textWidth3 =
          currentHalf === "left"
            ? dividerX - 2 * margin
            : pageWidth - dividerX - 2 * margin;
        const textX3 = currentHalf === "left" ? margin : dividerX + margin;

        // Set font for prompt
        doc.setFontSize(10);
        doc.setFont(fontName, "normal");
        doc.setTextColor(0, 0, 0);

        // Split text into lines that fit within the half-page width
        const splitText3 = doc.splitTextToSize(promptText3, textWidth3);

        // Add each line of text
        splitText3.forEach((line: string) => {
          if (currentY > pageHeight - margin - 20) {
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
          doc.text(line, textX3, currentY, { align: "left" });
          currentY += 6;
        });

        // Add spacing after first prompt
        currentY += 1;
        const rectStartY3 = currentY - 2;

        // Second section: "Create a tagline for the year <newYear>"
        const promptText4 = `Create a tagline for ${newYear} (e.g growth, self-love, etc.)`;

        // Calculate how much space the second prompt will take
        const textWidth4 =
          currentHalf === "left"
            ? dividerX - 2 * margin
            : pageWidth - dividerX - 2 * margin;
        const splitText4 = doc.splitTextToSize(promptText4, textWidth4);
        const prompt4Height = splitText4.length * 6 + 1; // Height of prompt text + spacing

        // Calculate available space for both rectangles
        const spacingAfterFirstRect2 = 2; // Small spacing after first rectangle
        const availableSpace2 = pageHeight - rectStartY3 - margin - 10;
        const totalContentHeight2 = prompt4Height + spacingAfterFirstRect2;
        const rectHeightEach2 = (availableSpace2 - totalContentHeight2) / 2;

        // Draw gray rounded rectangle for first section
        const rectStartX3 = currentHalf === "left" ? margin : dividerX + margin;
        const rectWidth3 =
          currentHalf === "left"
            ? dividerX - 2 * margin
            : pageWidth - dividerX - 2 * margin;
        const cornerRadius3 = 2;

        // Draw dot pattern in rounded rectangle
        const x3 = rectStartX3;
        const y3 = rectStartY3;
        const w3 = rectWidth3;
        const h3 = rectHeightEach2;
        const r3 = cornerRadius3;

        drawDotPattern(x3, y3, w3, h3);

        // Move to second section - start right after first rectangle
        currentY = rectStartY3 + rectHeightEach2 + 8; // Small spacing after first rectangle
        currentY += 2.1; // Move second title 6px lower (≈2.1mm, net 6px from original)

        // Add second prompt text
        const textX4 = currentHalf === "left" ? margin : dividerX + margin;
        doc.setFontSize(10);
        doc.setFont(fontName, "normal");
        doc.setTextColor(0, 0, 0);

        splitText4.forEach((line: string) => {
          doc.text(line, textX4, currentY, { align: "left" });
          currentY += 6;
        });

        // Add spacing after second prompt
        currentY += 1;

        // Draw gray rounded rectangle for second section
        const rectStartX4 = currentHalf === "left" ? margin : dividerX + margin;
        const rectWidth4 =
          currentHalf === "left"
            ? dividerX - 2 * margin
            : pageWidth - dividerX - 2 * margin;
        const rectStartY4 = currentY - 2;
        // Ensure same bottom margin as single-section rectangles
        const rectHeight4 = pageHeight - rectStartY4 - margin - 10;
        const cornerRadius4 = 2;

        // Draw dot pattern in rounded rectangle
        const x4 = rectStartX4;
        const y4 = rectStartY4;
        const w4 = rectWidth4;
        const h4 = rectHeight4;
        const r4 = cornerRadius4;

        drawDotPattern(x4, y4, w4, h4);

        // Add page number for this half-page
        addPageNumber();

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
          fontSize: 12,
          fontStyle: "bold",
          titleColor: [26, 33, 46], // #1A212E
          topMargin: 15,
          lineSpacing: 4, // Reduced spacing between lines and title
        });

        // Section: "Which 3 people in your life you have been most grateful for in <lastYear> and why?"
        const promptText5 = `Which 3 people in your life you have been most grateful for in ${lastYear} and why?`;

        // Check if we need to move to next half-page before adding prompt
        if (currentY > pageHeight - margin - 60) {
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
        const textWidth5 =
          currentHalf === "left"
            ? dividerX - 2 * margin
            : pageWidth - dividerX - 2 * margin;
        const textX5 = currentHalf === "left" ? margin : dividerX + margin;

        // Set font for prompt
        doc.setFontSize(10);
        doc.setFont(fontName, "normal");
        doc.setTextColor(0, 0, 0);

        // Split text into lines that fit within the half-page width
        const splitText5 = doc.splitTextToSize(promptText5, textWidth5);

        // Add each line of text
        splitText5.forEach((line: string) => {
          if (currentY > pageHeight - margin - 20) {
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
          doc.text(line, textX5, currentY, { align: "left" });
          currentY += 6;
        });

        // Add spacing after prompt
        currentY += 1;

        // Draw gray rounded rectangle
        const rectStartX5 = currentHalf === "left" ? margin : dividerX + margin;
        const rectWidth5 =
          currentHalf === "left"
            ? dividerX - 2 * margin
            : pageWidth - dividerX - 2 * margin;
        const rectStartY5 = currentY - 2;
        const rectHeight5 = pageHeight - rectStartY5 - margin - 10;
        const cornerRadius5 = 2;

        // Draw dot pattern in rounded rectangle
        const x5 = rectStartX5;
        const y5 = rectStartY5;
        const w5 = rectWidth5;
        const h5 = rectHeight5;
        const r5 = cornerRadius5;

        drawDotPattern(x5, y5, w5, h5);

        // Add page number for this half-page
        addPageNumber();

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
        addPageTemplate(`YOU MADE IT HAPPEN`, {
          fontSize: 12,
          fontStyle: "bold",
          titleColor: [26, 33, 46], // #1A212E
          topMargin: 15,
          lineSpacing: 4, // Reduced spacing between lines and title
        });

        // Section: "Which are your 3 biggest achievements from <lastYear>?"
        const promptText6 = `Which are your 3 biggest achievements from ${lastYear}?`;

        // Check if we need to move to next half-page before adding prompt
        if (currentY > pageHeight - margin - 60) {
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
        const textWidth6 =
          currentHalf === "left"
            ? dividerX - 2 * margin
            : pageWidth - dividerX - 2 * margin;
        const textX6 = currentHalf === "left" ? margin : dividerX + margin;

        // Set font for prompt
        doc.setFontSize(10);
        doc.setFont(fontName, "normal");
        doc.setTextColor(0, 0, 0);

        // Split text into lines that fit within the half-page width
        const splitText6 = doc.splitTextToSize(promptText6, textWidth6);

        // Add each line of text
        splitText6.forEach((line: string) => {
          if (currentY > pageHeight - margin - 20) {
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
          doc.text(line, textX6, currentY, { align: "left" });
          currentY += 6;
        });

        // Add spacing after prompt
        currentY += 1;

        // Draw gray rounded rectangle
        const rectStartX6 = currentHalf === "left" ? margin : dividerX + margin;
        const rectWidth6 =
          currentHalf === "left"
            ? dividerX - 2 * margin
            : pageWidth - dividerX - 2 * margin;
        const rectStartY6 = currentY - 2;
        const rectHeight6 = pageHeight - rectStartY6 - margin - 10;
        const cornerRadius6 = 2;

        // Draw dot pattern in rounded rectangle
        const x6 = rectStartX6;
        const y6 = rectStartY6;
        const w6 = rectWidth6;
        const h6 = rectHeight6;
        const r6 = cornerRadius6;

        drawDotPattern(x6, y6, w6, h6);

        // Add page number for this half-page
        addPageNumber();

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
        addPageTemplate("YOU GOT THROUGH IT", {
          fontSize: 12,
          fontStyle: "bold",
          titleColor: [26, 33, 46], // #1A212E
          topMargin: 15,
          lineSpacing: 4, // Reduced spacing between lines and title
        });

        // Section: "What were your 3 biggest challenges in <lastYear>?"
        const promptText7 = `What were your 3 biggest challenges in ${lastYear}?`;

        // Check if we need to move to next half-page before adding prompt
        if (currentY > pageHeight - margin - 60) {
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
        const textWidth7 =
          currentHalf === "left"
            ? dividerX - 2 * margin
            : pageWidth - dividerX - 2 * margin;
        const textX7 = currentHalf === "left" ? margin : dividerX + margin;

        // Set font for prompt
        doc.setFontSize(10);
        doc.setFont(fontName, "normal");
        doc.setTextColor(0, 0, 0);

        // Split text into lines that fit within the half-page width
        const splitText7 = doc.splitTextToSize(promptText7, textWidth7);

        // Add each line of text
        splitText7.forEach((line: string) => {
          if (currentY > pageHeight - margin - 20) {
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
          doc.text(line, textX7, currentY, { align: "left" });
          currentY += 6;
        });

        // Add spacing after prompt
        currentY += 1;

        // Draw gray rounded rectangle
        const rectStartX7 = currentHalf === "left" ? margin : dividerX + margin;
        const rectWidth7 =
          currentHalf === "left"
            ? dividerX - 2 * margin
            : pageWidth - dividerX - 2 * margin;
        const rectStartY7 = currentY - 2;
        const rectHeight7 = pageHeight - rectStartY7 - margin - 10;
        const cornerRadius7 = 2;

        // Draw dot pattern in rounded rectangle
        const x7 = rectStartX7;
        const y7 = rectStartY7;
        const w7 = rectWidth7;
        const h7 = rectHeight7;
        const r7 = cornerRadius7;

        drawDotPattern(x7, y7, w7, h7);

        // Add page number for this half-page (last page)
        addPageNumber();

        // Generate PDF as blob and create object URL for browser preview
        const pdfBlob = doc.output("blob");
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
    <div className="w-full h-screen">
      <iframe
        src={pdfUrl}
        className="w-full h-full border-0"
        title="PDF Preview"
      />
    </div>
  );
}
