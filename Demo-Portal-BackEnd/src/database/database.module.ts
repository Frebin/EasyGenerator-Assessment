import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
