import { NestFactory } from '@nestjs/core';
import { StatusModule } from './status/status.module';

async function bootstrap() {
  const app = await NestFactory.create(StatusModule);
  await app.listen(3000);
}
bootstrap();
