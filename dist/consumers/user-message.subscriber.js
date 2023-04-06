"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMessageSubscriber = void 0;
const props_1 = require("../config/props");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../dto/user.dto");
let UserMessageSubscriber = class UserMessageSubscriber {
    constructor() {
    }
    async processMessageNotification(data) {
        console.log('Getting message from RabbitMQ');
        console.log(data);
        return;
    }
};
__decorate([
    (0, nestjs_rabbitmq_1.RabbitSubscribe)({
        exchange: props_1.props.rabbit.resources.message_exchange,
        routingKey: props_1.props.rabbit.resources.message_routingKey,
        queue: props_1.props.rabbit.resources.message_queue,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserMessageSubscriber.prototype, "processMessageNotification", null);
UserMessageSubscriber = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserMessageSubscriber);
exports.UserMessageSubscriber = UserMessageSubscriber;
//# sourceMappingURL=user-message.subscriber.js.map