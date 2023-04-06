import { UserDto } from "../dto/user.dto";
export declare class UserMessageSubscriber {
    constructor();
    processMessageNotification(data: UserDto): Promise<void>;
}
