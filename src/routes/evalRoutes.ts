import { Context, Hono } from 'hono';
import { useGemini } from '../controllers/evalController'

const evalRoutes = new Hono();

evalRoutes.post('/gemini', useGemini)

export default evalRoutes;