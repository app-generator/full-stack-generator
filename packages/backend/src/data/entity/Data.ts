import { Data, DataTypeEnum } from "generated-api";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("data")
export class DataEntity implements Data {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ type: "integer" })
  value!: number;

  @Column({name:"timestamp", type: "timestamp with time zone" })
  timestamp: Date = new Date();

  @Column({ type: "varchar" })
  type!: DataTypeEnum;
}
