import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/database.config';
import { ListingsModule } from './listings/listings.module';
import { BookingsModule } from './bookings/bookings.module';
import { OwnerModule } from './owner/owner.module';
import { ReviewModule } from './review/review.module';
import { NotificationModule } from './notification/notification.module';
import { PaymentModule } from './payment/payment.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseConfig,
    AuthModule, UsersModule, ListingsModule, BookingsModule, OwnerModule, ReviewModule, NotificationModule, PaymentModule, FavoritesModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
