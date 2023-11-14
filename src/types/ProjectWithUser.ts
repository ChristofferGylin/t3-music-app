import { type Prisma } from "@prisma/client";

type ProjectWithUserEmail = Prisma.ProjectGetPayload<{
  include: {
    user: {
      select: {
        email: true;
      };
    };
  };
}>;

export default ProjectWithUserEmail;
