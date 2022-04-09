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
  create(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
    @Body() createExchangeRequestDto: CreateExchangeRequestDto,
  ) {
    createExchangeRequestDto.picture = file.originalname;
    createExchangeRequestDto.userId = user.id;
    return this.exchangeRequestsService.create(createExchangeRequestDto, file);
  }

  @Get()
  findAll() {
    return this.exchangeRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exchangeRequestsService.findOne(+id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExchangeRequestDto: UpdateExchangeRequestDto,
  ) {
    return this.exchangeRequestsService.update(+id, updateExchangeRequestDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exchangeRequestsService.remove(+id);
  }
}
