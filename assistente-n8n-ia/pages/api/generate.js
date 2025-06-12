export default async function handler(req, res) {
  const { prompt } = req.body;

  const apiKey = process.env.OPENAI_API_KEY;
  const url = "https://api.openai.com/v1/chat/completions";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: `Gere o JSON de um workflow do n8n para: ${prompt}` }],
    }),
  });

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || "Erro ao gerar JSON";

  try {
    const json = JSON.parse(text);
    res.status(200).json(json);
  } catch {
    res.status(200).json({ resultado: text });
  }
}
