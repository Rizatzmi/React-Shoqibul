import React from "react";
import { calculateMath } from "../Utils/MathUtils";

// Kemudian di dalam komponen Anda:

function Statistic({ data, index, isMobile }) {
  const { min, max, average, format } = calculateMath(data, index, isMobile);
  return (
    <div className="mt-3 min-w-full">
      <div className="flex justify-between bg-black text-white pl-3 items-center">
        <p className="flex-grow">Data Terendah: </p>
        <p className="bg-white text-black border-2 border-black p-3 min-w-32 text-end">
          {format(min)}
        </p>
      </div>
      <div className="flex justify-between bg-black text-white pl-3 items-center mt-1">
        <p>Data Tertinggi: </p>
        <p className="bg-white text-black border-2 border-black p-3 w-32 text-end">
          {format(max)}
        </p>
      </div>
      <div className="flex justify-between bg-black text-white pl-3 items-center mt-1">
        <p>Rata-rata: </p>
        <p className="bg-white text-black border-2 border-black p-3 w-32 text-end">
          {format(average.toFixed())}
        </p>
      </div>
    </div>
  );
}

export default Statistic;
