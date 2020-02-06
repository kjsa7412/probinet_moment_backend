import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeComments: async (_, args) => {
      const { postId } = args;

      if (postId !== undefined && postId !== "") {
        return prisma.comments({ where: { post: { id: postId } } });
      } else {
        throw Error("You can't do that. Empty ID.");
      }
    }
  }
};
