import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { ConflictException } from '@nestjs/common';



@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    // Register a new user
    async register(registerDto: RegisterDto) {
        const user = await this.userService.getUserByEmail(registerDto.email);
        if (user) {
            throw new ConflictException('Email already exists');
        }
        return {user};
    }
}
