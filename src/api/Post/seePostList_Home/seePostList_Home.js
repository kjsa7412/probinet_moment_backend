import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seePostList_Home: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;

      const myFollowing = await prisma.user({ id: user.id }).following();

      return prisma.posts({
        where: {
          user: {
            id_in:
              myFollowing !== undefined && myFollowing !== 0
                ? myFollowing.map(value => {
                    return value.id;
                  })
                : []
          }
        }
      });
    }
  }
};
