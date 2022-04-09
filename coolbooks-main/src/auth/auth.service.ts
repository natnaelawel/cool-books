import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, SigninResponse } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(body: AuthDto) {
    // generate password hash
    const hashed = await argon.hash(body.password);

    // save the new user in database

    try {
      const user = await this.prisma.user.create({
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          username: body.username,
          email: body.email,
          password: hashed,
          preferences: body.preferences,
        },
      });

      console.log(user, 'hashed passowrd');

      console.log(user, ' hello user');

      return { data: user };
    } catch (error) {
      console.log(error, ' is the error');
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentail is Taken!');
        }

        throw error;
      }
    }
  }

  async signin(body: SigninDto) {
    // find user by an email
    const user = await this.prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      throw new ForbiddenException('Credential incorrect');
    }

    // compare password
    const isMatch = await argon.verify(user.password, body.password);

    if (!isMatch) {
      throw new ForbiddenException('Credential incorrect');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<SigninResponse> {
    const payload = { sub: userId, email };

    const access_token = await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '10h',
    });

    return { access_token };
  }
}
