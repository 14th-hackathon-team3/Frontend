import { apiRequest } from './client';

export const groupsApi = {
  completeMembershipOnboarding: (payload) =>
    apiRequest(
      '/api/groups/membership/onboarding/',
      {
        method: 'PATCH',
        body: payload,
        auth: true,
      },
    ),

  verifyInvite: (inviteCode) =>
    apiRequest(
      `/api/groups/invite/${encodeURIComponent(inviteCode)}/`,
    ),

  getNotificationSettings: () =>
    apiRequest(
      '/api/groups/membership/notification-settings/',
      {
        auth: true,
      },
    ),

  updateNotificationSettings: (payload) =>
    apiRequest(
      '/api/groups/membership/notification-settings/',
      {
        method: 'PATCH',
        body: payload,
        auth: true,
      },
    ),

  getMembers: () =>
    apiRequest('/api/groups/members/', {
      auth: true,
    }),

  // 주보호자 지정 / 해제
  setPrimaryMember: (
    membershipId,
    isPrimary,
  ) =>
    apiRequest(
      `/api/groups/members/${encodeURIComponent(
        membershipId,
      )}/primary/`,
      {
        method: 'PATCH',
        body: {
          is_primary: isPrimary,
        },
        auth: true,
      },
    ),

  removeMember: (membershipId) =>
    apiRequest(
      `/api/groups/members/${encodeURIComponent(
        membershipId,
      )}/`,
      {
        method: 'DELETE',
        auth: true,
      },
    ),

  getMyGroup: () =>
    apiRequest('/api/groups/my-group/', {
      auth: true,
    }),
};