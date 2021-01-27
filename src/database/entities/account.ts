import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  username: string;
  password: string;
}
