import { useDrag } from "react-dnd";

export default function useBlockDrag(getItem, deps = []) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "BLOCK",
      item: getItem(), // generate latest payload
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    deps, // 👈 THIS IS THE FIX
  );

  return { drag, isDragging };
}
