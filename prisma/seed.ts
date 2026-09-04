import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const STUDENT_NAMES = [
  "김민준", "이서연", "박도윤", "최지우", "정하은",
  "강시우", "조은우", "윤서아", "장하윤", "임지호",
  "한소율", "오준서", "서예은", "신도현", "권나은",
  "황건우", "안수아", "송민서", "전유준", "홍채원",
  "배현우", "노지안", "문서준", "양다인",
];

const BOARD_TYPES = ["arduino", "microbit"] as const;
const STAGE_STATUSES = ["not_started", "in_progress", "done"] as const;

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[seed % arr.length];
}

async function main() {
  console.log("Seeding database...");

  await prisma.submission.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.class.deleteMany();

  const teacher = await prisma.user.create({
    data: {
      email: "teacher1@robotedu.test",
      name: "김선생",
      role: "teacher",
    },
  });

  const klass = await prisma.class.create({
    data: {
      teacherId: teacher.id,
      name: "6학년 2반 로봇반",
    },
  });

  await prisma.user.update({
    where: { id: teacher.id },
    data: { classId: klass.id },
  });

  for (let i = 0; i < STUDENT_NAMES.length; i++) {
    const name = STUDENT_NAMES[i];
    const boardType = pick(BOARD_TYPES, i);

    const student = await prisma.user.create({
      data: {
        email: `student${i + 1}@robotedu.test`,
        name,
        role: "student",
        classId: klass.id,
        boardType: i % 5 === 0 ? null : boardType, // a few haven't onboarded yet
      },
    });

    // Give each student a somewhat realistic, staggered progress pattern.
    for (let stage = 1; stage <= 4; stage++) {
      let status: (typeof STAGE_STATUSES)[number] = "not_started";
      const progressLevel = i % 6; // 0..5, how far this student generally is

      if (stage < progressLevel) status = "done";
      else if (stage === progressLevel) status = "in_progress";

      await prisma.progress.create({
        data: {
          userId: student.id,
          stage,
          status,
        },
      });
    }
  }

  console.log("Seed complete:", {
    teacher: teacher.email,
    class: klass.name,
    students: STUDENT_NAMES.length,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
