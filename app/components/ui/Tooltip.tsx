import { useState } from 'react';

function Text({ text }: { text: string }) {
  return (
    <div className="bg-gray-800 absolute bottom-full mb-2 w-max px-2 py-1  text-white text-sm rounded-md shadow-lg">
      {text}
    </div>
  );
}

type TooltipProps = {
  text: string;
  confirmationText?: string;
  children: React.ReactNode;
};

export function Tooltip({ text, children, confirmationText }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmationTextVisible, setIsConfirmationTextVisible] =
    useState(false);

  const confirmationMessage = isConfirmationTextVisible && (
    <Text text={confirmationText} />
  );
  const tooltipMessage = isVisible && <Text text={text} />;

  return (
    <div
      className="relative inline-block self-center"
      onMouseEnter={() => {
        setIsVisible(true);
        setIsConfirmationTextVisible(false);
      }}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => {
        if (confirmationText) {
          setIsVisible(false);
          setIsConfirmationTextVisible(true);
        }
      }}
    >
      {children}
      {confirmationMessage}
      {tooltipMessage}
    </div>
  );
}
