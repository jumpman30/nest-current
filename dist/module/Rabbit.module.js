"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitModule = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
const message_receiver_1 = require("../receiver/message.receiver");
let RabbitModule = class RabbitModule {
};
RabbitModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_rabbitmq_1.RabbitMQModule.forRoot(nestjs_rabbitmq_1.RabbitMQModule, {
                exchanges: [
                    {
                        name: 'message-exchange',
                        type: 'topic',
                    },
                ],
                uri: 'amqp://rabbitmq:rabbitmq@localhost:5672',
                connectionInitOptions: { wait: false },
            }),
        ],
        providers: [message_receiver_1.MessageReceiver],
    })
], RabbitModule);
exports.RabbitModule = RabbitModule;
//# sourceMappingURL=Rabbit.module.js.map