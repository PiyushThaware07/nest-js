import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomAuthGuard } from './module/auth/auth/guards/custom.auth.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global auth guard
  const reflector = new Reflector();
  app.useGlobalGuards(new CustomAuthGuard(reflector));
  await app.listen(3000);
}
bootstrap();
