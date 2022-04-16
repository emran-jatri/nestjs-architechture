import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	app.setGlobalPrefix('api');
	app.use(helmet());
	app.enableCors();
	app.use(compression());
	app.useGlobalPipes(
		new ValidationPipe({
			// whitelist: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true
			}
		})
	);

	const config = new DocumentBuilder()
    .setTitle('Nest.js Architecture')
    .setDescription('Nest.js Basic API description')
    .setVersion('1.0')
		.addTag('Nest.js')
		.addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	const port = configService.get('PORT') || 5000;
	// console.log('----------->', port);

  await app.listen(port);
}
bootstrap();
