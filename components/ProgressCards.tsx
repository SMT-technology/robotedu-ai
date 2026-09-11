import Link from "next/link";

const STAGE_META = [
  { stage: 1, title: "아이디어 보드", href: "/stage1-hw", icon: "💡" },
  { stage: 2, title: "메이킹 일지", href: "/stage2-build", icon: "🛠️" },
  { stage: 3, title: "SW 구동 도우미", href: "/stage3-sw", icon: "💻" },
  { stage: 4, title: "AI 기술 탑재", href: "/stage4-ai", icon: "🤖" },
];

const STATUS_LABEL: Record<string, string> = {
  not_started: "미시작",
  in_progress: "진행중",
  done: "완료",
};

const STATUS_STYLE: Record<string, string> = {
  not_started: "bg-slate-100 text-slate-600",
  in_progress: "bg-amber-100 text-amber-800",
  done: "bg-emerald-100 text-emerald-800",
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
            className="group rounded-2xl border border-white/80 bg-white/85 p-4 shadow-md shadow-sky-900/5 backdrop-blur hover:border-sky-300 hover:bg-white"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-2xl transition-transform group-hover:rotate-6 group-hover:scale-110" aria-hidden="true">{meta.icon}</span>
              <p className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-indigo-500">Stage {meta.stage}</p>
            </div>
            <p className="text-sm font-bold leading-snug text-slate-800">{meta.title}</p>
            <span
              className={`mt-3 inline-block rounded-full px-2.5 py-1 text-[11px] font-bold ${STATUS_STYLE[status]}`}
            >
              {STATUS_LABEL[status]}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
