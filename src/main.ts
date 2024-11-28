import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UnauthorizedExceptionFilter } from './utils/exception-filter/unauthorized-exception.filter';
import { ForbiddenExceptionFilter } from './utils/exception-filter/forbidden.exception-filter';
import { HttpVerbExceptionFilter } from './utils/exception-filter/http-verb-exception.filter';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });
  
  dotenv.config();

  app.use((req,res,next) => {
    logger.log(`Request ${req.method} ${req.url}`);
    next();
  });

  const config = new DocumentBuilder().addBearerAuth().addTag('NITDA API')
    .setTitle('NITDA API')
    .setDescription('API consisting of endpoints to register, login, logout and manage reports')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalFilters(
    new UnauthorizedExceptionFilter(), 
    new HttpVerbExceptionFilter(), 
    new ForbiddenExceptionFilter()
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
