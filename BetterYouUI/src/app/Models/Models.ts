import { valueOrDefault } from "chart.js/dist/helpers/helpers.core";

export interface User {
    userId: number;
    userName: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
}

export interface Group {
    groupId: number;
    groupName: string;
    description: string;
    createdAt: Date;
}

export interface GroupMembership {
    membershipId: number;
    userId: number;
    groupId: number;
    isAdmin: boolean;
    joinedAt: Date;
}

export interface UserMetric {
    userMetricId: number;
    userId: number;
    metricId: number;
    metricDataId: number;
    createdAt: Date;
}

export interface Metric {
    metricId: number;
    Name: string;
    fields: Field[];
    data: MetricData[];
}

export interface Field {
    Label: string;
    Type: string;
}
export interface MetricData {
    metricDataId: number;
    metricId: number;
    Name: string;
    fields: Data[];
    date: Date; // Add the date property
}
export interface Data {
    Label: string;
    Value: number;
}
export const VALID_FIELD_TYPES: string[] = ['text', 'number', 'date', 'email', 'url', 'password', 'tel'];
