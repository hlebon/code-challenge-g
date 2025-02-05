import { useTabNavigation } from '../../hooks/useTabNavigation';

type NavItemProps = {
  children: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
};

function NavItem({ children, isActive, onClick }: NavItemProps) {
  return (
    <li
      className={`${
        isActive
          ? 'font-semibold bg-white  shadow-sm'
          : 'font-normal text-gray-500 hover:bg-gray-200'
      } p-2 m-1 rounded-md  text-center flex-1 w-1/4`}
    >
      <button onClick={onClick}>{children}</button>
    </li>
  );
}

export function TabNavigation() {
  const { currentTabIndex, scrollToView } = useTabNavigation();
  return (
    <ul className="flex justify-between p-1 bg-gray-100 rounded-md">
      <NavItem
        onClick={() => scrollToView('assets')}
        isActive={currentTabIndex === 0}
      >
        Assets
      </NavItem>
      <NavItem
        onClick={() => scrollToView('dataViz')}
        isActive={currentTabIndex === 1}
      >
        Data
      </NavItem>
      <NavItem
        onClick={() => scrollToView('storyboards')}
        isActive={currentTabIndex === 2}
      >
        Storyboard
      </NavItem>
      <NavItem
        onClick={() => scrollToView('kpis')}
        isActive={currentTabIndex === 3}
      >
        KPI
      </NavItem>
    </ul>
  );
}
