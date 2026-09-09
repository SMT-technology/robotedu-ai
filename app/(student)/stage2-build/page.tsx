import StagePageShell from "@/components/StagePageShell";
import SubmissionBoard from "@/components/SubmissionBoard";

export default function Stage2BuildPage() {
  return (
    <StagePageShell stage={2}>
      <SubmissionBoard
        stage={2}
        entryLabel="일지"
        titlePlaceholder="오늘 무엇을 만들었나요?"
        contentPlaceholder="설계하고 만들면서 겪은 과정, 문제, 해결 방법을 기록해보세요."
      />
    </StagePageShell>
  );
}
