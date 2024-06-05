import React, { useState, useEffect } from "react";
import streak from "../resources/streak.png";
import submit from "../resources/Submit Questions.png";
import answer from "../resources/answer questions.png";
import defeat from "../resources/defeat.png";
import complete from "../resources/completed.png";
import { useAuth } from "../context/auth/AuthContext";

interface Achievement {
  icon: string;
  name: string;
  description: string;
  unlocked: boolean;
}

const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const authData = useAuth();

  useEffect(() => {
    const checkAchievementsRequirements = (achievements: Achievement[]) => {
      const userSubmittedQuestions = 0;
      const userAnsweredQuestions = 0;
      const userDefeatedEnemy = false;
      const userCompletedRound = false;

      // Update unlocked status based on requirements
      return achievements.map((achievement, index) => {
        if (index === 0 && authData.streak) {
          achievement.unlocked = authData.streak >= 7;
        } else if (index === 1) {
          achievement.unlocked = userSubmittedQuestions >= 10;
        } else if (index === 2) {
          achievement.unlocked = userAnsweredQuestions >= 20;
        } else if (index === 3) {
          achievement.unlocked = userDefeatedEnemy;
        } else if (index === 4) {
          achievement.unlocked = userCompletedRound;
        }
        return achievement;
      });
    };

    const fetchedAchievements: Achievement[] = [
      {
        icon: streak,
        name: "7 Day Streak",
        description: "Completed 7 days of answering questions.",
        unlocked: false,
      },
      {
        icon: submit,
        name: "10 Submitted Questions",
        description: "Submitted 10 Questions.",
        unlocked: false,
      },
      {
        icon: answer,
        name: "20 Answered Questions",
        description: "Answered 20 Questions.",
        unlocked: false,
      },
      {
        icon: defeat,
        name: "Defeated an Enemy",
        description: "Successfully defeated an Enemy in the Game.",
        unlocked: false,
      },
      {
        icon: complete,
        name: "Completed One Round",
        description: "Finished one round of the game.",
        unlocked: false,
      },
    ];

    const updatedAchievements = checkAchievementsRequirements(fetchedAchievements);
    setAchievements(updatedAchievements);
  }, [authData, authData.streak]);

  return (
    <div>
      <div className="flex flex-wrap">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`w-1/3 p-4 ${
              achievement.unlocked ? "" : "opacity-50 pointer-events-none"
            }`}
          >
            <div className="flex items-center mb-2">
              <img
                src={achievement.icon}
                alt={`Achievement ${index + 1}`}
                className="w-12 h-12 mr-2"
              />
              <span className="font-bold">{achievement.name}</span>
            </div>
            <p>{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
