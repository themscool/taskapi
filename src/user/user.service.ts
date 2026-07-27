import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
 
    constructor(private readonly prisma : PrismaService) {}

    async getUserByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email } });
  }

   async createUser(registerDto: RegisterDto) {
    return await this.prisma.user.create({ data: registerDto });
  }
}
