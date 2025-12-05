// src/config/database.config.ts
import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseConfig = MongooseModule.forRootAsync({
  useFactory: () => ({
    uri: process.env.MONGODB_URI ,
    dbName: process.env.MONGO_DB_NAME || 'ecommerce',
  }),
});
