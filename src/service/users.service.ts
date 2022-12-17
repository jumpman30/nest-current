import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(username: string, password: string): Promise<User> {
    return await this.usersRepository.save(new User(username, password));
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`user ${id} not found on the database`);
    }
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { username: username },
    });
    if (!user) {
      throw new NotFoundException(`user ${username} not found on the database`);
    }
    return user;
  }

  async update(id: number, updatedUser: Partial<User>): Promise<UpdateResult> {
    const user = await this.findOne(id);
    Object.assign(user, updatedUser);
    return this.usersRepository.update(id, user);
  }

  async deleteUser(username: string): Promise<User> {
    const user = await this.findOneByUsername(username);
    return this.usersRepository.remove(user);
  }
}
