// src/config/swagger.config.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Rent-Go API')
    .setDescription('API documentation for the Rent-Go platform built with NestJS and MongoDB.')
    .setVersion('1.0')
    .addBearerAuth() // Enables JWT authentication in Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  console.log(' Swagger Docs available at: http://localhost:3000/api/docs');
}
