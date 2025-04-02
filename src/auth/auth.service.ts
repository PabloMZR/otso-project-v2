import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt";
@Injectable()
export class AuthService {
  
  constructor(@InjectRepository(User) private userReposiroty: Repository<User>){}
  registerUser(createUserDto: CreateUserDto){
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5)
    return this.userReposiroty.save(createUserDto) 
  }
  async loginUser(createUserDto: CreateUserDto){
    const user = await this.userReposiroty.findOne({
      where: {
        userEmail: createUserDto.userEmail
      }
    })
    if (!user) {
      throw new Error('User not found');
    }
    const match = await bcrypt.compare(createUserDto.userPassword, user.userPassword)
    if(!match) throw new UnauthorizedException("No estas autorizado")
     
  } 
}
 
