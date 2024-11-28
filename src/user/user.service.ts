import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GenerateUserDto } from './dto/generate-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage, responseMessage } from '../utils/response-message';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService{
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>
    ) {}

  async create(createUserDto: CreateUserDto) {
    const user: User = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = createUserDto.role;
    user.createdAt = new Date();

    await this.userRepository.save(user);

    return user;
  }

  async generateUser(generateUserDto: GenerateUserDto): Promise<User | ResponseMessage> {
    try {
      const { email, password } = generateUserDto;
      const existingUser = await this.findbyEmail(email);

      if (!existingUser || existingUser === null) {
        const hashedPassword = this.hashPassword(password);

        const user: User = new User();
        user.firstName = generateUserDto.firstName;
        user.lastName = generateUserDto.lastName;
        user.email = email;
        user.password = hashedPassword;
        user.role = generateUserDto.role;
        user.state = generateUserDto.state;
        user.createdAt = new Date();

        await this.userRepository.save(user);
        
        return responseMessage(true, 'User created successfully', [], user);
      } else {
        return responseMessage(false, 'User already exists');
      }
    } catch (error) {
      return responseMessage(false, 'Error creating user', [error.message || error.toString()]);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.find();

      if (!users) {
        return responseMessage(false, 'No users found');
      }

      return responseMessage(true, 'Users found', [], users);
    } catch (error) {
      return responseMessage(false, 'Error getting users', [error.message || error.toString()]);
    }
  }

  // async getOneUser(id: string): Promise <ResponseMessage> {
  //   try {
  //     const user = await this.userRepository.findOne({ where: { id } });

  //     if (!user) {
  //       return responseMessage(false, 'User not found');
  //     }

  //     return responseMessage(true, 'User found', [], user);
  //   } catch (error) {
  //     return responseMessage(false, 'Error getting user', [error.message || error.toString()]);
  //   }
  // }

  async findbyEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email: email.toLowerCase() } });
      return user;
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({where: {id}});
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateUserDto | ResponseMessage> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        return responseMessage(false, 'User not found');
      }

      const result = await this.userRepository.update(id, updateUserDto);

      return responseMessage(true, 'User updated successfully', [], result);
    } catch (error) {
      return responseMessage(false, 'Error updating user', [error.message || error.toString()]);
    }
  }

  async updateUserProfile(id: string, updatedUserProfile: Partial<User>): Promise<User | ResponseMessage> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        return responseMessage(false, 'User not found');
      }

      Object.assign(user, updatedUserProfile);

      const result = await this.userRepository.save(user);

      return responseMessage(true, 'User profile updated successfully', [], result);
    } catch (error) {
      return responseMessage(false, 'Error updating user', [error.message || error.toString()]);
    }
  }

  async remove(id: string): Promise<ResponseMessage> {
    await this.userRepository.delete(id);
    return responseMessage(true, 'User deleted successfully', [], { id })
  }

  hashPassword(data: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(data, salt);
  }
}
