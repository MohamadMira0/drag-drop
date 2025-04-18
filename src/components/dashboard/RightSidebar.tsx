import { useState } from "react";
import xIcon from "../../assets/icons/x-icon.svg";
import menuIcon from "../../assets/icons/menu-left.svg";
import SearchInput from "../ui/SearchInput";
import { dummyData } from "../../helpers";
import DraggableWidget from "./DraggableWidget";

export default function RightSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [draftMenu, setDraftMenu] = useState(false);
  const [selectedType, setSelectedType] = useState(3);
  const [searchValue, setSearchValue] = useState("");

  const filteredByType =
    selectedType === 3
      ? dummyData
      : dummyData.filter((item) => item.type === selectedType);

  const filteredComponents = filteredByType.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const type1Count = dummyData.filter((item) => item.type === 1).length;
  const type2Count = dummyData.filter((item) => item.type === 2).length;
  const allCount = dummyData.length;

  // const showComponents = filteredComponents?.map((component, idx) => (
  //   <div
  //     ref={drag}
  //     key={idx}
  //     className="border border-[#E8E8E8] rounded-[3px] p-1 flex items-center gap-2 cursor-pointer"
  //   >
  //     <img className="w-full" src={component.img} alt="img" />
  //     <div className="flex flex-col justify-between gap-1 text-xs">
  //       <h3 className="font-bold text-secondery">{component.title}</h3>
  //       <p className="text-secondery2">{component.description}</p>
  //       <p className="bg-[#EEEEEE] px-2 rounded-[3px] text-[#707691] w-fit">
  //         {component.typeTitle}
  //       </p>
  //     </div>
  //   </div>
  // ));

  const showComponents = filteredComponents?.map((component, idx) => (
    <DraggableWidget key={idx} component={component} />
  ));

  return (
    <>
      <button
        className={`fixed right-2 top-15 cursor-pointer ${
          isOpen ? "opacity-0" : ""
        }`}
        onClick={() => setIsOpen(true)}
      >
        <img src={menuIcon} alt="menu" />
      </button>
      <div
        className={`shadow-left flex flex-col duration-300 w-64 px-2 ${
          isOpen ? "right-0" : "-right-full"
        }
       fixed bg-white top-14 h-screen z-20 overflow-y-auto scroll-smooth custom-scroll pb-16`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-secondery font-bold">Add widget</h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="py-[11px] px-4 flex items-center gap-4 cursor-pointer"
          >
            <img src={xIcon} alt="Open-sidebar" />
          </button>
        </div>
        <div className="flex items-center justify-evenly">
          <p
            className={`p-4 font-bold cursor-pointer border-b-4 border-transparent ${
              draftMenu
                ? "text-secondery2"
                : "text-secondery3 !border-secondery3"
            }`}
            onClick={() => setDraftMenu(false)}
          >
            Templates
          </p>
          <p
            className={`p-4 font-bold cursor-pointer border-b-4 border-transparent ${
              !draftMenu
                ? "text-secondery2"
                : "text-secondery3 !border-secondery3"
            }`}
            onClick={() => setDraftMenu(true)}
          >
            Drafts
          </p>
        </div>
        {draftMenu ? (
          ""
        ) : (
          <>
            <div>
              <SearchInput
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 my-4 text-[#707691] text-sm">
              <p
                className={`px-2 rounded-[3px] cursor-pointer ${
                  selectedType === 3 ? "bg-[#C6D4EF]" : "bg-[#EEEEEE]"
                }`}
                onClick={() => setSelectedType(3)}
              >
                All ({allCount})
              </p>
              <p
                className={`px-2 rounded-[3px] cursor-pointer ${
                  selectedType === 1 ? "bg-[#C6D4EF]" : "bg-[#EEEEEE]"
                }`}
                onClick={() => setSelectedType(1)}
              >
                Informative Widgets ({type1Count})
              </p>
              <p
                className={`px-2 rounded-[3px] cursor-pointer ${
                  selectedType === 2 ? "bg-[#C6D4EF]" : "bg-[#EEEEEE]"
                }`}
                onClick={() => setSelectedType(2)}
              >
                Statistics Widgets ({type2Count})
              </p>
            </div>
            <div className="flex flex-col gap-4">{showComponents}</div>
          </>
        )}
      </div>
    </>
  );
}
