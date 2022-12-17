"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./module/app.module");
const microservices_1 = require("@nestjs/microservices");
const props_1 = require("./config/props");
const message_handler_module_1 = require("./module/message-handler.module");
async function bootstrap() {
    const restApp = await core_1.NestFactory.create(app_module_1.AppModule);
    const rabbitApp = await core_1.NestFactory.createMicroservice(message_handler_module_1.MessageHandlerModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [props_1.props.rabbit.host],
            queue: props_1.props.rabbit.resources.message_queue,
            queueOptions: {
                durable: true
            },
        },
    });
    await rabbitApp.listen();
    await restApp.listen(7077);
}
bootstrap();
//# sourceMappingURL=main.js.map