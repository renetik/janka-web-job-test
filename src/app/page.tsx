"use client";

import { useState } from "react";
import { TriggerGrid } from "./components/TriggerGrid";

const DEFAULT_TABS = [
  { id: 1, label: "Triggers Group 01", color: "bg-blue-700" },
  { id: 2, label: "Triggers Group 02", color: "bg-yellow-400" },
  { id: 3, label: "Triggers Group 03", color: "bg-green-600" },
  { id: 4, label: "Triggers Group 04", color: "bg-blue-500" },
  { id: 5, label: "Triggers Group N", color: "bg-purple-700" },
];

export default function Dashboard() {
  const [tabs, setTabs] = useState(DEFAULT_TABS);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // Limited color palette for new tabs
  const TAB_COLORS = [
    "bg-blue-700",
    "bg-yellow-400",
    "bg-green-600",
    "bg-blue-500",
    "bg-purple-700",
    "bg-pink-500",
    "bg-red-500",
    "bg-orange-400",
    "bg-teal-500",
    "bg-indigo-600",
  ];

  // State for buttons per tab
  const [tabButtons, setTabButtons] = useState<{ [tabId: number]: { id: number; label: string }[] }>({});

  const handleAddTab = () => {
    const nextId = tabs.length ? Math.max(...tabs.map(t => t.id)) + 1 : 1;
    const color = TAB_COLORS[nextId % TAB_COLORS.length];
    const newTab = {
      id: nextId,
      label: `Triggers Group ${nextId.toString().padStart(2, '0')}`,
      color,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  // Add a new button to the active tab
  const handleAddButton = () => {
    setTabButtons((prev) => {
      const current = prev[activeTab] || [];
      const nextId = current.length ? Math.max(...current.map(b => b.id)) + 1 : 1;
      const newButton = { id: nextId, label: `Trigger Button ${nextId.toString().padStart(2, '0')}` };
      return { ...prev, [activeTab]: [...current, newButton] };
    });
  };

  // Get buttons for the active tab
  const buttons = tabButtons[activeTab] || [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-2 sm:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Dashboard Layout</h1>
      {/* Tabs */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-2 rounded-xl text-white font-semibold shadow transition-all ${tab.color} ${activeTab === tab.id ? 'ring-4 ring-offset-2 ring-gray-300' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        {/* Add new tab button (UI only for now) */}
        <button onClick={handleAddTab} className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 font-bold shadow hover:bg-gray-300 transition-all">+</button>
      </div>
      {/* Main grid area */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow p-6 min-h-[400px] flex flex-col items-center border border-gray-200">
        <TriggerGrid buttons={buttons} onAdd={handleAddButton} />
      </div>
    </div>
  );
}
