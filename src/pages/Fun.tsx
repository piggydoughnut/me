import { useState } from "react";
import jsPDF from "jspdf";

export default function Fun() {
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePDF = () => {
        setIsGenerating(true);

        // Create a new PDF document
        const doc = new jsPDF();

        // Set title
        doc.setFontSize(20);
        doc.text("End of the Year Reflection", 20, 20);

        // Add some spacing and content
        // This is a placeholder - we'll update with actual prompts when you provide the sample
        doc.setFontSize(12);
        let yPosition = 40;

        doc.text("Reflection Prompts:", 20, yPosition);
        yPosition += 10;

        // Placeholder prompts - will be replaced with actual content
        const prompts = [
            "What are you most grateful for this year?",
            "What was your biggest achievement?",
            "What did you learn about yourself?",
            "What would you like to do differently next year?",
        ];

        prompts.forEach((prompt, index) => {
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
            }
            doc.text(`${index + 1}. ${prompt}`, 20, yPosition);
            yPosition += 15;
        });

        // Save the PDF
        doc.save("end-of-year-reflection.pdf");
        setIsGenerating(false);
    };

    return (
        <div className="mt-40">
            <h1 className="font-bold leading-tight max-w-md mb-3">
                End of the year reflection
            </h1>
            <p className="mt-5 max-w-2xl">
                Take a moment to reflect on the past year with these thoughtful prompts.
                Click the button below to generate a PDF with reflection questions that will
                help you process your experiences, celebrate your achievements, and set intentions
                for the year ahead.
            </p>
            <button
                onClick={generatePDF}
                disabled={isGenerating}
                className="mt-8 px-6 py-3 bg-purple-link text-white rounded hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isGenerating ? "Generating PDF..." : "Generate PDF"}
            </button>
        </div>
    );
}

