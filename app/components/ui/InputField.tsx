import { forwardRef } from 'react';

export const InputField = forwardRef(function InputField(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      type="text"
      {...props}
      placeholder="Search"
      className="pl-3 py-2 pr-4 w-full rounded-lg"
    />
  );
});
