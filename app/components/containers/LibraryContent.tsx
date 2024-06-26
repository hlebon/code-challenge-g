"use client";

import { InView } from "react-intersection-observer";
import { LibrarySection } from "./LibrarySection";
import { SectionElement, useTabNavigation } from "../../hooks/useTabNavigation";
import { useEffect, useState } from "react";
import { Data, fetchData } from "@/app/api/data";

export function LibraryContent() {
  const { setCurrentTabIndex, addSectionRef } = useTabNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState<Data[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetchData();
        setAssets(response);
      } catch (error) {
        throw new Error("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }

  const handleUpdateActiveMenu =
    (sectionName: keyof SectionElement) => (inView: boolean) => {
      if (inView) {
        setCurrentTabIndex(sectionName);
      }
    };

  const handleAddSectionRef =
    (sectionName: keyof SectionElement) => (ref: Element) => {
      return addSectionRef(ref, sectionName);
    };

  return (
    <div className="flex flex-col">
      <InView
        as="div"
        threshold={[1]}
        initialInView
        onChange={handleUpdateActiveMenu("featured")}
      >
        <LibrarySection
          data={assets.slice(0, 4)}
          ref={handleAddSectionRef("featured")}
          name="Featured"
          subtitle="Curated top picks from this week"
        />
      </InView>
      <InView
        as="div"
        threshold={[1]}
        onChange={handleUpdateActiveMenu("trending")}
      >
        <LibrarySection
          data={assets.slice(0, 6)}
          ref={handleAddSectionRef("trending")}
          name="Trending"
          subtitle="Most popular by community"
        />
      </InView>
      <InView as="div" threshold={[1]} onChange={handleUpdateActiveMenu("new")}>
        <LibrarySection
          data={assets.slice(1, 5)}
          ref={handleAddSectionRef("new")}
          name="New"
          subtitle="Most popular by community"
        />
      </InView>
      <InView
        as="div"
        threshold={[1]}
        onChange={handleUpdateActiveMenu("popular")}
      >
        <LibrarySection
          data={assets.slice(3, 6)}
          ref={handleAddSectionRef("popular")}
          name="Popular"
          subtitle="Most popular by community"
        />
      </InView>
    </div>
  );
}
