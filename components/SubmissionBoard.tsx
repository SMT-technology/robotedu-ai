"use client";

import { useState } from "react";
import { useSubmissions } from "@/lib/hooks/useSubmissions";

/**
 * Presentational board for one stage's entries (idea-board cards for stage 1,
 * journal entries for stage 2). All data logic lives in useSubmissions — this
 * component only renders it, so the markup/styling can be swapped freely.
 */
export default function SubmissionBoard({
  stage,
  entryLabel,
  titlePlaceholder,
  contentPlaceholder,
}: {
  stage: number;
  entryLabel: string;
  titlePlaceholder?: string;
  contentPlaceholder?: string;
}) {
  const { submissions, loading, error, addSubmission, removeSubmission } = useSubmissions(stage);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSubmitting(true);
    const ok = await addSubmission({ title, content, imageUrl: imageUrl || undefined });
    setSubmitting(false);

    if (ok) {
      setTitle("");
      setContent("");
      setImageUrl("");
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-gray-50 p-4"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={titlePlaceholder ?? `${entryLabel} 제목`}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={contentPlaceholder ?? `${entryLabel} 내용을 적어보세요`}
          rows={3}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="사진 URL (선택)"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={submitting || !title.trim() || !content.trim()}
          className="self-start rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {submitting ? "저장 중..." : `${entryLabel} 추가하기`}
        </button>
      </form>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      {loading ? (
        <p className="text-sm text-gray-400">불러오는 중...</p>
      ) : submissions.length === 0 ? (
        <p className="text-sm text-gray-400">아직 등록된 {entryLabel}이(가) 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {submissions.map((s) => (
            <li key={s.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold">{s.title}</h3>
                <button
                  onClick={() => removeSubmission(s.id)}
                  className="text-xs text-gray-400 hover:text-red-500"
                >
                  삭제
                </button>
              </div>
              <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">{s.content}</p>
              {s.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.imageUrl}
                  alt={s.title}
                  className="mt-2 max-h-48 rounded-md object-cover"
                />
              )}
              {s.feedback && (
                <p className="mt-2 rounded-md bg-yellow-50 px-2 py-1 text-xs text-yellow-800">
                  선생님 피드백: {s.feedback}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-400">
                {new Date(s.createdAt).toLocaleString("ko-KR")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
