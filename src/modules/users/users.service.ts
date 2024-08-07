import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'entities';
import { DeepPartial, Repository } from 'typeorm';
import { AccessRoles } from 'enums/roles.enum';
import {
  AsbtCreateRequest,
  CreateUserRequest,
  GetUserRequest,
  GetUserResponse,
} from '@interfaces';
import * as bcrypt from 'bcrypt';
import { AsbtService } from 'clients';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly asbtService: AsbtService,
  ) {}

  async create(data: CreateUserRequest): Promise<void> {
    const saltOrRounds = 10;

    const userExists = await this.usersRepository.findOne({
      where: { login: data.login },
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);

    const user = this.usersRepository.create({
      login: data.login,
      password: hashedPassword,
      accessRoles: data.role.length === 0 ? AccessRoles.OPERATOR : data.role,
    } as DeepPartial<UserEntity>);

    this.usersRepository.save(user);
  }

  async createNewUserForAsbt(data: AsbtCreateRequest) {
    const saltOrRounds = 10;

    const userExists = await this.usersRepository.findOne({
      where: { login: data.login },
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);

    const user = this.usersRepository.create({
      pinpp: data.pinpp,
      status: data.status,
      login: data.login,
      password: hashedPassword,
      serialNumber: data.serialNumber,
      accessRoles: data.accesRoles,
      dateTill: data.dateTill,
    } as unknown as DeepPartial<UserEntity>);

    this.asbtService.create({
      id: user.id,
      pinpp: data.pinpp,
      status: data.status,
      doctype: data.doctype,
      serialNumber: data.serialNumber,
      accesRoles: data.accesRoles,
      login: data.login,
      password: data.password,
      dateFrom: user.createdAt,
      dateTill: data.dateTill,
    });

    this.usersRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async validate(data: GetUserRequest): Promise<Omit<GetUserResponse, 'role'>> {
    const user = await this.usersRepository.findOne({
      where: { login: data.login },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      login: user.login,
      password: user.password,
    };
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
