import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { ValidationPipe } from '@nestjs/common';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {props} from "./config/props";
import {MessageHandlerModule} from "./module/message-handler.module";

async function bootstrap() {
  const restApp = await NestFactory.create(AppModule);
  const rabbitApp = await  NestFactory.createMicroservice<MicroserviceOptions>(MessageHandlerModule, {
    transport: Transport.RMQ,
    options: {
      urls: [props.rabbit.host],
      queue: props.rabbit.resources.message_queue,
      queueOptions: {
        durable: true
      },
    },
  },);

    restApp.useGlobalPipes(new ValidationPipe());
    await rabbitApp.listen();
    await restApp.listen(7077);
}
bootstrap();
