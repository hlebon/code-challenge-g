import { forwardRef } from 'react';
import { List } from '../ui';
import { useRouter } from 'next/navigation';
import { Loading } from '../ui/Loading';

type LibrarySectionProps = {
  name: string;
  subtitle?: string;
  onClickViewAll?: () => void;
  onClickItem: (id: string) => void;
  isLoading: boolean;
  disabledViewAll?: boolean;
  data: { id: string; description: string; title: string }[];
  error?: string;
};

export const LibrarySection = forwardRef(function LibrarySection(
  {
    name,
    subtitle,
    onClickViewAll,
    onClickItem,
    data,
    isLoading,
    disabledViewAll,
    error,
  }: LibrarySectionProps,
  ref?: React.Ref<HTMLDivElement>,
) {
  return (
    <div className="flex flex-col w-full gap-4" ref={ref}>
      <div className="mb-3">
        <h2 className="font-semibold text-2xl mb-2">{name}</h2>
        {subtitle && <p className="text-sm">{subtitle}</p>}
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <List data={data} onClick={onClickItem} />
      {isLoading && <Loading />}
      {onClickViewAll && (
        <button
          disabled={disabledViewAll}
          className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md w-40 md:mt-6 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-gray-300"
          onClick={onClickViewAll}
        >
          View All
        </button>
      )}
    </div>
  );
});
