import { Prisma } from "@prisma/client";

type ProjectWithKits = Prisma.ProjectGetPayload<{
  include: {
    drumsKits: true;
  };
}>;

export default ProjectWithKits;
