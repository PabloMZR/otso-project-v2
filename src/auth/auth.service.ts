import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt";
import * as jwt  from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class AuthService {
  
  constructor(@InjectRepository(User) private userReposiroty: Repository<User>,
  private jwtServisece: JwtService,
  ){}
  registerUser(createUserDto: CreateUserDto){
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5)
    return this.userReposiroty.save(createUserDto) 
  }
  async loginUser(loginUserDto: LoginUserDto){
    const user = await this.userReposiroty.findOne({
      where: {
        userEmail: loginUserDto.userEmail
      }
    })
    if (!user) {
      throw new Error('User not found');
    }
    const match = await bcrypt.compare(loginUserDto.userPassword, user.userPassword)
    if(!match) throw new UnauthorizedException("No estas autorizado")
    const payload = {
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userRoles: user.userRoles
    }
    const token = this.jwtServisece.sign(payload);
    return token
  } 
}
 
