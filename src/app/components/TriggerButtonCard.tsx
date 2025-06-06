import React, { useState } from "react";
import { UseSortableArguments, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TriggerButton } from "./TriggerGrid";

interface TriggerButtonCardProps {
  button: TriggerButton;
  index: number;
  onRename: (newLabel: string) => void;
}

export function TriggerButtonCard({ button, index, onRename }: TriggerButtonCardProps) {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col items-center justify-center bg-blue-100 rounded-xl p-6 min-h-[100px] shadow cursor-move select-none"
    >
      {editing ? (
        <input
          className="font-semibold text-blue-900 bg-white rounded px-2 py-1 w-full text-center outline-none border border-blue-300 focus:border-blue-500"
          value={value}
          autoFocus
          onChange={e => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          maxLength={32}
        />
      ) : (
        <span
          className="font-semibold text-blue-900 cursor-pointer w-full text-center"
          onClick={() => setEditing(true)}
          title="Click to rename"
        >
          {button.label}
        </span>
      )}
    </div>
  );
} 