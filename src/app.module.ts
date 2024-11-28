import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresSqlDataSource } from './utils/config/orm-config';
import { CacheModule } from '@nestjs/cache-manager'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { StateModule } from './state/state.module';
import { ActionsModule } from './actions/actions.module';
// import * as redisStore from 'cache-manager-redis-store';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // CacheModule.register({
    //   isGlobal: true,
    //   store: redisStore,
    //   host: 'redis',
    //   port: 6379,
    // }),
    TypeOrmModule.forRoot(PostgresSqlDataSource),
    AuthModule, 
    UserModule, ReportModule, StateModule, ActionsModule
  ],
  exports: [ConfigModule],
  
})
export class AppModule {}
