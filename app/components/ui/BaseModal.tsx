import React, { useCallback, useEffect, useRef } from 'react';

type BaseModalProps = {
  id: string;
  children: React.ReactNode;
  onClose?: () => void;
  onCloseBackdrop?: () => void;
};

export function BaseModal({
  id,
  onClose,
  onCloseBackdrop,
  children,
}: BaseModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('#modal_library')) {
        return;
      }
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        if (onCloseBackdrop) {
          onCloseBackdrop();
        }
      }
    },
    [onCloseBackdrop],
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      id={id}
      className="h-full z-50 fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-55"
    >
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg p-4 w-1/2 h-3/4 overflow-y-scroll"
      >
        {onClose && (
          <button
            className="absolute right-2 top-6  text-gray-700 font-bold py-2 px-4 z-50"
            onClick={onClose}
          >
            x
          </button>
        )}
        <div className="flex flex-column">{children}</div>
      </div>
    </div>
  );
}
