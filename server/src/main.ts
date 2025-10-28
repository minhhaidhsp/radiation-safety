import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  const config = app.get(ConfigService)
  const port = config.get<number>('PORT') ?? 3001

  await app.listen(port)
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}/api`)
}

bootstrap()
