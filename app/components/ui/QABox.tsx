type QABoxProps = {
  question: string;
  answer: string;
};

export function QABox({ question, answer }: QABoxProps) {
  return (
    <div className="w-1/2 pr-2 pb-2">
      <div className="bg-gray-100 p-3 round-md">
        <div className="text-black font-bold">{question}</div>
        <div className="text-gray-600">{answer}</div>
      </div>
    </div>
  );
}
