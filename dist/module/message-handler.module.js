"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHandlerModule = void 0;
const common_1 = require("@nestjs/common");
const rabbbitmq_module_1 = require("./rabbbitmq.module");
const user_message_subscriber_1 = require("../consumers/user-message.subscriber");
let MessageHandlerModule = class MessageHandlerModule {
};
MessageHandlerModule = __decorate([
    (0, common_1.Module)({
        imports: [rabbbitmq_module_1.RabbitmqModule],
        providers: [user_message_subscriber_1.UserMessageSubscriber]
    })
], MessageHandlerModule);
exports.MessageHandlerModule = MessageHandlerModule;
//# sourceMappingURL=message-handler.module.js.map