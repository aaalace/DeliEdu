import prisma from "../db/prisma";
import UserRequest from "../types/requests/userRequest";
import bcrypt from "bcrypt";

class UserService {
  async getAll() {
    return prisma.user.findMany();
  }

  async getUser(userId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw Error('user not found');

    return user;
  }

  async addUser(userRequest: UserRequest) {
    const user = await prisma.user.findFirst({ where: { email: userRequest.email } });
    if (user) throw Error('user is already exists');

    const hash = bcrypt.hash(userRequest.password, 3);
    const newUser = await prisma.user.create({
      data: {
        name: userRequest.name,
        email: userRequest.email,
        password: hash.toString()
      }
    });
    if (!newUser) throw Error('error in creating user instance');

    return newUser;
  }
}

export default UserService;