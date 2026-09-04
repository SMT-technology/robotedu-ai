import arduinoProfile from "@/board-profiles/arduino-uno.json";
import microbitProfile from "@/board-profiles/microbit.json";
import { getCurrentUser } from "@/lib/session";

export type BoardProfile = typeof arduinoProfile;

/**
 * Board profiles are intentionally kept out of components: every board
 * (pinout, sensors, code template, communication method) differs, so all
 * board-specific data lives in /board-profiles/*.json and is looked up here.
 */
const BOARD_PROFILES: Record<string, BoardProfile> = {
  arduino: arduinoProfile,
  microbit: microbitProfile as unknown as BoardProfile,
};

export function getBoardProfileByType(
  boardType: string | null | undefined
): BoardProfile | null {
  if (!boardType) return null;
  return BOARD_PROFILES[boardType] ?? null;
}

/** Looks up the signed-in user's board profile, based on their saved boardType. */
export async function getCurrentBoardProfile(): Promise<BoardProfile | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  return getBoardProfileByType(user.boardType);
}
