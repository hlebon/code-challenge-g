import { IoIosClose } from "react-icons/io";

type SearchHistoryProps = {
  data: string[];
  onClickRemove: (term: string) => void;
  onSelect: (term: string) => void;
};

export function SearchHistory({
  data,
  onClickRemove,
  onSelect,
}: SearchHistoryProps) {
  return (
    <div>
      <h2 className="text-sm font-semibold mb-2">Search History</h2>
      <ul className="mb-4">
        {data.map((term, index) => (
          <div
            key={index}
            className="flex justify-between mb-1 p-2 bg-gray-200 rounded-md"
          >
            <button onClick={() => onSelect(term)}>{term}</button>
            <button
              onClick={() => onClickRemove(term)}
              className="ml-2 p-1 bg-red-400 text-white rounded-md"
            >
              <IoIosClose />
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}
