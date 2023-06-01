import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { TimelineModule } from './timeline/timeline.module';
import { CabsModule } from './cabs/cabs.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'postgres'>('TYPEORM_CONNECTION'),
        host: config.get<string>('TYPEORM_HOST'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        entities: [__dirname + 'dist/**/*.entities{.ts, .js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true
      })
    }),
    UsersModule,
    TimelineModule,
    CabsModule,

  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
