import { Context } from 'hono';
import getGeminiAnswer from "../util/geminiGenerator";

export const useGemini = async (c: Context) => {
    const body = await c.req.json();

    const prompt: string = body.prompt;

    const evaluation = await getGeminiAnswer(prompt);

    return c.json(evaluation);
}