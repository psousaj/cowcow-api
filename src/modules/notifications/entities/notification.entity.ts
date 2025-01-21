import { NotificationStatus, NotificationType } from "@/common/enums";
import { User } from "@/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('notifications')
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    user: User;

    @Column({ type: 'enum', enum: NotificationType })
    type: NotificationType;

    @Column()
    message: string;

    @Column({ type: 'enum', enum: NotificationStatus, default: NotificationStatus.PENDING })
    status: NotificationStatus;

    @Column({ type: 'timestamp', nullable: true })
    scheduledFor: Date;

    @Column({ type: 'timestamp', nullable: true })
    sentAt: Date;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', update: false })
    createdAt: Date;
}