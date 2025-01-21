import { Sex } from "@/common/enums";
import { HealthRecord } from "@/modules/health/entities/health-record.entity";
import { Production } from "@/modules/production/entities/production.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('animals')
export class Animal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    identification: string;

    @Column()
    nickname: string;

    @Column({ type: 'date' })
    birthDate: Date;

    @Column({ type: 'enum', enum: Sex })
    sex: Sex;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    averageProduction: number;

    @Column({ type: 'jsonb', nullable: true })
    metadata: {
        breed?: string;
        origin?: string;
        notes?: string;
    };

    @OneToMany(() => Production, production => production.animal)
    productions: Production[];

    @OneToMany(() => HealthRecord, health => health.animal)
    healthRecords: HealthRecord[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', update: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}