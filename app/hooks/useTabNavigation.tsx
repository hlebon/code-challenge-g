import { createContext, useContext, useRef, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export type SectionElement = {
  featured: Element;
  trending: Element;
  new: Element;
  popular: Element;
};

const sectionMapping: Record<keyof SectionElement, number> = {
  featured: 0,
  trending: 1,
  new: 2,
  popular: 3,
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
  const currentTabIndex = useDebounce(tabIndex, 280);

  const sectionsRef = useRef<SectionElement>({
    featured: null,
    trending: null,
    new: null,
    popular: null,
  });

  const scrollToView = (sectionName: keyof SectionElement) => {
    sectionsRef.current[sectionName]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setTabIndex(sectionMapping[sectionName]);
  };

  const setCurrentTabIndex = (index: number | keyof SectionElement) => {
    if (typeof index === "number") {
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
      `useTabNavigation components cannot be rendered outside the TabNavigationProvider component`
    );
  }

  return context;
}
