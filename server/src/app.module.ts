import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import configuration from './config/configuration'
import { HealthModule } from './health/health.module'
import { FormsModule } from './forms/forms.module'
import { SubmissionsModule } from './submissions/submissions.module'
import { FacilityModule } from './facility/facility.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.user'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.name'),
        autoLoadEntities: true,
        synchronize: config.get<boolean>('database.synchronize') ?? false,
        ssl: config.get<boolean>('database.ssl') ?? false
      })
    }),
    HealthModule,
    FormsModule,
    SubmissionsModule,
    FacilityModule
  ]
})
export class AppModule {}
