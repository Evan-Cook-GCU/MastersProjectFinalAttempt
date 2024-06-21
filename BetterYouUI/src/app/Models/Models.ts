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

export interface Metric {
    metricId: number;
    metricName: string;
    metricType: string;
    description: string;
}

export interface UserMetric {
    userMetricId: number;
    userId: number;
    metricId: number;
    createdAt: Date;
}

export interface MetricData {
    metricDataId: number;
    userMetricId: number;
    dataValue: { [key: string]: number }; // Dynamic keys for metric data
    dataDate: Date;
}
export interface Metric {
    Name: string;
    fields: Field[];
}
export interface Field {
    Label: string;
    Type: string;
}
export interface MetricData2 {
    Name: string;
    fields: Data[];
    date: Date; // Add the date property
}
export interface Data {
    Label: string;
    Value: number;
}
