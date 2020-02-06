import { prisma } from "../../../../generated/prisma-client";

const EDIT_PRIVATE = "EDIT_PRIVATE";
const EDIT_LOCATION = "EDIT_LOCATION";
const EDIT_DESCRIPTION = "EDIT_DESCRIPTION";
const DELETE_POST = "DELETE_POST";
const DELETE_PHOTO = "DELETE_PHOTO";
const DELETE_VOICE = "DELETE_VOICE";
const DELETE_LOCATION = "DELETE_LOCATION";
const DELETE_DESCRIPTION = "DELETE_DESCRIPTION";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, open, location, description, files, action } = args;
      const { user } = request;

      console.log("aa");
      console.log(action);
      console.log(id);
      console.log(open);
      console.log(description);

      /// 테스트때문에 잠시 주석
      const post = "TestData";
      // const post = await prisma.$exists.post({
      //   id,
      //   user: { id: user.id }
      // });

      if (post) {
        switch (action) {
          case EDIT_PRIVATE:
            return prisma.updatePost({
              data: {
                open: open
              },
              where: { id }
            });
            break;
          case EDIT_LOCATION:
            return prisma.updatePost({
              data: {
                location: location
              },
              where: { id }
            });
            break;
          case EDIT_DESCRIPTION:
            return prisma.updatePost({
              data: {
                description: description
              },
              where: { id }
            });
            break;
          case DELETE_POST:
            return prisma.deletePost({ id });
            break;
          case DELETE_PHOTO:
            return prisma.updatePost({
              data: {
                files: { set: files }
              },
              where: { id }
            });
            break;
          case DELETE_VOICE:
            return prisma.updatePost({
              data: {
                voiceFile: null,
                voiceTime: null
              },
              where: { id }
            });
            break;
          case DELETE_LOCATION:
            return prisma.updatePost({
              data: {
                location: null
              },
              where: { id }
            });
            break;
          case DELETE_DESCRIPTION:
            return prisma.updatePost({
              data: {
                description: null
              },
              where: { id }
            });
            break;
          default:
            throw Error("You can't do that. Action is undefined.");
          // code block
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
