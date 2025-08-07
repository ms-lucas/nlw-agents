import { GoogleGenAI } from '@google/genai';
import { env } from '../env/index.ts';

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const model = 'gemini-2.5-flash';

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const { text } = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcreva o áudio para o português do Brasil de forma precisa e natural. Utilize pontuação adequada e faça a divisão em parágrafos sempre que for necessário para garantir a fluidez e a compreensão do texto.',
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  });

  if (!text) {
    throw new Error('Não foi possivel converter o áudio.');
  }

  return text;
}

export async function generateEmbeddings(text: string) {
  try {
    const response = await gemini.models.embedContent({
      model: 'text-embedding-004',
      contents: [{ text }],
      config: {
        taskType: 'RETRIEVAL_DOCUMENT',
      },
    });

    if (!response.embeddings?.[0].values) {
      throw new Error('Não foi possível gerar os embeddings. ');
    }

    return response.embeddings[0].values;
  } catch {
    throw new Error('Não foi possível gerar os embeddings. ');
  }
}

export async function generateAnswer(
  question: string,
  transcription: string[]
) {
  const context = transcription.join('\n\n');

  const prompt = `
    Com base no texto fornecido abaixo como contexto, responda a pergunta de forma clara e precisa em português do Brasil.
  
    CONTEXTO:
    ${context}

    PERGUNTA:
    ${question}

    INSTRUÇÕES:
    - Use apenas informações contidas no contexto enviado;
    - Se a resposta não for encontrada no contexto, apenas responda que não possui informações suficientes para responder;
    - Seja objetivo;
    - Mantenha um tom educativo e profissional;
    - Cite trechos relevantes do contexto se apropriado;
    - Se for citar o contexto, utilize o temo "conteúdo da aula";
  `.trim();

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  });

  if (!response.text) {
    throw new Error('Falha ao gerar resposta pelo Gemini');
  }

  return response.text;
}
