import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TriggerButtonCard } from "./TriggerButtonCard";

export interface TriggerButton {
  id: number;
  label: string;
}

interface TriggerGridProps {
  buttons: TriggerButton[];
  onAdd: () => void;
  onReorder: (buttons: TriggerButton[]) => void;
  onRenameButton: (id: number, newLabel: string) => void;
}

export const TriggerGrid: React.FC<TriggerGridProps> = ({ buttons, onAdd, onReorder, onRenameButton }) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = buttons.findIndex((b) => b.id === active.id);
      const newIndex = buttons.findIndex((b) => b.id === over?.id);
      const newButtons = arrayMove(buttons, oldIndex, newIndex);
      onReorder(newButtons);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={buttons.map((b) => b.id)} strategy={verticalListSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {buttons.map((button, idx) => (
            <TriggerButtonCard
              key={button.id}
              button={button}
              index={idx}
              onRename={(newLabel) => onRenameButton(button.id, newLabel)}
            />
          ))}
          {/* Add button cell */}
          <button
            onClick={onAdd}
            className="flex flex-col items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-xl p-6 min-h-[100px] shadow text-4xl text-gray-500 font-bold transition-all"
            aria-label="Add trigger button"
          >
            +
          </button>
        </div>
      </SortableContext>
    </DndContext>
  );
}; 