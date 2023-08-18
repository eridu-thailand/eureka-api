import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  upsertUserCredentials(user: UserDto) {
    return this.userRepository.upsert(user);
  }
}
