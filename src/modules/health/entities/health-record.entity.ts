import { HealthEventType } from "@/common/enums";
import { Animal } from "@/modules/animals/entities/animal.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('health_records')
export class HealthRecord {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Animal, animal => animal.healthRecords)
    animal: Animal;

    @Column({ type: 'enum', enum: HealthEventType })
    type: HealthEventType;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'date', nullable: true })
    nextDate: Date;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'jsonb', nullable: true })
    metadata: {
        medication?: string;
        dosage?: string;
        veterinarian?: string;
        cost?: number;
    };

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', update: false })
    createdAt: Date;
}