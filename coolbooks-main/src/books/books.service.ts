import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(createBookDto: CreateBookDto, file: Express.Multer.File) {
    const result = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    return this.prisma.book.create({
      data: {
        title: createBookDto.title,
        description: createBookDto.description,
        price: createBookDto.price,
        tag: createBookDto.tag,
        copyright: createBookDto.copyright,
        cover: result.secure_url,
        isbn: createBookDto.isbn,
      },
    });
  }

  async findAll() {
    const result = await this.prisma.book.findMany();
    return { data: result };
  }

  async findOne(id: number) {
    const result = await this.prisma.book.findUnique({ where: { id } });
    return { data: result };
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const result = await this.prisma.book.update({
      where: {
        id,
      },
      data: {
        ...updateBookDto,
      },
    });

    return { data: result };
  }

  async remove(id: number) {
    const result = await this.prisma.book.delete({ where: { id } });
    return { data: result };
  }
}
