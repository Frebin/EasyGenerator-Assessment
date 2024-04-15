import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
// import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET_KEY, 
    //   signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }, 
    // }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
