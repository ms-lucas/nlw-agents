import { fastifyCors } from '@fastify/cors';
import { fastifyMultipart } from '@fastify/multipart';
import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { env } from './env/index.ts';
import { createQuestionRoute } from './routes/create-question.ts';
import { createRoomRoute } from './routes/create-room.ts';
import { getRoomQuestionsRoute } from './routes/get-room-questions.ts';
import { getRoomsRoute } from './routes/get-rooms.ts';
import { uploadAudioRoute } from './routes/upload-audio.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: '*',
});

app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/helth', () => {
  return 'OK';
});

app.register(getRoomsRoute);
app.register(getRoomQuestionsRoute);
app.register(createRoomRoute);
app.register(createQuestionRoute);
app.register(uploadAudioRoute);

app.listen({
  port: env.PORT,
});
