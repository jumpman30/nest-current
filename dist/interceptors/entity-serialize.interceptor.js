"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitySerializeInterceptor = void 0;
const rxjs_1 = require("rxjs");
const class_transformer_1 = require("class-transformer");
const user_dto_1 = require("../dto/user.dto");
class EntitySerializeInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const body = ctx.getRequest().body;
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            console.log(data);
            return (0, class_transformer_1.plainToClass)(user_dto_1.UserDto, data, {
                excludeExtraneousValues: true,
            });
        }));
    }
}
exports.EntitySerializeInterceptor = EntitySerializeInterceptor;
//# sourceMappingURL=entity-serialize.interceptor.js.map