import React from "react";

export interface TriggerButton {
  id: number;
  label: string;
}

interface TriggerGridProps {
  buttons: TriggerButton[];
  onAdd: () => void;
}

export const TriggerGrid: React.FC<TriggerGridProps> = ({ buttons, onAdd }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {buttons.map((button) => (
        <div key={button.id} className="flex flex-col items-center justify-center bg-blue-100 rounded-xl p-6 min-h-[100px] shadow">
          <span className="font-semibold text-blue-900">{button.label}</span>
        </div>
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
  );
}; 