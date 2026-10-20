import { createMicroserviceApp } from './server';

const PORT = 4001;
const server = createMicroserviceApp(PORT);

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[Microservices Gateway] Listening on http://127.0.0.1:${PORT}`);
});
