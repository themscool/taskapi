import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    // Register a new user
    async register(registerDto: RegisterDto) {
        const user = await this.userService.getUserByEmail(registerDto.email);
        if (user) {
            throw new ConflictException('Email already exists');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);
        registerDto.password = hashedPassword;
        const createdUser = await this.userService.createUser({
            ...registerDto,
            password: hashedPassword,
        });
        return { createdUser };
    }
}
