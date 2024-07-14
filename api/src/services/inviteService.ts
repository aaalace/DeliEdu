import prisma from "../db/prisma";
import Invite from "../types/entitites/invite";
import AddInviteRequest from "../types/requests/addInviteRequest";
import { InviteQuery } from "../types/helpers/inviteQuery";
import InviteResponse from "../types/responses/inviteResponse";
import { InvitesGetOptions } from "../types/helpers/invitesGetOptions";
import { createInvitesGetOptions } from "../utils/createInvitesGetOptions";

class InviteService {
  async getInvites(query: InviteQuery): Promise<InviteResponse[]> {

    const options: InvitesGetOptions = createInvitesGetOptions(query);

    const invites: any[] = await prisma.invite.findMany({
      where: options.whereExpression,
      orderBy: options.orderBy,
      include: {
        user: true,
      },
    });

    return invites.map((invite) => ({
      id: invite.id,
      userId: invite.userId,
      city: invite.city,
      dt: invite.dt,
      description: invite.description,
      contacts: invite.contacts,
      authorName: invite.user.name,
    }));
  }

  async addInvite(addInviteRequest: AddInviteRequest, userId: number): Promise<Invite> {
    const newInvite: any = await prisma.invite.create({
      data: {
        userId: userId,
        city: addInviteRequest.city,
        dt: addInviteRequest.dt,
        description: addInviteRequest.description,
        contacts: addInviteRequest.contacts
      }
    });
    if (!newInvite) throw Error('error in creating invite instance');

    return newInvite;
  }

  async deleteInvite(inviteId: number, userId: number): Promise<void> {
    await prisma.invite.delete({ where: {id: inviteId, userId: userId} });
  }
}

export default InviteService;