import { Data, GetDataRequest } from 'generated-api';
import { getRepository } from "typeorm";
import { DataEntity } from "../entity/Data";

export class DataRepository {
  public async getData(params: GetDataRequest): Promise<Data[]> {
    return getRepository(DataEntity).find({
      where: { type: params.type }
    });
  }

  public async addData(data: Data): Promise<Data> {
    return getRepository(DataEntity).save(data);
  }

  public async updateData(id: string, data: Data): Promise<Data> {
    return getRepository(DataEntity).save({ ...data, id });
  }

  public async deleteData(id: string): Promise<void> {
    return getRepository(DataEntity)
      .delete(id)
      .then(() => Promise.resolve());
  }
}
