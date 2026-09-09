import StagePageShell from "@/components/StagePageShell";
import SubmissionBoard from "@/components/SubmissionBoard";

export default function Stage1HwPage() {
  return (
    <StagePageShell stage={1}>
      <SubmissionBoard
        stage={1}
        entryLabel="아이디어"
        titlePlaceholder="어떤 아이디어인가요?"
        contentPlaceholder="탐색하면서 떠오른 아이디어나 궁금한 점을 자유롭게 적어보세요."
      />
    </StagePageShell>
  );
}
