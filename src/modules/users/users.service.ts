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
  UpdateUserRequest,
} from '@interfaces';
import * as bcrypt from 'bcrypt';
import { AsbtService } from 'clients';
import { uuid } from 'helpers';
import { formatDate } from 'date-fns';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly asbtService: AsbtService,
  ) { }

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
      accessRoles: data.roles.length === 0 ? AccessRoles.OPERATOR : data.roles,
    } as DeepPartial<UserEntity>);

    this.usersRepository.save(user);
  }

  async createNewUserForAsbt(
    data: Omit<AsbtCreateRequest, 'dateFrom'>,
  ): Promise<void> {
    const saltOrRounds = 10;
    const savedUuid = uuid();

    const userExists = await this.usersRepository.findOne({
      where: { login: data.login },
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);

    await this.asbtService.create({
      guid: savedUuid,
      pinpp: data.pinpp,
      status: data.status,
      doctype: data.doctype,
      serialnumber: data.serialnumber,
      accessRoles: data.accessRoles,
      login: data.login,
      password: data.password,
      dateFrom: new Date(),
      dateTill: data.dateTill,
    });

    console.log('asb moved');

    await this.usersRepository.save({
      id: savedUuid,
      pinpp: data.pinpp,
      status: data.status,
      login: data.login,
      password: hashedPassword,
      serialNumber: data.serialnumber,
      accessRoles: data.accessRoles,
      dateTill: formatDate(data.dateTill, 'dd-MM-yyyy'),
    });
  }

  async findAll() {
    const users = await this.usersRepository.find()
    return users
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(
      {
        where: {
          id: id
        }
      }
    )

    if (!user || !user.id) {
      throw new NotFoundException("User not found")
    };
    return user
  }

  async validate(data: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.usersRepository.findOne({
      where: { login: data.login },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      role: user.accessRoles,
      login: user.login,
      password: user.password,
    };
  }

  async update(id: string, updateUserDto: UpdateUserRequest): Promise<void> {
    await this.usersRepository.update(id,
      {
        ...updateUserDto,
        updatedAt: new Date(),
      }
    );
  }

  async remove(id: string) {
    await this.usersRepository.update(id, {
      deletedAt: new Date(),
    });

    return 'ok'
  }
}
