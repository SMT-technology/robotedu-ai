import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { getCurrentUser } from "@/lib/session";
import { getBoardProfileByType } from "@/lib/boardContext";

const STAGE_PROMPT_FILES: Record<number, string> = {
  1: "stage1.md",
  2: "stage2.md",
  3: "stage3.md",
  4: "stage4.md",
};

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_MODEL = "claude-sonnet-4-5";

/**
 * AI 튜터 엔드포인트.
 * stage(1-4)에 맞는 시스템 프롬프트를 /lib/stagePrompts에서 읽어오고,
 * 학생의 보드 컨텍스트를 덧붙여 Claude API 요청 본문을 구성한다.
 * ANTHROPIC_API_KEY가 없으면 실제 호출은 하지 않고 준비된 요청만 반환한다.
 */
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const stage = Number(body?.stage);
  const message = body?.message as string | undefined;

  if (![1, 2, 3, 4].includes(stage) || !message) {
    return NextResponse.json(
      { error: "stage(1-4)와 message가 필요합니다." },
      { status: 400 }
    );
  }

  const promptPath = path.join(
    process.cwd(),
    "lib",
    "stagePrompts",
    STAGE_PROMPT_FILES[stage]
  );
  const stageSystemPrompt = await fs.readFile(promptPath, "utf-8");

  const boardProfile = getBoardProfileByType(user.boardType);
  const boardContext = boardProfile
    ? [
        `현재 학생이 사용 중인 보드: ${boardProfile.displayName}`,
        `지원 센서: ${boardProfile.supportedSensors.map((s) => s.name).join(", ")}`,
        `코드 언어: ${boardProfile.codeTemplate.language}`,
        `통신 방식: ${boardProfile.communication.type} - ${boardProfile.communication.description}`,
      ].join("\n")
    : "학생이 아직 보드를 선택하지 않았습니다.";

  const systemPrompt = `${stageSystemPrompt}\n\n## 현재 보드 컨텍스트\n${boardContext}`;

  const anthropicRequestBody = {
    model: ANTHROPIC_MODEL,
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: message }],
  };

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      ok: false,
      reason: "ANTHROPIC_API_KEY가 설정되지 않았습니다 (.env.local을 확인하세요).",
      preparedRequest: anthropicRequestBody,
    });
  }

  const anthropicRes = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(anthropicRequestBody),
  });

  if (!anthropicRes.ok) {
    const errText = await anthropicRes.text();
    return NextResponse.json(
      { ok: false, error: `Claude API 오류: ${errText}` },
      { status: anthropicRes.status }
    );
  }

  const data = await anthropicRes.json();
  return NextResponse.json({ ok: true, data });
}
