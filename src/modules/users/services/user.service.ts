import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Repositories } from '@/common/enums';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject(Repositories.USER)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(user: Partial<User>): Promise<User> {
        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }

    async update(id: string, user: UpdateUserDto): Promise<void> {
        await this.userRepository.update(id, user);
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
