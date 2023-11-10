import { useRouter } from "next/router";
import Loading from "~/components/LoadingPage/Loading";
import ProjectLoader from "~/components/LoadingPage/ProjectLoader";

const Loader = () => {
  const router = useRouter();

  if (!router?.query?.id || typeof router?.query?.id !== "string")
    return <Loading />;

  const projectId = router.query.id;

  return (
    <>
      <ProjectLoader projectId={projectId} />
      <Loading />
    </>
  );
};

export default Loader;
