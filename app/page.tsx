"use client";

import { Poppins } from "next/font/google";
import { InputSearchSection } from "./components/containers/InputSearchSection";
import { LibraryContent } from "./components/containers/LibraryContent";
import { TabNavigation } from "./components/containers/Navigation";
import { TabNavigationProvider } from "./hooks/useTabNavigation";
import { AssetModal } from "./components/containers/AssetModal";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

function PageHeader() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-semibold mb-6">Library</h1>
      <p>Browse for assets needed to report and present analisys.</p>
    </div>
  );
}

export default function Home() {
  return (
    <TabNavigationProvider>
      <main
        className={`${poppins.className} row-gap-lg w-1/2 container flex-col m-auto pt-10 items-center`}
      >
        <PageHeader />
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
