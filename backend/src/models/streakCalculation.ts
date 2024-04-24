import { User } from "./user.js";

export async function calculateStreak(userID: string): Promise<number> {
  const user = await User.findById(userID);

  const lastAnsweredTimestamp = user?.lastAnsweredTimestamp;
  if (!lastAnsweredTimestamp) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastLoginDate = new Date(lastAnsweredTimestamp);
  lastLoginDate.setHours(0, 0, 0, 0);

  const timeDifference = today.getTime() - lastLoginDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Check if the user has a streakStartTimestamp
  if (!user.streakStartTimestamp) {
    // If not, set the streakStartTimestamp to today
    user.streakStartTimestamp = today;
    await user.save();
    return 1; // Starting a new streak
  }

  // Check if the streakStartTimestamp is today
  const streakStart = new Date(user.streakStartTimestamp);
  streakStart.setHours(0, 0, 0, 0);

  if (streakStart.getTime() === today.getTime()) {
    // Continuing the streak, so return the current streak count
    return user.streakCount;
  }

  // Check if the streakStartTimestamp was yesterday
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  if (streakStart.getTime() === yesterday.getTime()) {
    // Increase streak by 1 if the streak was started yesterday
    user.streakCount += 1;
  } else {
    // Reset streak if streakStartTimestamp is not today or yesterday
    user.streakCount = 1;
  }

  // Update the streakStartTimestamp to today
  user.streakStartTimestamp = today;
  await user.save();

  return user.streakCount;
}
