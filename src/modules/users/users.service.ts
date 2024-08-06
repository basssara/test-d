import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'entities';
import { DeepPartial, Repository } from 'typeorm';
import { AccessRoles } from 'enums/roles.enum';
import { CreateUserRequest } from '@interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserRequest): Promise<void> {
    const userExists = await this.usersRepository.findOne({
      where: { id: data.login },
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const user = this.usersRepository.create({
      login: data.login,
      password: data.password,
      role: data.role.length === 0 ? AccessRoles.OPERATOR : data.role,
    } as DeepPartial<UserEntity>);

    this.usersRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
