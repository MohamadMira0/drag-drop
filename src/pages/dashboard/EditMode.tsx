import { useEffect, useRef, useState } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { Rnd } from "react-rnd";
import EditModeLayouts from "../../layouts/EditModeLayouts";
import { IDummyData, IPosition, ISize, Rect } from "../../interfaces";
import discardIcon from "../../assets/icons/codicon_discard.svg";
import saveIcon from "../../assets/icons/true.svg";

export default function EditMode() {
  const [droppedItems, setDroppedItems] = useState<IDummyData[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const isOverlapping = (a: Rect, b: Rect): boolean => {
    return !(
      a.x + a.width <= b.x ||
      a.x >= b.x + b.width ||
      a.y + a.height <= b.y ||
      a.y >= b.y + b.height
    );
  };

  const handleDrop = (item: IDummyData, monitor: DropTargetMonitor) => {
    const offset = monitor.getClientOffset();
    const dropZone = document.getElementById("drop-zone");
    if (!offset || !dropZone) return;

    const dropRect = dropZone.getBoundingClientRect();
    const x = offset.x - dropRect.left;
    const y = offset.y - dropRect.top;
    const width = 200;
    const height = 150;

    const newItem = {
      ...item,
      position: { x, y },
      size: { width, height },
    };

    const isConflict = droppedItems.some((existing) =>
      isOverlapping(
        {
          x: existing.position?.x ?? 0,
          y: existing.position?.y ?? 0,
          width: existing.size?.width ?? 0,
          height: existing.size?.height ?? 0,
        },
        { x, y, width, height }
      )
    );

    if (isConflict) {
      alert("❌ لا يمكنك إسقاط العنصر فوق عنصر آخر!");
      return;
    }

    setDroppedItems((prev) => [...prev, newItem]);
    setHasChanges(true);
  };

  useEffect(() => {
    const saved =
      localStorage.getItem("savedItems") ||
      localStorage.getItem("droppedItems");
    if (saved) setDroppedItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("droppedItems", JSON.stringify(droppedItems));
  }, [droppedItems]);

  const [, drop] = useDrop(() => ({
    accept: "WIDGET",
    drop: handleDrop,
  }));

  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop]);

  const saveComponents = () => {
    localStorage.setItem("savedItems", JSON.stringify(droppedItems));
    setHasChanges(false);
  };

  const discardChanges = () => {
    const saved = localStorage.getItem("savedItems");
    if (saved) setDroppedItems(JSON.parse(saved));
    setHasChanges(false);
  };

  const updateItemPosition = (index: number, position: IPosition) => {
    const updated = [...droppedItems];
    updated[index].position = position;
    setDroppedItems(updated);
  };

  const updateItemSize = (index: number, size: ISize, position: IPosition) => {
    const updated = [...droppedItems];
    updated[index].size = size;
    updated[index].position = position;
    setDroppedItems(updated);
    setHasChanges(true);
  };

  return (
    <EditModeLayouts>
      {hasChanges && (
        <div className="flex justify-end items-center gap-2 my-2 me-10">
          <button
            className="text-[#E34F27] flex items-center gap-1 py-2 px-4 cursor-pointer"
            onClick={discardChanges}
          >
            <img src={discardIcon} alt="discard" /> Discard
          </button>
          <button
            className="text-secondery2 flex items-center gap-1 py-2 px-4 cursor-pointer"
            onClick={saveComponents}
          >
            <img src={saveIcon} alt="save" /> Save
          </button>
        </div>
      )}

      <div
        ref={dropRef}
        id="drop-zone"
        className="relative me-12 p-4 min-h-[500px] h-[90vh] border-2 border-dashed border-gray-300"
      >
        {droppedItems.map((item, index) => (
          <Rnd
            key={index}
            default={{
              x: item.position?.x || 0,
              y: item.position?.y || 0,
              width: item.size?.width || 200,
              height: item.size?.height || 150,
            }}
            bounds="parent"
            onDragStop={(e, d) => {
              const current = droppedItems[index];
              const newPosition = { x: d.x, y: d.y };

              const isConflict = droppedItems.some(
                (itm, i) =>
                  i !== index &&
                  isOverlapping(
                    {
                      x: newPosition.x,
                      y: newPosition.y,
                      width: current.size?.width ?? 0,
                      height: current.size?.height ?? 0,
                    },
                    {
                      x: itm.position?.x ?? 0,
                      y: itm.position?.y ?? 0,
                      width: itm.size?.width ?? 0,
                      height: itm.size?.height ?? 0,
                    }
                  )
              );

              if (isConflict) {
                alert("❌ لا يمكنك وضع عنصر فوق عنصر آخر!");
                return;
              }

              updateItemPosition(index, newPosition);
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              updateItemSize(
                index,
                {
                  width: parseInt(ref.style.width),
                  height: parseInt(ref.style.height),
                },
                position
              );
            }}
          >
            <div className="bg-white border p-2 shadow-md">
              <img
                src={item.img}
                alt="Widget"
                className="w-full h-24 object-cover mb-2"
              />
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </Rnd>
        ))}
      </div>
    </EditModeLayouts>
  );
}
