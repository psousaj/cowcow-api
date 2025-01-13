
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
    ) { }

    async create(notification: Notification): Promise<Notification> {
        return this.notificationRepository.save(notification);
    }

    async findAll(): Promise<Notification[]> {
        return this.notificationRepository.find();
    }

    async findOne(id: string): Promise<Notification> {
        return this.notificationRepository.findOne({ where: { id } });
    }

    async update(id: string, notification: Notification): Promise<void> {
        await this.notificationRepository.update(id, notification);
    }

    async remove(id: string): Promise<void> {
        await this.notificationRepository.delete(id);
    }
}