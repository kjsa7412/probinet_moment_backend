import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, postId } = args;
      const { user } = request;

      if (postId !== undefined && postId !== "") {
        return await prisma.createComment({
          user: {
            connect: {
              id: user.id
            }
          },
          post: {
            connect: {
              id: postId
            }
          },
          text
        });
      } else {
        throw Error("You can't do that. Empty ID.");
      }
    }
  }
};
