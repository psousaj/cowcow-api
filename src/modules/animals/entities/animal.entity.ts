import { Sex } from "@/common/enums";
import { HealthRecord } from "@/modules/health/entities/health-record.entity";
import { Production } from "@/modules/production/entities/production.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}