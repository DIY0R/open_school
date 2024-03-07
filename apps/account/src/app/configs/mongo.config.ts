import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";

export const getMongoConfig = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: (configService: ConfigService) => ({
      uri: getMongoString(configService),
    }),
    inject: [ConfigService],
    imports: [ConfigModule],
  };
};
const getMongoString = (configService: ConfigService) =>
  `mongodb+srv://${configService.get("MONGO_LOGIN")}:${configService.get(
    "MONGO_PASSWORD"
  )}@${configService.get(
    "APP_NAME"
  )}.tzg1k3j.mongodb.net/?retryWrites=true&w=majority&appName=${configService.get(
    "APP_NAME"
  )}`;
