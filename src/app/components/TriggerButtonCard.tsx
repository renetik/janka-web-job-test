import React from "react";
import { UseSortableArguments, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TriggerButton } from "./TriggerGrid";

interface TriggerButtonCardProps {
  button: TriggerButton;
  index: number;
}

export function TriggerButtonCard({ button, index }: TriggerButtonCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: button.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    opacity: isDragging ? 0.7 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col items-center justify-center bg-blue-100 rounded-xl p-6 min-h-[100px] shadow cursor-move select-none"
    >
      <span className="font-semibold text-blue-900">{button.label}</span>
    </div>
  );
} 