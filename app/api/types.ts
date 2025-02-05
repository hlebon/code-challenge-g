export type LibraryItemAsset = {
  copyLink: string;
  description: string;
  favorite: boolean;
  id: string;
  name: string;
  relatedAssets: Array<string>;
  type: string;
  _id: string;
};

export type LibraryItemDataViz = {
  applicableKPIs: string[];
  chart: {
    type: string;
    dataPoints: Array<string>;
  };
  description: string;
  id: string;
  name: string;
  _id: string;
};

export type LibraryItemKPI = {
  applicableAffiliates: string[];
  businessQuestions: string[];
  calculation: string;
  description: string;
  id: string;
  metricID: string;
  name: string;
  visuals: string[];
  _id: string;
};

export type LibraryItemStoryBoard = {
  applicableAffiliates: string[];
  coupledKPIs: string[];
  id: string;
  name: string;
  requestAccess: boolean;
  description: string;
  _id: string;
};

export type LibraryItem =
  | LibraryItemAsset
  | LibraryItemDataViz
  | LibraryItemKPI
  | LibraryItemStoryBoard;

export type LibraryId = 'assets' | 'dataViz' | 'storyboards' | 'kpis';

export type APIPaginationResponse<T> = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: T;
};
