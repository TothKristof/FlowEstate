import Groq from "groq-sdk";

interface AiRequestProps {
  role?: string;
  systemContent: string;
  content: string;
  model?: string;
}

const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });

export async function getGroqChatCompletion({
  role = "user",
  systemContent,
  content,
  model = "openai/gpt-oss-20b",
}: AiRequestProps) {
  return groq.chat.completions.create({
    messages: [
      { role: "system", content: systemContent },
      { role, content },
    ],
    model,
  });
}
