import prisma from "../db/prisma";
import Invite from "../types/entitites/invite";
import AddInviteRequest from "../types/requests/addInviteRequest";
import { InviteQuery } from "../types/helpers/inviteQuery";

class InviteService {
  async getInvites(query: InviteQuery): Promise<any> {
    const { userId, city, date } = query;

    const whereExpression: any = {};
    if (userId) {
      whereExpression.userId = userId;
    }
    if (city) {
      whereExpression.city = {
        equals: city,
        mode: 'insensitive', // Нечувствительность к регистру
      };
    }
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);

      whereExpression.dt = {
        gte: startOfDay,
        lt: endOfDay,
      };
    }

    return prisma.invite.findMany({
      where: whereExpression,
    });
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
    if (!newInvite) throw Error('error in creating inviteElement instance');

    return newInvite;
  }

  async deleteInvite(inviteId: number, userId: number): Promise<void> {
    await prisma.invite.delete({ where: {id: inviteId, userId: userId} });
  }
}

export default InviteService;