import { ExpenseCategory, TransactionType } from "@/common/enums";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('financial_records')
export class FinancialRecord {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: TransactionType })
    type: TransactionType;

    @Column({ type: 'enum', enum: ExpenseCategory, nullable: true })
    category?: ExpenseCategory;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'date' })
    date: Date;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'jsonb', nullable: true })
    metadata: {
        invoice?: string;
        provider?: string;
        paymentMethod?: string;
    };

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', update: false })
    createdAt: Date;
}
