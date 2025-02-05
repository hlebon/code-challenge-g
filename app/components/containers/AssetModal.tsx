'use client';

import { FiBookmark } from 'react-icons/fi';
import { BsGrid3X3 } from 'react-icons/bs';
import { FiLink } from 'react-icons/fi';
import { Tooltip, BaseModal, Label, Stats, QABox } from '../ui';
import { CustomChart } from './CustomChart';
import { useStore } from '@/app/store/useStore';

const mapping = {
  asset: 'Assets',
  data: 'Data Visualization',
  storyboard: 'Storyboard',
  kpi: 'KPI',
};

type ModalHeaderProps = {
  hashtags: string[];
  title: string;
  description: string;
  category: string;
};

function ModalHeader({
  title,
  description,
  category,
  hashtags,
}: ModalHeaderProps) {
  const handleLinkCopied = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };
  return (
    <div className="flex flex-col items-center text-center mb-10 row-gap-md">
      <div className="p-3 bg-gray-100 rounded-md">
        <BsGrid3X3 size="22px" color="gray" />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center ">
          <h2 className="text-2xl">{title}</h2>
          <div className="ml-1 p-1 mr-3 border-r-2 bg-gray-100 text-xs self-center rounded-md">
            {category}
          </div>
          <Tooltip text="Copy link" confirmationText="Link copied!">
            <button onClick={handleLinkCopied}>
              <FiLink className="self-center" />
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="row-gap-sm">
        <div>{description}</div>
        <div className="col-gap flex justify-center">
          {hashtags.map((tag) => {
            return <Label>{tag}</Label>;
          })}
        </div>
      </div>
    </div>
  );
}

export function AssetModal() {
  const { selectedItem, setSelectedItem } = useStore();

  const handleUpdateAssetFavorite = () => {
    if (!selectedItem) return;
    setSelectedItem({
      ...selectedItem,
      isFavorite: !selectedItem.isFavorite,
    });
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  if (!selectedItem) {
    return null;
  }

  const category = selectedItem.id.split('_')[0] as keyof typeof mapping;

  return (
    <BaseModal onClose={handleCloseModal}>
      <div className="w-full row-gap-lg">
        <ModalHeader
          title={selectedItem.name}
          category={mapping[category]}
          description={selectedItem.description}
          hashtags={[]}
        />
        {/* stats */}
        <div className="flex justify-between">
          {[
            { label: 'Used', value: '2485' },
            { label: 'Universal', value: 'Type' },
            { label: 'Page Nº', value: '6' },
            { label: 'Last Update', value: '12/12/2020' },
          ].map(({ label, value }, index, array) => {
            return (
              <Stats
                key={value}
                label={label}
                value={value}
                className={array.length - 1 === index ? '' : 'border-r-2'}
              />
            );
          })}
        </div>
        {/* map */}
        <div className="w-full  bg-gray-200 m-auto flex p-2">
          <CustomChart />
        </div>
        {/* qa section */}
        <div>
          <h3 className="text-1xl font-semibold">Business Questions</h3>
          <div className="flex flex-wrap mt-2">
            <QABox question="Question" answer={'Some answer'} />
            <QABox question="Question" answer={'Some answer'} />
            <QABox question="Question" answer={'Some answer'} />
            <QABox question="Question" answer={'Some answer'} />
          </div>
        </div>
        {/* button */}

        <button
          type="button"
          onClick={handleUpdateAssetFavorite}
          className="bg-black text-white p-2 w-full rounded-lg"
        >
          <FiBookmark className="inline-block" style={{ marginRight: '3px' }} />
          {selectedItem.isFavorite
            ? 'Remove from favorites'
            : 'Add to favorites'}
        </button>
      </div>
    </BaseModal>
  );
}
