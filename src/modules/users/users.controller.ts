import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
  // UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateAsbtRequestDto,
  // CreateUserRequestDto,
  UpdateUserDto,
} from './dto/index';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AsbtCreateRequestSwagger,
  ForbiddenResponse,
  InternalServerErrorResponse,
  UnauthorizedResponse,
  UnprocessableEntityResponse,
} from 'swagger';
import { Roles } from 'decorators';
import { Roles as Role } from '@enums';
import { CheckPermissionGuard } from 'guards';
// import { CheckPermissionGuard } from 'guards';

@ApiTags('User Service')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseGuards(CheckPermissionGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @UseGuards(CheckPermissionGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: AsbtCreateRequestSwagger,
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    type: UnauthorizedResponse,
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    type: ForbiddenResponse,
    status: HttpStatus.FORBIDDEN,
  })
  @ApiResponse({
    type: UnprocessableEntityResponse,
    status: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  @ApiResponse({
    type: InternalServerErrorResponse,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  createNewUserForAsbt(@Body() body: CreateAsbtRequestDto): Promise<void> {
    return this.usersService.create(body);
  }

  @Get()
  // @UseGuards(CheckPermissionGuard)
  // @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.usersService.findAll({ page, limit });
  }

  @Get(':id')
  @UseGuards(CheckPermissionGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // @Get('validate')
  // validate(@Param('login') login: string) {
  //   return this.usersService.validate({ login });
  // }

  @Patch(':id')
  @UseGuards(CheckPermissionGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.usersService.update({ guid: id, ...updateUserDto });
  }

  @Delete(':id')
  @UseGuards(CheckPermissionGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}