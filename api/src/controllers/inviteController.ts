import { NextFunction, Request, Response } from "express";
import InviteService from "../services/inviteService";
import Invite from "../types/entitites/invite";
import { validationResult } from "express-validator";
import { InviteQuery } from "../types/helpers/inviteQuery";
import { AddInviteBody } from "../types/requests/addInviteBody";
import AddInviteRequest from "../types/requests/addInviteRequest";
import InviteResponse from "../types/responses/inviteResponse";
import { DateOrderEnum } from "../enums/dateOrderEnum";

class InviteController {
  async getInvites(req: Request<{}, {}, {}, InviteQuery>, res: Response, next: NextFunction) {
    try {
      const inviteService = new InviteService();

      const query: InviteQuery = {
        userId: req.query.userId ? Number(req.query.userId) : undefined,
        city: req.query.city as string | undefined,
        date: req.query.date ? new Date(req.query.date as unknown as string) : undefined,
        order: req.query.order as DateOrderEnum | undefined
      };
      const invites: InviteResponse[] = await inviteService.getInvites(query);

      return res.status(200).json(invites);
    } catch (error) {
      next(error);
    }
  }

  async addInvite(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next(Error(errors.array()[0].msg));

      const inviteService = new InviteService();

      const { userFromToken, dt, ...rest }: AddInviteBody = req.body;
      const addInviteRequest: AddInviteRequest  = {
        ...rest,
        dt: new Date(dt)
      };
      const invite: Invite = await inviteService.addInvite(addInviteRequest, Number(userFromToken.id));

      return res.status(200).json({
        ...invite
      })
    } catch (error) {
      next(error);
    }
  }

  async deleteInvite(req: Request, res: Response, next: NextFunction) {
    try {
      const inviteService = new InviteService();

      const {inviteId} = req.params;
      const {userFromToken} = req.body;
      await inviteService.deleteInvite(Number(inviteId), Number(userFromToken.id));

      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }
}

export default InviteController;