import { useNavigate } from "react-router-dom";

export default function Fun() {
  const navigate = useNavigate();

  const handleDownload = () => {
    navigate("/new-year");
  };

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
        onClick={handleDownload}
        className="mt-8 px-6 py-3 bg-purple-link text-white rounded hover:bg-purple-700 transition-colors duration-300"
      >
        Download
      </button>
    </div>
  );
}
