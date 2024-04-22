import { User } from "./user.js";

export async function calculateStreak(userID : string) {
  const user = await User.findById(userID);

  const lastAnsweredTimestamp = user!.lastAnsweredTimestamp;
  if (!lastAnsweredTimestamp) return 0;

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get the last login date
  const lastLoginDate = new Date(lastAnsweredTimestamp);
  lastLoginDate.setHours(0, 0, 0, 0);

  // Calculate the difference in days between today and the last login date
  const timeDifference = today.getTime() - lastLoginDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}
