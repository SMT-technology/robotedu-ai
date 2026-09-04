import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role === "teacher") {
    redirect("/dashboard");
  }

  if (!user.boardType) {
    redirect("/onboarding");
  }

  redirect("/stage1-hw");
}
