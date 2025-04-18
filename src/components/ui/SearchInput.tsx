import searchIcon from "../../assets/icons/search-icon.svg";

interface IProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchInput({ value, onChange }: IProps) {
  return (
    <>
      <div className="mt-6 relative">
        <img
          className="absolute top-3 -translate-0.5 left-4 w-4"
          src={searchIcon}
          alt="search icon"
        />
        <input
          type="search"
          placeholder="Search"
          className="peer border-2 border-[#A6B3D5] w-full mx-auto rounded-[4px] focus:border-[#3B52A8] outline-0 ps-7 text-[#3B52A8] py-1 focus:placeholder:opacity-0"
          value={value}
          onChange={onChange}
        />
        <span
          className="text-[#3B52A8] absolute top-2 -translate-0.5 left-10 transition-all duration-200
          opacity-0 -z-10
             peer-focus:top-[-10px] peer-focus:text-sm peer-focus:bg-white peer-focus:left-5 peer-focus:px-1 peer-focus:opacity-100 peer-focus:z-10"
        >
          Search
        </span>
      </div>
    </>
  );
}
