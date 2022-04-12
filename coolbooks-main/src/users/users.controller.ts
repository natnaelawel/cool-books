import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return { data: user };
  }

  @Get()
  async findAll() {
    return { data: await this.usersService.findAll() };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return { data: await this.usersService.findOne(+id) };
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @GetUser('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return { data: await this.usersService.update(userId, updateUserDto) };
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return { data: await this.usersService.remove(+id) };
  }
}
