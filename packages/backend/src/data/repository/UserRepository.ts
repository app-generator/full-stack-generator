import { User, GetUsersRequest } from "generated-api";
import { getRepository, Like } from "typeorm";
import { UserEntity } from "../entity/User";

export class UserRepository {
  public getUsers(params: GetUsersRequest): Promise<User[]> {
    return getRepository(UserEntity).find({
      where: { email: Like(`%${params.filter}%`) },
      take: params.itemsPerPage || 20,
      skip: (params.page || 0) * (params.itemsPerPage || 20),
    });
  }

  public async addUser(article: User): Promise<User> {
    return getRepository(UserEntity).save(article);
  }

  public async updateUser(id: string, article: User): Promise<User> {
    return getRepository(UserEntity).save({ ...article, id });
  }

  public async deleteUser(id: string): Promise<void> {
    return getRepository(UserEntity)
      .delete(id)
      .then(() => Promise.resolve());
  }
}
