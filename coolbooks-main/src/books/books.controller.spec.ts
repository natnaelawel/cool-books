import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Book } from '@prisma/client';
import { TagEnum } from 'src/constants';

describe('BooksController', () => {
  let controller: BooksController;
  let app: INestApplication;
  const books: Book[] = [
    {
      id: 1,
      title: 'some title',
      description: 'some description',
      copyright: new Date(),
      cover: '',
      price: 8,
      createdAt: new Date(),
      isbn: '',
      tag: TagEnum.BIOGRAPHY,
    },
    {
      id: 2,
      title: 'Another Book',
      description: 'some description',
      copyright: new Date(),
      cover: '',
      price: 43,
      createdAt: new Date(),
      isbn: '',
      tag: TagEnum.COMEDY,
    },
  ];
  
  let booksService = {
    findAll: () => books,
    findOne: (id) => books.find((book) => book.id === id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it(`/GET books`, () => {
    return request(app.getHttpServer()).get('/books').expect(200).expect({
      data: booksService.findAll(),
    });
  });

  it(`/GET books/{id}`, () => {
    const id = 1;
    return request(app.getHttpServer()).get(`/books/${id}`).expect(200).expect({
      data: booksService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
