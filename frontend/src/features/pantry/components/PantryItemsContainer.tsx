"use client";

import { useState } from "react";

// --- Types ---------------------------------------------------------------

type FreshnessState = "expired" | "soon" | "good";

interface PantryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  quantity: string;
  freshness: FreshnessState;
  dateLabel: string; // e.g. "05 Feb" or "Jun 2027"
}

// --- Dummy data ------------------------------------------------------------

const CATEGORIES = [
  "All",
  "Fruits",
  "Dairy",
  "Meat",
  "Grains",
  "Canned goods",
  "Condiments",
  "Spices",
  "Other",
];

const PANTRY_ITEMS: PantryItem[] = [
  {
    id: "1",
    name: "Strawberries",
    category: "Fruits",
    location: "Punnet, chilled",
    quantity: "250 g",
    freshness: "expired",
    dateLabel: "05 Feb",
  },
  {
    id: "2",
    name: "Chickpeas",
    category: "Canned goods",
    location: "Pantry shelf, dry store",
    quantity: "1 can",
    freshness: "good",
    dateLabel: "Feb 2027",
  },
  {
    id: "3",
    name: "Ketchup",
    category: "Condiments",
    location: "Door shelf, fridge",
    quantity: "420 ml",
    freshness: "good",
    dateLabel: "Nov 2026",
  },
  {
    id: "4",
    name: "Canned tomatoes",
    category: "Canned goods",
    location: "Pantry shelf, dry store",
    quantity: "2 cans",
    freshness: "soon",
    dateLabel: "12 Aug",
  },
  {
    id: "5",
    name: "Salted butter",
    category: "Dairy",
    location: "Fridge, top shelf",
    quantity: "200 g",
    freshness: "soon",
    dateLabel: "09 Aug",
  },
  {
    id: "6",
    name: "Basmati rice",
    category: "Grains",
    location: "Pantry shelf, sealed jar",
    quantity: "1.5 kg",
    freshness: "good",
    dateLabel: "Jun 2027",
  },
  {
    id: "7",
    name: "Smoked paprika",
    category: "Spices",
    location: "Spice rack, small tin",
    quantity: "60 g",
    freshness: "good",
    dateLabel: "Jan 2027",
  },
  {
    id: "8",
    name: "Chicken thighs",
    category: "Meat",
    location: "Freezer, bottom drawer",
    quantity: "800 g",
    freshness: "expired",
    dateLabel: "28 Jul",
  },
];

const FRESHNESS_LABEL: Record<FreshnessState, string> = {
  expired: "Expired",
  soon: "Soon",
  good: "Good",
};

const STAMP_CLASSES: Record<FreshnessState, string> = {
  expired: "border-[#A8452E] text-[#A8452E] -rotate-3",
  soon: "border-[#B4842C] text-[#B4842C] -rotate-3",
  good: "border-[#4C6B3D] text-[#4C6B3D] rotate-2",
};

// --- Component ---------------------------------------------------------------

const PantryItemsContainer = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleItems =
    activeCategory === "All"
      ? PANTRY_ITEMS
      : PANTRY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="font-sans">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        {CATEGORIES.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-mono text-[11px] tracking-wider uppercase px-3.5 py-2 rounded-full border transition-colors ${
                isActive
                  ? "bg-[#B6673A] border-[#B6673A] text-[#F4EFE2]"
                  : "bg-transparent border-[#C9BF9F] text-[#F4EFE2] hover:border-[#B6673A]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className="relative bg-[#EDE6D3] text-[#1F2B22] rounded-sm px-5 pt-5.5 pb-4.5 shadow-[0_10px_0_-6px_rgba(0,0,0,0.15)]"
          >
            {/* dashed top edge */}
            <div
              className="absolute top-0 left-6 right-6 h-1.5 border-b border-dashed border-[#B6AB84]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #EDE6D3 0 6px, transparent 6px 10px)",
              }}
            />

            <div className="absolute -top-0.5 right-5 bg-[#7C8768] text-[#F4EFE2] font-mono text-[10px] tracking-wider uppercase px-2 pt-1.25 pb-1.5">
              {item.category}
            </div>

            <h3 className="font-serif font-semibold text-xl mt-3.5 mb-0.5">
              {item.name}
            </h3>
            <div className="text-xs text-[#6B6250] mb-3.5">
              {item.location}
            </div>

            <div className="flex justify-between text-[13px] text-[#6B6250] mb-2.5">
              <span>On hand</span>
              <span className="font-mono text-[#1F2B22] text-[13px]">
                {item.quantity}
              </span>
            </div>

            <span
              className={`inline-block font-mono text-[11px] tracking-wider uppercase px-2.5 py-1 rounded-[3px] border-[1.5px] ${STAMP_CLASSES[item.freshness]}`}
            >
              {FRESHNESS_LABEL[item.freshness]} · {item.dateLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PantryItemsContainer;