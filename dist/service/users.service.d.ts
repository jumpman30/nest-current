import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entity/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(username: string, password: string): Promise<User>;
    findOne(id: number): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    update(id: number, updatedUser: Partial<User>): Promise<UpdateResult>;
    deleteUser(username: string): Promise<User>;
}
