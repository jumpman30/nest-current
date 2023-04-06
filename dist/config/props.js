"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.props = void 0;
const props = {
    rabbit: {
        host: 'amqp://localhost:5672',
        resources: {
            notification_exchange: 'notification',
            notification_routingKey: 'notification',
            message_exchange: 'message-exchange',
            message_routingKey: 'message',
            message_queue: 'message'
        },
        type: 'topic'
    }
};
exports.props = props;
//# sourceMappingURL=props.js.map