import { Animal } from "@/modules/animals/entities/animal.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('productions')
export class Production {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Animal, animal => animal.productions)
    animal: Animal;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    quantity: number;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'jsonb', nullable: true })
    metadata: {
        quality?: string;
        notes?: string;
    };

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}