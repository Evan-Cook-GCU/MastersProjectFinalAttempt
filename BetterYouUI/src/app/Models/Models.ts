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
    metrics: Metric[]; // Added relationship
}

export interface GroupMembership {
    membershipId: number;
    userId: number;
    groupId: number;
    isAdmin: boolean;
    joinedAt: Date;
    metricData: MetricData[]; // Added relationship
}
export interface Metric {
    metricId: number;
    name: string;
    fields: Field[];
    data: MetricData[];
    groupId: number; // Added foreign key relationship
}

export interface Field {
    fieldId: number;
    label: string;
    type: string;
}
export interface MetricData {
    metricDataId: number;
    metricId: number;
    Name: string;
    fields: Data[];
    date: Date; // Add the date property
    groupMembershipId: number; // Added foreign key relationship
}
export interface Data {
    label: string;
    value: number;
}
export const VALID_FIELD_TYPES: string[] = ['text', 'number', 'date', 'email', 'url', 'password', 'tel'];
export const baseUrl = 'http://localhost:44060/';