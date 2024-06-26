type ListProps = {
  data: { id: string; description: string; title: string }[];
  onClick: (id: string) => void;
  horizontal?: boolean;
};

export function List({ data, onClick, horizontal }: ListProps) {
  return (
    <div className={`flex w-full flex-wrap`}>
      {data.map(({ id, title, description }) => {
        return (
          <div key={id} className={`${horizontal ? "w-full" : "w-1/2"}`}>
            <div
              className={`${
                horizontal ? "mt-4" : "m-2"
              } flex p-4 border-2 border-solid bg-white rounded-md transform transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2`}
            >
              <div
                className={`bg-gray-400 ${
                  horizontal ? "w-1/4" : "w-5/6"
                } rounded-md`}
              ></div>
              <div className="pl-3">
                <button
                  className="text-1xl font-semibold"
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
