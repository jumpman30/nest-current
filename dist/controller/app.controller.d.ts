import { AppService } from '../service/app.service';
import { User } from '../entity/user.entity';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): User;
}
