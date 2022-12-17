import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(username: string, password: string): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
}
