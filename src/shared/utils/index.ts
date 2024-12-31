import { ExpenseCategory, NotificationStatus, TransactionType } from "@/common/enums";
import { FinancialRecord } from "@/modules/financial/entities/financial-record.entity";
import { HealthRecord } from "@/modules/health/entities/health-record.entity";
import { Production } from "@/modules/production/entities/production.entity";
import { Notification } from "@/modules/notifications/entities/notification.entity";

export const animalUtils = {
    calculateAge: (birthDate: Date): number => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    },

    updateAverageProduction: (productions: Production[]): number => {
        if (!productions.length) return 0;
        const sum = productions.reduce((acc, curr) => acc + Number(curr.quantity), 0);
        return Number((sum / productions.length).toFixed(2));
    },

    getNextHealthEvent: (healthRecords: HealthRecord[]): HealthRecord | null => {
        const future = healthRecords.filter(record =>
            record.nextDate && new Date(record.nextDate) > new Date()
        );
        return future.sort((a, b) =>
            new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime()
        )[0] || null;
    }
};

export const financialUtils = {
    calculateMonthlyBalance: (records: FinancialRecord[]): number => {
        return records.reduce((acc, curr) => {
            const amount = Number(curr.amount);
            return curr.type === TransactionType.INCOME ? acc + amount : acc - amount;
        }, 0);
    },

    groupByCategory: (records: FinancialRecord[]): Record<ExpenseCategory, number> => {
        return records.reduce((acc, curr) => {
            if (curr.type === TransactionType.EXPENSE && curr.category) {
                acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
            }
            return acc;
        }, {} as Record<ExpenseCategory, number>);
    },

    getOverdueBills: (records: FinancialRecord[]): FinancialRecord[] => {
        const today = new Date();
        return records.filter(record =>
            record.type === TransactionType.EXPENSE &&
            new Date(record.date) < today
        );
    }
};

export const notificationUtils = {
    isPending: (notification: Notification): boolean => {
        return notification.status === NotificationStatus.PENDING;
    },

    isOverdue: (notification: Notification): boolean => {
        if (!notification.scheduledFor) return false;
        return new Date(notification.scheduledFor) < new Date();
    },

    shouldSendNow: (notification: Notification): boolean => {
        return notificationUtils.isPending(notification) &&
            (!notification.scheduledFor || notificationUtils.isOverdue(notification));
    }
};