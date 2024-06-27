import { Group, GroupMembership, Metric, MetricData, User } from "../../../Models/Models";

export const MOCK_USERS: User[] = [
  {
    userId: 1,
    userName: 'JohnDoe',
    email: 'johndoe@example.com',
    passwordHash: 'tset', // Mocked hash
    createdAt: new Date('2022-01-01T10:00:00Z')
  },
  {
    userId: 2,
    userName: 'JaneSmith',
    email: 'janesmith@example.com',
    passwordHash: '5d41402abc4b2a76b9719d911017c592', // Mocked hash
    createdAt: new Date('2022-02-01T11:00:00Z')
  },
  {
    userId: 3,
    userName: 'AliceJohnson',
    email: 'alicejohnson@example.com',
    passwordHash: '7c6a180b36896a0a8c02787eeafb0e4c', // Mocked hash
    createdAt: new Date('2022-03-01T12:00:00Z')
  }
];

export const MOCK_GROUPS: Group[] = [
  {
    groupId: 1,
    groupName: 'Admin',
    description: 'Administrators Group',
    createdAt: new Date('2022-01-01T10:00:00Z'),
    metrics: []
  },
  {
    groupId: 2,
    groupName: 'Users',
    description: 'Regular Users Group',
    createdAt: new Date('2022-02-01T11:00:00Z'),
    metrics: []
  }
];

export const MOCK_GROUP_MEMBERSHIPS: GroupMembership[] = [
  {
    membershipId: 1,
    userId: 1,
    groupId: 1,
    isAdmin: true,
    joinedAt: new Date('2022-01-01T10:00:00Z'),
    metricData: []
  },
  {
    membershipId: 2,
    userId: 2,
    groupId: 2,
    isAdmin: false,
    joinedAt: new Date('2022-02-01T11:00:00Z'),
    metricData: []
  },
  {
    membershipId: 3,
    userId: 2,
    groupId: 1,
    isAdmin: false,
    joinedAt: new Date('2022-02-01T11:00:00Z'),
    metricData: []
  },
  {
    membershipId: 4,
    userId: 3,
    groupId: 1,
    isAdmin: false,
    joinedAt: new Date('2022-03-01T12:00:00Z'),
    metricData: []
  }
];

export const MOCK_METRICS: Metric[] = [
  {
    metricId: 1,
    Name: 'Performance',
    fields: [{ Label: 'Score', Type: 'number' }],
    data: [],
    groupId: 1
  },
  {
    metricId: 2,
    Name: 'Attendance',
    fields: [{ Label: 'Days Present', Type: 'number' }],
    data: [],
    groupId: 2
  },
  {
    metricId: 3,
    Name: 'Quality',
    fields: [{ Label: 'Rating', Type: 'number' }],
    data: [],
    groupId: 1
  }
];

