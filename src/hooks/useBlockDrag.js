import { useDrag } from "react-dnd";

export default function useBlockDrag(blockData) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BLOCK",
    item: blockData,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return { drag, isDragging };
}
