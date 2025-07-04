import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TriggerButton } from "./TriggerGrid";

interface TriggerButtonCardProps {
  button: TriggerButton;
  index: number;
  onRename: (newLabel: string) => void;
  color: string;
}

export function TriggerButtonCard({ button, index, onRename, color }: TriggerButtonCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: button.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    opacity: isDragging ? 0.7 : 1,
  };
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(button.label);

  const handleBlur = () => {
    setEditing(false);
    if (value.trim() && value !== button.label) {
      onRename(value.trim());
    } else {
      setValue(button.label);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    } else if (e.key === "Escape") {
      setEditing(false);
      setValue(button.label);
    }
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditing(true);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`${button.label} clicked`);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex flex-col items-center justify-between ${color} rounded-xl min-h-[100px] shadow select-none relative p-0 cursor-grab active:cursor-grabbing`}
      {...attributes}
      {...listeners}
    >
      <div className="flex-1 flex flex-col items-center justify-center p-6 w-full">
        {editing ? (
          <input
            className="font-semibold text-white bg-white/20 rounded px-2 py-1 w-full text-center outline-none border border-white/30 focus:border-white/50"
            value={value}
            autoFocus
            onChange={e => setValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            maxLength={32}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span
            className="font-semibold text-white cursor-pointer w-full text-center"
            onClick={handleTitleClick}
            title="Click to rename"
          >
            {button.label}
          </span>
        )}
        {/* Action button below the title */}
        <button
          className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow text-lg font-bold transition-colors"
          onClick={handleActionClick}
        >
          {' > > '}
        </button>
      </div>
    </div>
  );
} 