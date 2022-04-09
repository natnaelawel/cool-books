import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  const users = [
    {
      firstName: 'John',
      lastName: 'Doe',
      username: 'john123',
      email: 'john.doe@email.com',
      password: 'password',
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'jane123',
      email: 'jane.doe@email.com',
      password: 'password',
    }
  ];
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .then((_res) => {
    console.log('done!');
  })
  .catch((e) => {
    console.error(e, 'is the error');
  });
