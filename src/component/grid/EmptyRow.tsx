import { Cell } from "./Cell";
import { CONFIG } from "../../constant/config";

interface props {
  count: number,
  key: number,
}

export const EmptyRow = ({ count } : props) => {
    const emptyCells = Array.from(Array(count))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
}