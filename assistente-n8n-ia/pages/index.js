import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");

  const generateFlow = async () => {
    try {
      const response = await axios.post("/api/generate", { prompt });
      setJsonOutput(JSON.stringify(response.data, null, 2));
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar automação");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Assistente IA para n8n</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Descreva a automação desejada..."
        className="w-full p-4 text-black rounded-md mb-4"
        rows={4}
      />
      <button
        onClick={generateFlow}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold"
      >
        Gerar Automação
      </button>

      {jsonOutput && (
        <>
          <h2 className="text-xl mt-6 mb-2 font-semibold">JSON Gerado</h2>
          <pre className="bg-gray-800 p-4 rounded-md overflow-auto">{jsonOutput}</pre>
        </>
      )}
    </div>
  );
}
