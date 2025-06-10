// components/Leaderboard.tsx
import React from "react";
import "./leaderboard.scss";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

type LeaderboardEntry = {
  player_id: number;
  username: string;
  matches_played: string;
  wins: string;
  losses: string;
  draws: string;
  points: string;
};

type LeaderboardProps = {
  data: LeaderboardEntry[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, Error>>;
  isLoading: boolean;
  isRefetching?: boolean; // Optional: if you want to show separate refetching state
};

const Leaderboard: React.FC<LeaderboardProps> = ({
  data,
  refetch,
  isLoading,
  isRefetching,
}) => {
  if (isLoading) {
    return (
      <div className="leaderboard">
        <h2 className="leaderboard__title">🏆 Leaderboard</h2>
        <div className="leaderboard__loading">Loading leaderboard data...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="leaderboard">
        <h2 className="leaderboard__title">🏆 Leaderboard</h2>
        <div className="leaderboard__error">
          No leaderboard data available
          <button
            onClick={() => refetch()}
            className="leaderboard__refresh-btn"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <div className="leaderboard__header">
        <h2 className="leaderboard__title">🏆 Leaderboard</h2>
        <button
          onClick={() => refetch()}
          className="leaderboard__refresh-btn"
          disabled={isRefetching}
        >
          {isRefetching ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      <div className="leaderboard__table-container">
        {isRefetching && (
          <div className="leaderboard__refetching">
            Updating leaderboard data...
          </div>
        )}
        <table className="leaderboard__table">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Username</th>
              <th>Matches Played</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Draws</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {data
              .sort((a, b) => parseInt(b.points) - parseInt(a.points))
              .map((player, index) => (
                <tr key={player.player_id}>
                  <td>{index + 1}</td>
                  <td>{player.username}</td>
                  <td>{player.matches_played}</td>
                  <td>{player.wins}</td>
                  <td>{player.losses}</td>
                  <td>{player.draws}</td>
                  <td>{player.points}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
