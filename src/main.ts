import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { DomainErrorInterceptor } from './infrastructure/http/interceptors/domain-error.interceptor';
import { ApplicationErrorInterceptor } from './infrastructure/http/interceptors/application-error.interceptor';
import { HttpExceptionFilter } from './infrastructure/http/filters/http-exception.filter';
import { ResponseInterceptor } from './infrastructure/http/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Barbershop API')
    .setVersion('1.0')
    .addTag('barbershops')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new DomainErrorInterceptor(),
    new ApplicationErrorInterceptor(),
    new ResponseInterceptor(),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
