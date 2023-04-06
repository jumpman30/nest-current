import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseFilters,
  Put,
  Delete,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { User } from '../entity/user.entity';
import { HttpExceptionFilter } from '../errorHandlingFilters/http-exception.filter';
import { UpdateResult } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { EntitySerializeInterceptor } from '../interceptors/entity-serialize.interceptor';
import { CreateUserDto } from '../dto/create-user.dto';
import { DeleteUserDto } from '../dto/delete-user.dto';
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {props} from "../config/props";

@UseFilters(new HttpExceptionFilter()) // you can also create a global scope filter by declaring it on main.ts
@Controller('users')
export class UsersController {
  constructor(
      private readonly userService: UsersService,
      private readonly amqpConnection: AmqpConnection
  ) {}

  @Post()
  //you can use an interceptor globally or only at a specific module
  @UseInterceptors(new EntitySerializeInterceptor())
  async create(@Body() userDto: CreateUserDto): Promise<User> {
    try {

      const user = await this.userService.create(userDto.username, userDto.password);

        await this.publishUserCreationNotification(user);
       return user;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/find')
  async findByUsername(@Query() username: string): Promise<User> {
    try {
      return await this.userService.findOneByUsername(username.toString());
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/update')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    const user = await this.userService.findOneByUsername(
      updateUserDto.username,
    );
    return await this.userService.update(user.id, updateUserDto);
  }

  @Delete('/delete')
  @UseInterceptors(new EntitySerializeInterceptor())
  async deleteUser(@Body() userDto: Partial<DeleteUserDto>): Promise<User> {
    try {
      return await this.userService.deleteUser(userDto.username);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  async findUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(parseInt(id));
  }

   private async publishUserCreationNotification(user: User): Promise<void> {
    //TODO: map type of operation to proper notification
     this.amqpConnection.publish(
         props.rabbit.resources.message_exchange,
         props.rabbit.resources.message_routingKey,
         user
     );
  }
}
