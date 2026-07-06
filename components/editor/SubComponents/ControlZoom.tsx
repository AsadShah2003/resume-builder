import { IoIosRefresh } from "react-icons/io";

export const ControlZoom = ({
  zoomIn,
  zoomOut,
  resetZoom,
}: {
  zoomIn: any;
  zoomOut: any;
  resetZoom: any;
}) => {
  return (
    <div className="flex flex-col absolute right-4 bottom-[20rem] md:bottom-16 gap-3  md:right-[20px]">
      <button className="px-3 text-3xl   bg-white" onClick={() => zoomIn()}>
        +
      </button>
      <button className="px-3 text-3xl  bg-white" onClick={() => zoomOut()}>
        -
      </button>
      <button onClick={() => resetZoom()} className="px-3 bg-white py-2">
        <IoIosRefresh size={19} />
      </button>
    </div>
  );
};