export const MOCK_METRIC_DATA: MetricData[] = [
  // John Doe's Data Points for Performance
  {
    metricDataId: 1,
    metricId: 1,
    Name: 'John Doe Performance 1',
    fields: [{ Label: 'Score', Value: 85 }],
    date: new Date('2023-01-01T10:00:00Z'),
    groupMembershipId: 1
  },
  {
    metricDataId: 2,
    metricId: 1,
    Name: 'John Doe Performance 2',
    fields: [{ Label: 'Score', Value: 90 }],
    date: new Date('2023-01-15T10:00:00Z'),
    groupMembershipId: 1
  },
  {
    metricDataId: 3,
    metricId: 1,
    Name: 'John Doe Performance 3',
    fields: [{ Label: 'Score', Value: 88 }],
    date: new Date('2023-01-30T10:00:00Z'),
    groupMembershipId: 1
  },

  // John Doe's Data Points for Quality
  {
    metricDataId: 11,
    metricId: 3,
    Name: 'John Doe Quality 1',
    fields: [{ Label: 'Rating', Value: 4 }],
    date: new Date('2023-01-05T10:00:00Z'),
    groupMembershipId: 1
  },
  {
    metricDataId: 12,
    metricId: 3,
    Name: 'John Doe Quality 2',
    fields: [{ Label: 'Rating', Value: 5 }],
    date: new Date('2023-01-20T10:00:00Z'),
    groupMembershipId: 1
  },
  {
    metricDataId: 13,
    metricId: 3,
    Name: 'John Doe Quality 3',
    fields: [{ Label: 'Rating', Value: 4 }],
    date: new Date('2023-01-25T10:00:00Z'),
    groupMembershipId: 1
  },

  // Jane Smith's Data Points for Performance
  {
    metricDataId: 4,
    metricId: 1,
    Name: 'Jane Smith Performance 1',
    fields: [{ Label: 'Score', Value: 75 }],
    date: new Date('2023-02-01T11:00:00Z'),
    groupMembershipId: 3
  },
  {
    metricDataId: 5,
    metricId: 1,
    Name: 'Jane Smith Performance 2',
    fields: [{ Label: 'Score', Value: 80 }],
    date: new Date('2023-02-15T11:00:00Z'),
    groupMembershipId: 3
  },
  {
    metricDataId: 6,
    metricId: 1,
    Name: 'Jane Smith Performance 3',
    fields: [{ Label: 'Score', Value: 78 }],
    date: new Date('2023-02-28T11:00:00Z'),
    groupMembershipId: 3
  },

  // Jane Smith's Data Points for Quality
  {
    metricDataId: 14,
    metricId: 3,
    Name: 'Jane Smith Quality 1',
    fields: [{ Label: 'Rating', Value: 3 }],
    date: new Date('2023-02-05T11:00:00Z'),
    groupMembershipId: 3
  },
  {
    metricDataId: 15,
    metricId: 3,
    Name: 'Jane Smith Quality 2',
    fields: [{ Label: 'Rating', Value: 4 }],
    date: new Date('2023-02-20T11:00:00Z'),
    groupMembershipId: 3
  },
  {
    metricDataId: 16,
    metricId: 3,
    Name: 'Jane Smith Quality 3',
    fields: [{ Label: 'Rating', Value: 3 }],
    date: new Date('2023-02-25T11:00:00Z'),
    groupMembershipId: 3
  },

  // Alice Johnson's Data Points for Performance
  {
    metricDataId: 7,
    metricId: 1,
    Name: 'Alice Johnson Performance 1',
    fields: [{ Label: 'Score', Value: 95 }],
    date: new Date('2023-03-01T12:00:00Z'),
    groupMembershipId: 4
  },
  {
    metricDataId: 8,
    metricId: 1,
    Name: 'Alice Johnson Performance 2',
    fields: [{ Label: 'Score', Value: 92 }],
    date: new Date('2023-03-15T12:00:00Z'),
    groupMembershipId: 4
  },
  {
    metricDataId: 9,
    metricId: 1,
    Name: 'Alice Johnson Performance 3',
    fields: [{ Label: 'Score', Value: 94 }],
    date: new Date('2023-03-30T12:00:00Z'),
    groupMembershipId: 4
  },

  // Alice Johnson's Data Points for Quality
  {
    metricDataId: 17,
    metricId: 3,
    Name: 'Alice Johnson Quality 1',
    fields: [{ Label: 'Rating', Value: 5 }],
    date: new Date('2023-03-05T12:00:00Z'),
    groupMembershipId: 4
  },
  {
    metricDataId: 18,
    metricId: 3,
    Name: 'Alice Johnson Quality 2',
    fields: [{ Label: 'Rating', Value: 4 }],
    date: new Date('2023-03-20T12:00:00Z'),
    groupMembershipId: 4
  },
  {
    metricDataId: 19,
    metricId: 3,
    Name: 'Alice Johnson Quality 3',
    fields: [{ Label: 'Rating', Value: 5 }],
    date: new Date('2023-03-25T12:00:00Z'),
    groupMembershipId: 4
  },

  // Original Data for Jane Smith in the Users group
  {
    metricDataId: 10,
    metricId: 2,
    Name: 'Jane Smith Attendance',
    fields: [{ Label: 'Days Present', Value: 20 }],
    date: new Date('2023-02-01T11:00:00Z'),
    groupMembershipId: 2
  }
];