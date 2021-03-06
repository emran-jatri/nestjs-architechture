import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { EnvConfigs } from './common/configs'
import * as os from 'os'

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const logger = new Logger()

	app.setGlobalPrefix('api');
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1',
	});
	app.use(helmet());
	app.use(morgan('dev'));
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
	SwaggerModule.setup('swagger', app, document);

	const port = configService.get('PORT') || 5000;
	const ip = os.networkInterfaces().Ethernet[1].address
	logger.log(`Server running on http://${ip}:${port}`);
	await app.listen(port);
	
}

bootstrap();
