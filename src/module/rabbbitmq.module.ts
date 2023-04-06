import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {Module} from "@nestjs/common";
import {props} from "../config/props";

@Module({
    imports: [
        RabbitMQModule.forRoot(RabbitMQModule, {
            exchanges: [
                {
                    name: props.rabbit.resources.message_exchange,
                    type: props.rabbit.type,
                },
            ],
            uri: props.rabbit.host,
            connectionInitOptions: { wait: true, timeout: 20000 },
        }),
    ],
})

export class RabbitmqModule {}
