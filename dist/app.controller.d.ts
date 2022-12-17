import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): User;
}
