import {Module} from "@nestjs/common";
import {RabbitmqModule} from "./rabbbitmq.module";
import {UserMessageSubscriber} from "../consumers/user-message.subscriber";

@Module({
    imports: [RabbitmqModule],
    providers: [UserMessageSubscriber]
})

export class MessageHandlerModule {}
