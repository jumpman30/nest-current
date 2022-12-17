declare const props: {
    rabbit: {
        host: string;
        resources: {
            notification_exchange: string;
            notification_routingKey: string;
            message_exchange: string;
            message_routingKey: string;
            message_queue: string;
        };
        type: string;
    };
};
export { props };
