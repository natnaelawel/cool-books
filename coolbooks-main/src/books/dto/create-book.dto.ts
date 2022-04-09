import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TagEnum } from 'src/constants';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  isbn: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  cover: any;

  @ApiProperty({ enum: TagEnum, default: TagEnum.ALL })
  @IsNotEmpty({ message: 'tag must not be empty' })
  tag: any;

  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: Date, default: new Date() })
  @IsNotEmpty()
  copyright: Date;
}
