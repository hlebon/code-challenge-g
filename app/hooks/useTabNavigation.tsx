import { createContext, useContext, useRef, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

export type SectionElement = {
  dataViz: Element;
  assets: Element;
  storyboards: Element;
  kpis: Element;
};

const sectionMapping: Record<keyof SectionElement, number> = {
  assets: 0,
  dataViz: 1,
  storyboards: 2,
  kpis: 3,
};

const TabNavigationContext = createContext<null | {
  currentTabIndex: number;
  tabIndex: number;
  setCurrentTabIndex: (index: number | keyof SectionElement) => void;
  scrollToView: (sectionName: keyof SectionElement) => void;
  addSectionRef: (el: Element, key: keyof SectionElement) => void;
}>(null);

export function TabNavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const currentTabIndex = useDebounce(tabIndex, 200);

  const sectionsRef = useRef<SectionElement>({
    dataViz: null,
    assets: null,
    storyboards: null,
    kpis: null,
  });

  const scrollToView = (sectionName: keyof SectionElement) => {
    sectionsRef.current[sectionName]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setTabIndex(sectionMapping[sectionName]);
  };

  const setCurrentTabIndex = (index: number | keyof SectionElement) => {
    if (typeof index === 'number') {
      if (index === tabIndex) return;
      setTabIndex(index);
    } else {
      const newIndex = sectionMapping[index];
      if (newIndex === tabIndex) return;
      setTabIndex(newIndex);
    }
  };

  const addSectionRef = (el: Element, key: keyof SectionElement) => {
    sectionsRef.current[key] = el;
  };

  return (
    <TabNavigationContext.Provider
      value={{
        currentTabIndex,
        tabIndex,
        setCurrentTabIndex,
        scrollToView,
        addSectionRef,
      }}
    >
      {children}
    </TabNavigationContext.Provider>
  );
}

export function useTabNavigation() {
  const context = useContext(TabNavigationContext);

  if (!context) {
    throw new Error(
      `useTabNavigation components cannot be rendered outside the TabNavigationProvider component`,
    );
  }

  return context;
}
