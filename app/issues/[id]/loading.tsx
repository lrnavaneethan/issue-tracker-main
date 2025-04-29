import { Box, Card, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetailsPage = () => {
  return (
    <Box className="max-w-2xl">
      <ul>
        <Skeleton />
        <Flex gap="4" my="2">
          <Skeleton width="5rem" />
          <Skeleton width="8rem" />
        </Flex>
        <Card className="prose">
          <Skeleton count={5} />
        </Card>
      </ul>
    </Box>
  );
};

export default LoadingIssueDetailsPage;
