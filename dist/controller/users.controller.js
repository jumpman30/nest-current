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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../service/users.service");
const http_exception_filter_1 = require("../errorHandlingFilters/http-exception.filter");
const update_user_dto_1 = require("../dto/update-user.dto");
const entity_serialize_interceptor_1 = require("../interceptors/entity-serialize.interceptor");
const create_user_dto_1 = require("../dto/create-user.dto");
const microservices_1 = require("@nestjs/microservices");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const props_1 = require("../config/props");
let UsersController = class UsersController {
    constructor(userService, amqpConnection) {
        this.userService = userService;
        this.amqpConnection = amqpConnection;
    }
    async create(userDto) {
        try {
            const user = await this.userService.create(userDto.username, userDto.password);
            await this.publishUserCreationNotification(user);
            return user;
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findByUsername(username) {
        try {
            return await this.userService.findOneByUsername(username.toString());
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateUser(updateUserDto) {
        const user = await this.userService.findOneByUsername(updateUserDto.username);
        return await this.userService.update(user.id, updateUserDto);
    }
    async deleteUser(userDto) {
        try {
            return await this.userService.deleteUser(userDto.username);
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findUser(id) {
        return this.userService.findOne(parseInt(id));
    }
    async publishUserCreationNotification(user) {
        this.amqpConnection.publish(props_1.props.rabbit.resources.notification_exchange, props_1.props.rabbit.resources.notification_routingKey, user);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(new entity_serialize_interceptor_1.EntitySerializeInterceptor()),
    (0, microservices_1.EventPattern)('message'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/find'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findByUsername", null);
__decorate([
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    (0, common_1.UseInterceptors)(new entity_serialize_interceptor_1.EntitySerializeInterceptor()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUser", null);
UsersController = __decorate([
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        nestjs_rabbitmq_1.AmqpConnection])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map