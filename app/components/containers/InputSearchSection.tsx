'use client';

import { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { List, BaseModal, InputField } from '../ui';
import { SearchHistory } from './SearchHistory';
import { fetchLibrary } from '@/app/api/data';
import { useStore } from '@/app/store/useStore';

export function InputSearchSection() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  const { setSelectedItem } = useStore();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchLibrary();
        setItems(
          response.map((item) => ({
            id: item.id,
            title: item.name,
            description: item.description,
            data: item,
          })),
        );
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const filteredItems = isLoading
    ? []
    : items.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase()),
      );

  const handleSaveSearchTerm = () => {
    if (searchValue && !searchHistory.includes(searchValue)) {
      setSearchHistory((prevHistory) =>
        [searchValue, ...prevHistory].slice(0, 5),
      );
    }
  };

  const handleRemoveHistoryItem = (term: string) => {
    setSearchHistory((prevHistory) =>
      prevHistory.filter((item) => item !== term),
    );
  };

  const handleClearSearchTerm = () => {
    setSearchValue('');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelectItem = (id: string) => {
    const selectedItem = items.find((item) => {
      return item.id === id;
    });
    if (selectedItem) {
      setSelectedItem(selectedItem.data);
      handleSaveSearchTerm();
    }
  };

  const lastSearchTerms = isLoading ? [] : searchHistory.slice(-3);

  return (
    <div className="flex items-center border border-gray-400 shadow-inner rounded-md">
      <span className="pl-3 pr-2">
        <FiSearch className="text-gray-400" />
      </span>
      <InputField
        type="text"
        placeholder="Search"
        className="pl-3 py-2 pr-4 w-full rounded-r-md"
        onClick={handleOpenModal}
      />
      {isModalOpen && (
        <BaseModal onClose={handleCloseModal}>
          <div className="w-full">
            <div className="bg-gray-100 p-4 sticky top-4 z-20 w-full flex items-center border border-gray-400 shadow-inner rounded-md">
              <InputField
                ref={inputRef}
                type="text"
                value={searchValue}
                placeholder="Search"
                className="pl-3 py-2 pr-4 w-full rounded-lg"
                onBlur={handleOpenModal}
                onChange={handleChangeSearchValue}
              />
              <button
                onClick={handleClearSearchTerm}
                className="ml-2 p-2 bg-red-500 text-white rounded-md"
              >
                Clear
              </button>
            </div>
            <div className="pt-6">
              {lastSearchTerms?.length > 0 && (
                <SearchHistory
                  onSelect={(term) => {
                    setSearchValue(term);
                  }}
                  data={lastSearchTerms}
                  onClickRemove={handleRemoveHistoryItem}
                />
              )}
              <List data={filteredItems} onClick={handleSelectItem} />
            </div>
          </div>
        </BaseModal>
      )}
    </div>
  );
}
