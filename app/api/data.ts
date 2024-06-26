import faker from "faker";

export const data = [
  {
    title: "Inventory Management",
    category: "Layout",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nobis optio dolorum alias, voluptatum esse corrupti",
    id: "1",
    hashtags: ["#comms", "#coverage", "#stakeholder"],
    isFavorite: true,
  },
  {
    title: "Trademarks",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nobis optio dolorum alias, voluptatum esse corrupti",
    id: "2",
    category: "Layout",
    hashtags: ["#comms", "#coverage", "#stakeholder"],
    isFavorite: false,
  },
  {
    title: "Patents",
    category: "Layout",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nobis optio dolorum alias, voluptatum esse corrupti",
    id: "3",
    hashtags: ["#comms", "#stakeholder"],
    isFavorite: false,
  },
  {
    title: "Cars",
    category: "Layout",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nobis optio dolorum alias, voluptatum esse corrupti",
    id: "4",
    hashtags: ["#comms", "#stakeholder", "#kpi"],
    isFavorite: false,
  },
  {
    title: "Investments",
    category: "Layout",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nobis optio dolorum alias, voluptatum esse corrupti",
    id: "5",
    hashtags: ["#stakeholder", "#layout", "#okr"],
    isFavorite: true,
  },
  {
    title: "Buildings",
    category: "Layout",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nobis optio dolorum alias, voluptatum esse corrupti",
    id: "6",
    hashtags: ["#stakeholder", "#layout", "#okr"],
    isFavorite: false,
  },
];

export type Data = (typeof data)[0];

export function fetchData(): Promise<typeof data> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
}
