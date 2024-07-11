import { Hono } from 'hono';
import evalRoutes from "./routes/evalRoutes";

const app = new Hono();

app.route('/eval', evalRoutes)

app.get('/health', (c) => c.text('OK'));

const startServer = async () => {
    Bun.serve({
        port: 3000,
        fetch: app.fetch,
    });
};

await startServer();
