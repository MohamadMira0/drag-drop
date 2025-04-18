import { useDrag } from "react-dnd";
import { IDummyData } from "../../interfaces";
import { useEffect, useRef } from "react";

interface IProps {
  component: IDummyData;
}

export default function DraggableWidget({ component }: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag(() => ({
    type: "WIDGET",
    item: { ...component },
  }));

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);

  return (
    <div
      ref={ref}
      className="border border-[#E8E8E8] rounded-[3px] p-1 flex items-center gap-2 cursor-pointer"
    >
      <img className="w-full" src={component.img} alt="img" />
      <div className="flex flex-col justify-between gap-1 text-xs">
        <h3 className="font-bold text-secondery">{component.title}</h3>
        <p className="text-secondery2">{component.description}</p>
        <p className="bg-[#EEEEEE] px-2 rounded-[3px] text-[#707691] w-fit">
          {component.typeTitle}
        </p>
      </div>
    </div>
  );
}
