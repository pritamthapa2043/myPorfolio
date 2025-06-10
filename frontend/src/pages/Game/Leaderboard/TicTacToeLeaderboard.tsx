import { useQuery } from "@tanstack/react-query";
import Leaderboard from "../../../components/Leaderboard/Leaderboard";
import { getLeaderboard } from "../../../api/api";

const TicTacToeLeaderboard = () => {
  const { data, refetch, isLoading, isRefetching } = useQuery({
    queryKey: ["getLeaderboard"],
    queryFn: getLeaderboard,
  });

  return (
    <Leaderboard
      data={data}
      refetch={refetch}
      isLoading={isLoading}
      isRefetching={isRefetching}
    />
  );
};

export default TicTacToeLeaderboard;
