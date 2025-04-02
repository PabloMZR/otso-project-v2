import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  
  constructor(@InjectRepository(User) private userReposiroty: Repository<User>){}
  registerUser(createUserDto: CreateUserDto){
    return this.userReposiroty.save(createUserDto)
    
  }
}
 
