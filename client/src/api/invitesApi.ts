import { app, authApp } from "../lib/axios.ts"
import Invite from "../types/entities/invite";

const privateInvitesApiOptions = {
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
}

export const getInvitesApi = async (userId?: number, city?: string, date?: string) => {
  try {
    const response = await app.get('/invites', {
      params: { userId, city, date }
    });
    if (response.status == 200) {
      const data: Invite[] = response.data;
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const deleteInvitesApi = async (inviteId: number) => {
  try {
    await authApp.delete(`/invites/${inviteId}`, privateInvitesApiOptions);
  } catch (error) {
    return null;
  }
}