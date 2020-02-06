import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        description = "",
        fileType,
        files,
        voiceFile = "",
        voiceTime = 0,
        videoTime = 0,
        address = "",
        location = ""
      } = args;
      const post = await prisma.createPost({
        user: { connect: { id: user.id } },
        description,
        fileType,
        files: { set: files },
        voiceFile,
        voiceTime,
        videoTime,
        address,
        location
      });

      return post;
    }
  }
};
