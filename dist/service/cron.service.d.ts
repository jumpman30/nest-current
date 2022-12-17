import { UsersService } from './users.service';
export declare class CronService {
    userService: UsersService;
    constructor(userService: UsersService);
    handleCron(): void;
}
