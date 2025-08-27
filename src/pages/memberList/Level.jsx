import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import { Link } from "react-router-dom";

const LevelTeamTable = () => {
  const { getTeamDetails } = useContext(CustomerContext);
  const [levelTeams, setLevelTeams] = useState({});

  useEffect(() => {
    const fetchLevelTeam = async () => {
      try {
        const data = await getTeamDetails(1);
        const levelsData = data.levels || {};

        const filteredLevels = {};

        // Loop through each level (0 to 9)
        for (const level in levelsData) {
          const entries = levelsData[level];

          // Filter entries that have a 'user' object and 'subscribed' === true
          const subscribedUsers = entries.filter(
            (entry) => entry.user?.subscribed === true
          );

          // Assign filtered entries back to this level
          filteredLevels[level] = subscribedUsers;
        }

        // Now you have only subscribed users
        setLevelTeams(filteredLevels);
      } catch (error) {
        console.error("Error fetching level team data:", error);
      }
    };

    fetchLevelTeam();
  }, []);

  const levels = Array.from({ length: 3 }, (_, i) => ({
    level: i,
    teamCount: levelTeams[i]?.length || 0,
  }));

  return (
    <div className="grow-1 w-full h-full mt-2 p-3 sm:p-5 rounded-2xl bg-[#20265d] shadow-lg overflow-y-auto">
      <h2 className="text-xl font-semibold  text-white px-6 py-3">
        🏆 Level Team
      </h2>

      <div className="overflow-y-scroll rounded-md h-[85%]">
        <table className="min-w-full table-auto text-sm text-center border-t rounded-md overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="p-3">S.No</th>
              <th className="p-3">Team Count</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="rounded-md">
            {levels.map(({ level, teamCount }, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "bg-gray-50" : "bg-white hover:bg-gray-100"
                }
              >
                <td className="p-3">{level + 1}</td>
                <td className="p-3">{teamCount}</td>
                <td className="p-3">
                  <Link
                    to={`/level-team/${level}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View Team
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LevelTeamTable;
