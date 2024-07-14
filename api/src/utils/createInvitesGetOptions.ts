import { InviteQuery } from "../types/helpers/inviteQuery";
import { InvitesGetOptions } from "../types/helpers/invitesGetOptions";

export const createInvitesGetOptions = (query: InviteQuery): InvitesGetOptions => {
  const { userId, city, date, order } = query;

  const whereExpression: any = {};
  const orderBy: any = {};

  if (userId) {
    whereExpression.userId = userId;
  }
  if (city) {
    whereExpression.city = {
      equals: city,
      mode: 'insensitive',
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

  if (order) {
    orderBy['dt'] = order;
  }

  return ({
    whereExpression: whereExpression,
    orderBy: orderBy
  })
}