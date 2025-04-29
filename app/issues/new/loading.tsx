import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components/index";

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-2xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewIssuePage;
