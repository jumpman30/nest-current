import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
export declare class UsersController {
    userService: UsersService;
    constructor(userService: UsersService);
    create(userDto: UserDto): Promise<User>;
    findByUsername(username: string): Promise<User>;
}
