import { Data, DataTypeEnum } from "generated-api";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("data")
export class DataEntity implements Data {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column({ type: "integer" })
  value!: number;

  @Column({name:"timestamp", type: "text" })
  timestamp: Date = new Date();

  @Column({ type: "varchar" })
  type!: DataTypeEnum;
}
