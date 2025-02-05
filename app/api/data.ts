import { LibraryItem, APIPaginationResponse } from './types';
const host = process.env.NEXT_PUBLIC_API_URL;

export async function fetchLibrary() {
  const response = await fetch(`${host}/library`);
  const data = await response.json();
  return data as LibraryItem[];
}

export async function fetchLibraryCategory({
  category,
  page,
  limit,
}: {
  category: string;
  page: number;
  limit: number;
}) {
  const response = await fetch(
    `${host}/${category}?page=${page}&limit=${limit}`,
  );
  const data = (await response.json()) as APIPaginationResponse<LibraryItem[]>;
  return data;
}
