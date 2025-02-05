type ListProps = {
  data: { id: string; description: string; title: string }[];
  onClick: (id: string) => void;
};

export function List({ data, onClick }: ListProps) {
  return (
    <div className={`flex w-full flex-wrap gap-6`}>
      {data.map(({ id, title, description }) => {
        return (
          <div key={id} className={`w-full lg:w-[calc(50%-0.75rem)]`}>
            <div
              className={`flex p-4 border-2 border-solid bg-white rounded-md transform transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2`}
            >
              <div className={`bg-gray-400 w-1/3 min-h-32 rounded-md`}></div>
              <div className="pl-3 w-2/3">
                <button
                  className="text-1xl font-semibold text-left"
                  onClick={() => onClick(id)}
                >
                  {title}
                </button>
                <p className="text-sm">{description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
