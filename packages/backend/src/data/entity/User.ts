import { User } from "generated-api";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  email!: string;

  @Column({ name: "first_name", type: "varchar" })
  firstName: string | undefined;

  @Column({ name: "last_name", type: "varchar" })
  lastName: string | undefined;

  @Column()
  status: string = "INACTIVE";
}
