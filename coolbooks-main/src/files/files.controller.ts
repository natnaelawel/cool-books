import { Controller, Delete, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetFileDto } from './dto/find-file.dto';

@ApiTags('files')
@Controller('files')
export class FilesController {
  @Get(':path')
  getFile(@Param('path') image: GetFileDto, @Res() res) {
    console.log('image ', image);
    return res.sendFile(image, { root: 'src/uploads/images' });
  }

  @Delete(':path')
  deleteFile(@Param('path') path: string, @Res() res) {
    return res.sendFile(path, { root: 'src/uploads/images' });
  }
}
