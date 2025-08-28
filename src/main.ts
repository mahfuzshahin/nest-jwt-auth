import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Layer 1: Helmet for security headers
  app.use(helmet());

  // Layer 2: CORS to allow frontend access
  app.enableCors({
    origin: 'http://localhost:3001', // Replace with your frontend's actual URL in production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Layer 3: Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe());

  // Layer 4: Graceful Shutdown
  app.enableShutdownHooks();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Nest Auth API')
    .setDescription('The API documentation for the Nest Auth application')
    .setVersion('1.0')
    .addBearerAuth() // 3. Add JWT Bearer token authentication
    .build();

  // 4. Create the Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // 5. Set up the Swagger UI endpoint
  SwaggerModule.setup('api', app, document);
  //end swagger setup

  await app.listen(3000);
}
bootstrap();
