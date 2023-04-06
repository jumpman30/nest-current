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
}

export {props};
