import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUser } from '../interfaces/IUser';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  avatar: string;

  @Column({ type: 'int', default: 0 })
  followers: number;

  @Column({ type: 'int', default: 0 })
  following: number;

  @Column({ type: 'int', default: 0 })
  publications: number;

  @Column({ nullable: true, type: 'varchar' })
  bio: string;

  constructor(props: Omit<User, 'id'>) {
    Object.assign(this, props);
  }
}
