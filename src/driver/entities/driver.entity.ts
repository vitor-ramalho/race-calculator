import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Unique('cpf', ['cpf'])
  cpf: string;

  @Column()
  birth_date: string;

  @Column()
  gender: string;

  @Column()
  address: string;

  constructor(props: {
    name: string;
    cpf: string;
    birth_date: string;
    gender: string;
    address: string;
  }) {
    Object.assign(this, props);
  }
}
