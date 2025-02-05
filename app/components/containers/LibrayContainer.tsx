import { InView } from 'react-intersection-observer';
import { LibrarySection } from './LibrarySection';
import { useTabNavigation } from '@/app/hooks/useTabNavigation';
import { titleMapping } from '@/app/helper';
import { useEffect, useState } from 'react';
import { fetchLibraryCategory } from '@/app/api/data';
import { Loading } from '../ui/Loading';
import { LibraryId } from '@/app/api/types';
import { useStore } from '@/app/store/useStore';

export function LibraryContainer({ id }: { id: LibraryId }) {
  const { addSectionRef, setCurrentTabIndex } = useTabNavigation();
  const [page, setpage] = useState(1);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());

  const { setSelectedItem } = useStore();

  const handleStartLoading = () => {
    if (page > 1) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }
  };

  const handleLoadingComplete = () => {
    if (page > 1) {
      setIsLoadingMore(false);
    } else {
      setIsLoading(false);
    }
  };

  const getLibrary = async ({ page }: { page: number }) => {
    try {
      handleStartLoading();
      const response = await fetchLibraryCategory({
        category: id,
        page: page || 1,
        limit: 4,
      });

      const items = response.data?.map((item) => ({
        id: item.id,
        title: item.name,
        description: item.description,
        data: item,
      }));
      setData((currentItems) => {
        return [...currentItems, ...items];
      });
    } catch (error) {
      setError(`Ups! there was an error, please try again later`);
    } finally {
      handleLoadingComplete();
    }
  };

  useEffect(() => {
    if (!loadedPages.has(page)) {
      setLoadedPages((prev) => new Set(prev).add(page));
      getLibrary({ page });
    }
  }, [id, page]);

  if (isLoading) {
    return <Loading />;
  }

  const handleClick = (id: string) => {
    const selectedItem = data.find((d) => d.id === id);
    if (selectedItem) {
      setSelectedItem(selectedItem.data);
    }
  };

  return (
    <InView
      as="div"
      threshold={0.9}
      onChange={(inView) => {
        if (inView) {
          setCurrentTabIndex(id);
        }
      }}
    >
      <LibrarySection
        data={data}
        ref={(ref) => {
          addSectionRef(ref, id);
        }}
        name={titleMapping[id]}
        subtitle={''}
        isLoading={isLoadingMore}
        disabledViewAll={page >= 2}
        onClickViewAll={() => {
          setpage((cp) => cp + 1);
        }}
        onClickItem={handleClick}
        error={error}
      />
    </InView>
  );
}
