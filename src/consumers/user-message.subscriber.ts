import {props} from "../config/props";
import {RabbitSubscribe} from "@golevelup/nestjs-rabbitmq";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserMessageSubscriber {
    constructor() {
    }

@RabbitSubscribe({
    exchange: props.rabbit.resources.message_exchange,
    routingKey: props.rabbit.resources.message_routingKey,
    queue: props.rabbit.resources.message_queue,
})
    async processMessageNotification(data: any): Promise<void> {
        //const user = data;
        console.log(data);
        return;
}

}
