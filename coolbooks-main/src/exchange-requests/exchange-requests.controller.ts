import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ExchangeRequestsService } from './exchange-requests.service';
import { CreateExchangeRequestDto } from './dto/create-exchange-request.dto';
import { UpdateExchangeRequestDto } from './dto/update-exchange-request.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiTags, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@ApiTags('exchange requests')
@Controller('exchange-requests')
export class ExchangeRequestsController {
  constructor(
    private readonly exchangeRequestsService: ExchangeRequestsService,
  ) {}

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Exchange request',
    type: CreateExchangeRequestDto,
  })
  async create(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
    @Body() createExchangeRequestDto: CreateExchangeRequestDto,
  ) {
    try {
      createExchangeRequestDto.picture = file.originalname;
      createExchangeRequestDto.userId = user.id;
      return await this.exchangeRequestsService.create(
        createExchangeRequestDto,
        file,
      );
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Get()
  async findAll(@GetUser() user: User) {
    try {
      return await this.exchangeRequestsService.findAll(user.id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.exchangeRequestsService.findOne(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('picture'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update exchange request',
    type: UpdateExchangeRequestDto,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateExchangeRequestDto: UpdateExchangeRequestDto,
  ) {
    try {
      return await this.exchangeRequestsService.update(
        +id,
        file,
        updateExchangeRequestDto,
      );
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.exchangeRequestsService.remove(+id);
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
