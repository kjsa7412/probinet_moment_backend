import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeOnePost: async (_, args) => {
      const { id } = args;
      console.log(id);
      return prisma.post({ id });
    }
  }
};
