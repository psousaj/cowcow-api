export enum Role {
    OWNER = 'owner',
    OPERATOR = 'operator'
}

export enum Sex {
    MALE = 'male',
    FEMALE = 'female'
}

export enum HealthEventType {
    VACCINATION = 'vaccination',
    DEWORMING = 'deworming',
    DISEASE = 'disease',
    BREEDING = 'breeding',
    BIRTH = 'birth',
    EXAMINATION = 'examination'
}

export enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense'
}

export enum ExpenseCategory {
    OPERATIONAL = 'operational',
    MAINTENANCE = 'maintenance',
    SALARY = 'salary',
    FEED = 'feed',
    MEDICAL = 'medical',
    OTHER = 'other'
}

export enum NotificationType {
    EMAIL = 'email',
    WHATSAPP = 'whatsapp',
    SYSTEM = 'system'
}

export enum NotificationStatus {
    PENDING = 'pending',
    SENT = 'sent',
    FAILED = 'failed'
}