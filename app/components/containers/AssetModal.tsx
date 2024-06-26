"use client";

import { FiBookmark } from "react-icons/fi";
import { BsGrid3X3 } from "react-icons/bs";
import { FiLink } from "react-icons/fi";
import { Tooltip, BaseModal, Label, Stats, QABox } from "../ui";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Data, data } from "@/app/api/data";
import { CustomChart } from "./CustomChart";

function ModalHeader({
  title,
  description,
  category,
  formatDescription,
  hashtags,
}: {
  hashtags: string[];
  title: string;
  description: string;
  category: string;
  formatDescription: string;
}) {
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
        <p className="text-sm text-gray-400">{formatDescription}</p>
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
  const [asset, setAsset] = useState<Data | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");

  useEffect(() => {
    function getAssetById() {
      const [filteredAsset] = data.filter((d) => d.id === id);
      if (filteredAsset) {
        setAsset(filteredAsset);
      }
    }
    getAssetById();
  }, [id]);

  const handleUpdateAssetFavorite = () => {
    if (!asset) return;
    setAsset({
      ...asset,
      isFavorite: !asset.isFavorite,
    });
  };

  const handleCloseModal = () => {
    router.push("/");
  };

  if (!id || !asset) {
    return null;
  }

  return (
    <BaseModal onClose={handleCloseModal}>
      <div className="w-full row-gap-lg">
        <ModalHeader
          title={asset.title}
          category={asset.category}
          description={asset.description}
          hashtags={asset.hashtags}
          formatDescription={"Layout description"}
        />
        {/* stats */}
        <div className="flex justify-between">
          {[
            { label: "Used", value: "2485" },
            { label: "Universal", value: "Type" },
            { label: "Page Nº", value: "6" },
            { label: "Last Update", value: "12/12/2020" },
          ].map(({ label, value }, index, array) => {
            return (
              <Stats
                key={value}
                label={label}
                value={value}
                className={array.length - 1 === index ? "" : "border-r-2"}
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
            <QABox question="Question" answer={"Some answer"} />
            <QABox question="Question" answer={"Some answer"} />
            <QABox question="Question" answer={"Some answer"} />
            <QABox question="Question" answer={"Some answer"} />
          </div>
        </div>
        {/* button */}

        <button
          type="button"
          onClick={handleUpdateAssetFavorite}
          className="bg-black text-white p-2 w-full rounded-lg"
        >
          <FiBookmark className="inline-block" style={{ marginRight: "3px" }} />
          {asset.isFavorite ? "Remove from favorites" : "Add to favorites"}
        </button>
      </div>
    </BaseModal>
  );
}
