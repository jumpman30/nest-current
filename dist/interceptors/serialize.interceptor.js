"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializeInterceptor = void 0;
const rxjs_1 = require("rxjs");
class SerializeInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const body = ctx.getRequest().body;
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            console.log(data);
            return Object.assign(Object.assign({}, data), { username: 'intercepted' });
        }));
    }
}
exports.SerializeInterceptor = SerializeInterceptor;
//# sourceMappingURL=serialize.interceptor.js.map