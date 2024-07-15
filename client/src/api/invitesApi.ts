import { app, authApp } from "../lib/axios.ts"
import Invite from "../types/entities/invite";
import { DateOrderEnum } from "../enums/dateOrderEnum.ts";
import { AddInviteRequest } from "../types/requests/addInviteRequest.ts";

const privateApiOptions = {
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
}

export const getInvitesApi = async (userId?: number, city?: string, date?: string, order?: DateOrderEnum) => {
  try {
    const response = await app.get('/invites', {
      params: { userId, city, date, order }
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

export const addInviteApi = async (addInviteRequest: AddInviteRequest): Promise<Invite | null> => {
  try {
    const invite: Invite = await authApp.post(`/invites/`, addInviteRequest, privateApiOptions);
    if (invite) {
      return invite;
    }
    return null
  } catch (error) {
    return null
  }
}

export const deleteInvitesApi = async (inviteId: number) => {
  try {
    await authApp.delete(`/invites/${inviteId}`, privateApiOptions);
  } catch (error) {
    return null;
  }
}