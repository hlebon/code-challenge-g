import { forwardRef, useEffect, useState } from "react";
import { Data, fetchData } from "../../api/data";
import { List } from "../ui";
import { useRouter } from "next/navigation";

type LibrarySectionProps = {
  name: string;
  subtitle: string;
  onClickViewAll?: () => void;
  data: Data[];
};

export const LibrarySection = forwardRef(function LibrarySection(
  { name, subtitle, onClickViewAll, data }: LibrarySectionProps,
  ref: React.Ref<HTMLDivElement>
) {
  const router = useRouter();
  const handleDisplayModal = (id: string) => {
    router.push(`?id=${id}`);
  };

  return (
    <div className="w-full pt-16" ref={ref}>
      <div className="mb-6">
        <h2 className="font-semibold text-2xl">{name}</h2>
        <p className="text-sm">{subtitle}</p>
      </div>
      <List data={data} onClick={handleDisplayModal} />
      <div>
        <button
          className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md"
          onClick={onClickViewAll}
        >
          View All
        </button>
      </div>
    </div>
  );
});
