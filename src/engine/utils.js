export function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

export function getStageBounds() {
  const stage = document.getElementById("stage");
  if (!stage) return { width: 0, height: 0 };

  const rect = stage.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
  };
}
