import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { RSVP, InviteCode } from '../backend';

// Check if current user is admin
export function useIsCurrentUserAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCurrentUserAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// Submit RSVP (public)
export function useSubmitRSVP() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      inviteCode,
    }: {
      name: string;
      inviteCode: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      // Backend still requires attending parameter, default to true
      return actor.submitRSVP(name, true, inviteCode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allRSVPs'] });
      queryClient.invalidateQueries({ queryKey: ['inviteCodes'] });
    },
  });
}

// Get all RSVPs (admin only)
export function useGetAllRSVPs() {
  const { actor, isFetching } = useActor();

  return useQuery<RSVP[]>({
    queryKey: ['allRSVPs'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllRSVPs();
    },
    enabled: !!actor && !isFetching,
  });
}

// Get invite codes (admin only)
export function useGetInviteCodes() {
  const { actor, isFetching } = useActor();

  return useQuery<InviteCode[]>({
    queryKey: ['inviteCodes'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getInviteCodes();
    },
    enabled: !!actor && !isFetching,
  });
}

// Generate invite code (admin only)
export function useGenerateInviteCode() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.generateInviteCode();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inviteCodes'] });
    },
  });
}
