import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    following: ({ id }) => prisma.user({ id }).following(),
    followers: ({ id }) => prisma.user({ id }).followers(),
    posts: ({ id }) => prisma.user({ id }).posts(),
    rooms: ({ id }) => prisma.user({ id }).rooms(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    alarms: ({ id }) => prisma.user({ id }).alarms(),

    uncheckedAlarmsCount: ({ id }) =>
      prisma
        .alarmsConnection({
          where: { AND: [{ toUser: { id } }, { viewStatus: false }] }
        })
        .aggregate()
        .count(),

    postsCount: ({ id }) =>
      prisma
        .postsConnection({ where: { user: { id } } })
        .aggregate()
        .count(),

    followingCount: ({ id }) =>
      prisma
        .usersConnection({ where: { followers_some: { id } } })
        .aggregate()
        .count(),
    followersCount: ({ id }) =>
      prisma
        .usersConnection({ where: { following_some: { id } } })
        .aggregate()
        .count(),

    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [
            {
              id: user.id
            },
            {
              following_some: {
                id: parentId
              }
            }
          ]
        });
      } catch {
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
