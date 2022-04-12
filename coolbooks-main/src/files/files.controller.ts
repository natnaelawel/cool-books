import { Controller, Delete, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetFileDto } from './dto/find-file.dto';

@ApiTags('files')
@Controller('files')
export class FilesController {
  
}
