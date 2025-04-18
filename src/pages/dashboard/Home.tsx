import { useEffect, useState } from "react";
import DashboardLayouts from "../../layouts/DashboardLayouts";
import { IDummyData } from "../../interfaces";

export default function Home() {
  const [droppedItems, setDroppedItems] = useState<IDummyData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedItems");
    if (saved) {
      setDroppedItems(JSON.parse(saved));
    }
  }, []);
  console.log(droppedItems);
  return (
    <>
      <DashboardLayouts>
        <div>
          <div className="h-[90vh] border-gray-300 relative me-12">
            {droppedItems.map((item, index) => (
              <div
                key={index}
                style={{
                  width: item.size?.width,
                  height: item.size?.height,
                  left: item.position?.x,
                  top: item.position?.y,
                }}
                className="bg-white border p-2 shadow-md absolute !h-fit"
              >
                <img
                  className="w-full h-24 object-cover mb-2"
                  src={item.img}
                  alt="Widget"
                />

                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayouts>
    </>
  );
}
