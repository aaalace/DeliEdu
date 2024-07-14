import { DateOrderEnum } from "../../enums/dateOrderEnum";

export interface InviteQuery {
  userId?: number,
  city?: string,
  date?: Date,
  order?: DateOrderEnum
}