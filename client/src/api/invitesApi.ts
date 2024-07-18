import { app, authApp } from "../lib/axios.ts"
import Invite from "../types/entities/invite.ts";
import { DateOrderEnum } from "../enums/dateOrderEnum.ts";
import { AddInviteRequest } from "../types/requests/addInviteRequest.ts";

const privateApiOptions = {
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
}

export const getInvitesApi = async (
  userId?: number,
  city?: string,
  date?: string,
  order?: DateOrderEnum
): Promise<[boolean, (Invite[] | string)]> => {
  try {
    const response = await app.get('/invites', {
      params: { userId, city, date, order }
    });
    return [true, response.data];
  } catch (error: any) {
    return [false, error.response?.data.message || "internal server error"];
  }
}

export const addInviteApi = async (addInviteRequest: AddInviteRequest): Promise<[boolean, (Invite | string)]> => {
  try {
    const response = await authApp.post(`/invites/`, addInviteRequest, privateApiOptions);
    return [true, response.data];
  } catch (error: any) {
    return [false, error.response?.data.message || "internal server error"];
  }
}

export const deleteInvitesApi = async (inviteId: number): Promise<[boolean, string?]> => {
  try {
    await authApp.delete(`/invites/${inviteId}`, privateApiOptions);
    return [true, ''];
  } catch (error: any) {
    return [false, error.response?.data.message || "internal server error"];
  }
}