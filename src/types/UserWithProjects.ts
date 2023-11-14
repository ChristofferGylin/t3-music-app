import { type Prisma } from "@prisma/client";

type UserWithProjects = Prisma.UserGetPayload<{
  include: {
    projects: {
      select: {
        id: true;
        name: true;
        created: true;
        updated: true;
      };
    };
  };
}>;

export default UserWithProjects;
