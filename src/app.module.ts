import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/database.config';
import { ListingsModule } from './listings/listings.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseConfig,
    AuthModule, UsersModule, ListingsModule, BookingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
