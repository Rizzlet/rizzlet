import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StreakComponent: React.FC<{ userId: string, authToken: string }> = ({ userId, authToken }) => {
  const [streak, setStreak] = useState<number | null>(null);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}/streak`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setStreak(response.data.streak);
      } catch (error) {
        console.error('Error fetching streak:', error);
      }
    };

    fetchStreak();
  }, [userId, authToken]);

  return (
    <div>
      Streak: {streak !== null ? streak : 'Loading...'}
    </div>
  );
};

export default StreakComponent;
