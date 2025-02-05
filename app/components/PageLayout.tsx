import { poppins } from '../theme/font';
import { PageHeader } from './containers/PageHeader';

export function PageLayout({
  children,
  description,
}: Readonly<{ description?: string; children: React.ReactNode }>) {
  return (
    <main
      className={`${poppins.className} w-11/12 m-auto md:w-6/12 row-gap-md`} // lg:row-gap-lg w-1/2 container flex-col m-auto pt-10 items-center
    >
      <PageHeader description={description} />
      {children}
    </main>
  );
}
