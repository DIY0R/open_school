import { ConfigService } from "@nestjs/config";
import { IRMQServiceAsyncOptions } from "nestjs-rmq";

export const getRMQConfig = (): IRMQServiceAsyncOptions => ({
  inject: [ConfigService],
});
