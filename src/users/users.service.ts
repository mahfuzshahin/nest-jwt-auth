import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

// Define a simple type for the public user data
type PublicUser = Omit<User, 'passwordHash' | 'hashPassword'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  // ✅ CORRECTED RETURN TYPE and IMPLEMENTATION
  async create(createUserDto: CreateUserDto): Promise<PublicUser> {
    const existingUser = await this.findOne(createUserDto.username);
    if (existingUser) {
      // 2. If user exists, throw a 409 Conflict error
      throw new ConflictException('User already exists');
    }
    const user = this.usersRepository.create({
      username: createUserDto.username,
      passwordHash: createUserDto.password,
    });

    const savedUser = await this.usersRepository.save(user);

    // This creates a new, plain object without the password hash.
    // It's safe and satisfies the PublicUser return type.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = savedUser;
    return result;
  }
}