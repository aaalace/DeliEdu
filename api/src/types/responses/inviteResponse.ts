import Invite from "../entitites/invite";

interface InviteResponse extends Invite {
  authorName: string,
}

export default InviteResponse;