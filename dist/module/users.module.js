"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("../controller/users.controller");
const users_service_1 = require("../service/users.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entity/user.entity");
const cron_service_1 = require("../service/cron.service");
const rabbbitmq_module_1 = require("./rabbbitmq.module");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const props_1 = require("../config/props");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [rabbbitmq_module_1.RabbitmqModule, typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, cron_service_1.CronService, {
                provide: nestjs_rabbitmq_1.AmqpConnection,
                useFactory: async () => {
                    const connection = new nestjs_rabbitmq_1.AmqpConnection({ name: 'nest-current',
                        uri: props_1.props.rabbit.host,
                        exchanges: [{
                                name: props_1.props.rabbit.resources.message_exchange,
                                type: props_1.props.rabbit.type,
                            }]
                    });
                    await connection.init();
                    return connection;
                },
            }]
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map