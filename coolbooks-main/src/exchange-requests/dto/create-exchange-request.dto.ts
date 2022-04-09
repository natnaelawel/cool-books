import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TagEnum } from 'src/constants';

export class CreateExchangeRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(500)
  short_desc: string;

  @ApiProperty({ enum: TagEnum, default: TagEnum.ALL })
  @IsNotEmpty()
  tag: string;

  @ApiProperty({ enum: TagEnum, default: TagEnum.ALL })
  @IsNotEmpty()
  tag_looking: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  picture: any;

  userId?: any;
}
