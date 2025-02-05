'use client';

import { LibraryContainer } from './LibrayContainer';

export function LibraryContent() {
  return (
    <div className="flex flex-col gap-20 mt-8 md:mt-16">
      <LibraryContainer id="assets" />
      <LibraryContainer id="dataViz" />
      <LibraryContainer id="storyboards" />
      <LibraryContainer id="kpis" />
    </div>
  );
}
