import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    user: ({ id }) => prisma.post({ id }).user(),
    comments: ({ id }) => prisma.post({ id }).comments(),

    commentCount: parent =>
      prisma
        .commentsConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count()
  }
};
