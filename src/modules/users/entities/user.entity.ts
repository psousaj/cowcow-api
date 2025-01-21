import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '@/common/enums';

@Entity('users')
@Index('idx_user_email', ['email'], { unique: true })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: false })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.OPERATOR })
    role: Role;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}