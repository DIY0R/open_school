import { Module } from "@nestjs/common";

import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: "envs/.account.env" }),
    MongooseModule.forRootAsync({}),
    UserModule,
    AuthModule,
  ],

  providers: [],
})
export class AppModule {}
