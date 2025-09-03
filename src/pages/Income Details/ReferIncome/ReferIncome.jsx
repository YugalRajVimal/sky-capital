import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../../context/CustomerContext";
import { Link } from "react-router-dom";

const ReferIncome = () => {
  const { getTeamDetails } = useContext(CustomerContext);
  const [levelTeams, setLevelTeams] = useState({});

  const levelIncome = [0.5, 0.3, 0.2];

  useEffect(() => {
    const fetchLevelTeam = async () => {
      try {
        const data = await getTeamDetails(1);
        setLevelTeams(data.levels || {});
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
    <div className="grow-1 w-full h-full mt-2  p-3 sm:p-5 rounded-2xl bg-[#030626] shadow-lg overflow-y-auto">
      <h2 className="text-base sm:text-xl font-semibold  text-white pr-6 py-3 rounded-t-md">
        🏆 Level Team Income
      </h2>

      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full table-auto text-sm text-center border-t">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="p-3">Level</th>
              <th className="p-3">Team</th>
              {/* <th className="p-3">Income</th> */}
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {levels.map(({ level, teamCount }, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "bg-gray-50" : "bg-white hover:bg-gray-100"
                }
              >
                <td className="p-3">{level + 1}</td>
                <td className="p-3">{teamCount}</td>
                {/* <td className="p-3">
                  ${(teamCount * levelIncome[index] ).toFixed(2)}
                </td> */}

                <td className="p-3">
                  <Link
                    to={`/refer-team-income/${level}`}
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

export default ReferIncome;
