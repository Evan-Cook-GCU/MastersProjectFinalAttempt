export interface UserDTO {
    userId: number;
    userName: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
}
export interface GroupDTO {
    groupId: number;
    groupName: string;
    description: string;
    createdAt: Date;
}
export interface GroupMembershipDTO {
    membershipId: number;
    userId: number;
    groupId: number;
    isAdmin: boolean;
    joinedAt: Date;
}
export interface MetricDTO {
    metricId: number;
    name: string;
    groupId: number;
}
export interface FieldDTO {
    fieldId: number;
    label: string;
    type: string;
    metricId: number;
}export interface MetricDataDTO {
    metricDataId: number;
    metricId: number;
    name: string;
    date: Date;
    groupMembershipId: number;
}export interface DataDTO {
    dataId: number;
    label: string;
    value: number;
    metricDataId: number;
}


