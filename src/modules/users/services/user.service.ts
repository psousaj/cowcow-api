import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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

    async update(id: string, updateduser: UpdateUserDto): Promise<User> {
        if (!await this.userRepository.existsBy({ id })) {
            throw new BadRequestException('Usuário não encontrado');
        }

        // Do not update user if it is empty or if the password is being updated
        if (Object.keys(updateduser).length === 0 || updateduser.password) {
            return
        }

        await this.userRepository.update(id, updateduser)
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
