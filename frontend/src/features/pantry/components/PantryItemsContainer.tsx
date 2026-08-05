"use client";

import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { usePantryItems } from "../hooks/usePantryItems";
import { PantryItem as ApiPantryItem } from "../types/pantry.types";
import { useDeletePantryItem } from "../hooks/useDeletePantryItem";

// --- Types ---------------------------------------------------------------

type FreshnessState = "expired" | "soon" | "good";

interface PantryItemsContainerProps {
  mode: "add" | "edit";
  onEdit: (itemId: string) => void;
}

interface DisplayPantryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  quantity: string;
  freshness: FreshnessState;
  dateLabel: string;
}

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

const formatExpiry = (expiryDate: string | null) => {
  if (!expiryDate) {
    return { freshness: "good" as FreshnessState, label: "No expiry" };
  }

  const expiry = new Date(expiryDate);
  if (isNaN(expiry.getTime())) {
    return { freshness: "good" as FreshnessState, label: "No expiry" };
  }

  const now = new Date();
  const diffDays = Math.ceil(
    (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  const label = expiry.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

  if (diffDays < 0) {
    return { freshness: "expired" as FreshnessState, label };
  }

  if (diffDays <= 7) {
    return { freshness: "soon" as FreshnessState, label };
  }

  return { freshness: "good" as FreshnessState, label };
};

const mapApiToDisplayItem = (item: ApiPantryItem): DisplayPantryItem => {
  const { freshness, label } = formatExpiry(item.expiry_date);

  return {
    id: item.id.toString(),
    name: item.ingredient_name,
    category: item.category,
    location: item.is_low_stock ? "Low stock" : "Available",
    quantity: `${item.quantity} ${item.unit}`,
    freshness,
    dateLabel: label,
  };
};

// --- Component ---------------------------------------------------------------

const PantryItemsContainer = ({ mode, onEdit }: PantryItemsContainerProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const {
    data: pantryResponse,
    isLoading,
    isError,
    error,
  } = usePantryItems(search);
  const { mutate: deletePantry } = useDeletePantryItem();
  const pantryItems: DisplayPantryItem[] = (pantryResponse?.data ?? []).map(
    mapApiToDisplayItem,
  );

  const visibleItems =
    activeCategory === "All"
      ? pantryItems
      : pantryItems.filter((item) => item.category === activeCategory);

  const toggleChange = (text: string) => {
    setSearch(text);
  };

  const handleEdit = (itemId: string) => {
    // console.log("Edit item:", itemId);
    // setMode("edit")
    onEdit(itemId);
    // TODO: Implement edit functionality
  };
  console.log("MODE in panry container-->", mode);

  const handleDelete = (itemId: string) => {
    console.log("Delete item:", itemId);
    // TODO: Implement delete functionality
    deletePantry(Number(itemId));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">Loading pantry items...</div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md border border-red-300 bg-red-50 p-4 text-red-600">
        {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="font-sans">
      <div className="mb-6">
        <input
          type="search"
          name="search"
          id="search-input"
          value={search}
          placeholder="Search pantry items..."
          onChange={(e) => toggleChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B6673A]"
        />
      </div>
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
        {visibleItems.length === 0 ? (
          <div className="rounded-md border border-dashed p-10 text-center">
            <h2 className="text-xl font-semibold">Your pantry is empty</h2>
            <p className="mt-2 text-gray-500">
              Add your first ingredient to get started.
            </p>
          </div>
        ) : (
          <>
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

                {/* Edit and Delete Icons */}
                <div className="absolute top-1 right-32 flex gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="p-1.5 hover:bg-[#D9D0B7] rounded transition-colors"
                    title="Edit item"
                  >
                    <Edit2 size={16} className="text-[#6B6250]" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 hover:bg-[#D9D0B7] rounded transition-colors"
                    title="Delete item"
                  >
                    <Trash2 size={16} className="text-[#A8452E]" />
                  </button>
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
          </>
        )}
      </div>
    </div>
  );
};

export default PantryItemsContainer;
