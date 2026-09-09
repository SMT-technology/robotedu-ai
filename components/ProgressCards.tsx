import Link from "next/link";

const STAGE_META = [
  { stage: 1, title: "아이디어 보드", href: "/stage1-hw" },
  { stage: 2, title: "메이킹 일지", href: "/stage2-build" },
  { stage: 3, title: "SW 구동 도우미", href: "/stage3-sw" },
  { stage: 4, title: "AI 기술 탑재", href: "/stage4-ai" },
];

const STATUS_LABEL: Record<string, string> = {
  not_started: "미시작",
  in_progress: "진행중",
  done: "완료",
};

const STATUS_STYLE: Record<string, string> = {
  not_started: "bg-gray-100 text-gray-600",
  in_progress: "bg-yellow-100 text-yellow-800",
  done: "bg-green-100 text-green-800",
};

export default function ProgressCards({
  progress,
}: {
  progress: { stage: number; status: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {STAGE_META.map((meta) => {
        const status = progress.find((p) => p.stage === meta.stage)?.status ?? "not_started";
        return (
          <Link
            key={meta.stage}
            href={meta.href}
            className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm hover:border-blue-300"
          >
            <p className="text-xs text-gray-500">Stage {meta.stage}</p>
            <p className="text-sm font-medium">{meta.title}</p>
            <span
              className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[status]}`}
            >
              {STATUS_LABEL[status]}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
