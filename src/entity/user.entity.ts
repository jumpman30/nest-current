import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
} from 'typeorm';
import { BaseModel } from '../interface/types';

@Entity()
export class User implements BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  /*
  @AfterInsert()
  async validate() {
    console.log('Inserted user ' + this.username + ' on database successfully');
  }


   */
  @AfterRemove()
  async validateRemoval() {
    console.log('Removed user from database');
  }
}
