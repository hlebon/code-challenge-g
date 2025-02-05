'use client';

import { InputSearchSection } from './components/containers/InputSearchSection';
import { LibraryContent } from './components/containers/LibraryContent';
import { TabNavigation } from './components/containers/Navigation';
import { TabNavigationProvider } from './hooks/useTabNavigation';
import { AssetModal } from './components/containers/AssetModal';
import { poppins } from './theme/font';

function PageHeader({ description }: { description: string }) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-semibold mb-6">Library</h1>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <TabNavigationProvider>
      <main
        className={`${poppins.className} w-11/12 m-auto md:w-6/12 row-gap-md`} // lg:row-gap-lg w-1/2 container flex-col m-auto pt-10 items-center
      >
        <PageHeader description="Browse for assets needed to report and present analisys" />
        <InputSearchSection />
        <div className="sticky top-3 z-10">
          <TabNavigation />
        </div>
        <LibraryContent />
        <AssetModal />
      </main>
    </TabNavigationProvider>
  );
}
