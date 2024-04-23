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

  // Check if the user answered a question yesterday
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const answeredYesterday = user?.lastAnsweredTimestamp &&
    new Date(user.lastAnsweredTimestamp).toDateString() === yesterday.toDateString();

  // Check if the user answered a question today
  const answeredToday = user?.lastAnsweredTimestamp &&
    new Date(user.lastAnsweredTimestamp).toDateString() === today.toDateString();

  if (!answeredYesterday && !answeredToday) {
    // Reset streak if the user didn't answer a question yesterday or today
    return 0;
  }

  // Increase streak by 1 if the user answered a question today and yesterday
  if (answeredYesterday && answeredToday) {
    return daysDifference + 1;
  }

  return daysDifference;
}
