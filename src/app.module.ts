import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseConfig,
    AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
