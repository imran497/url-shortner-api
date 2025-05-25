import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string>('ALLOW_ORIGINS', 'http://localhost:3000'),
  });


  await app.listen(configService.get('PORT', '3001'), () =>
    console.log('App listening on ' + configService.get('PORT', '3001')),
  );
}

bootstrap();
