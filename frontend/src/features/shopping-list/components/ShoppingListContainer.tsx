"use client";

import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Check,
  ShoppingBasket,
  Plus,
  PackageCheck,
  CircleAlert,
  Trash2,
  RotateCcw,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";
import { useGetShoppingList } from "../hooks/useGetShoppingList";
import type { GetShoppingListResponse } from "../types/shopping-list.types";
import { useUpdateShoppingListItemStatus } from "../hooks/useUpdateShoppingListItemStatus";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface ShoppingItem {
  id: number;
  ingredient_name: string;
  required_quantity: number;
  pantry_quantity: number;
  quantity_to_buy: number;
  unit: string;
  category: string;
  status: "PENDING" | "PURCHASED";
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const weekData = {
  start_date: "2026-08-17",
  end_date: "2026-08-23",
};

const formatDate = (dateString: string) => {
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const ShoppingListContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const queryClient = useQueryClient();
  const updateStatus = useUpdateShoppingListItemStatus();

  const { data, refetch } = useGetShoppingList();
  const items = data?.data?.items ?? [];

  /* ---------------------------------------------------------------------- */
  /* Categories                                                             */
  /* ---------------------------------------------------------------------- */

  // const categories = useMemo(() => {
  //   return ["All", ...Array.from(new Set(items.map((item) => item.category)))];
  // }, [items]);

  /* ---------------------------------------------------------------------- */
  /* Filtered Items                                                         */
  /* ---------------------------------------------------------------------- */

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") {
      return items;
    }

    return items.filter((item) => item.status !== "PURCHASED");
  }, [items, selectedCategory]);

  /* ---------------------------------------------------------------------- */
  /* Statistics                                                             */
  /* ---------------------------------------------------------------------- */

  const totalItems = items.length;
  const completedItems = items.filter((item) => item.status === "PURCHASED").length;
  const pendingItems = totalItems - completedItems;

  const progress =
    totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);

  /* ---------------------------------------------------------------------- */
  /* Actions                                                                */
  /* ---------------------------------------------------------------------- */

  const toggleItem = (id: number) => {
    updateStatus.mutate({
      id,
      status: "PURCHASED"
    })
  };

  const clearCompleted = () => {
    queryClient.setQueryData<GetShoppingListResponse>(
      ["shopping-list", undefined],
      (previousData) => {
        if (!previousData) {
          return previousData;
        }

        return {
          ...previousData,
          data: {
            ...previousData.data,
            items: previousData.data.items.filter((item) => !item.completed),
          },
        };
      },
    );
  };

  const resetItems = async () => {
    setSelectedCategory("All");
    await refetch();
  };

  return (
    <div className="min-h-screen bg-[#07110B] text-[#F3EEDF]">
      {/* ---------------------------------------------------------------- */}
      {/* Header                                                           */}
      {/* ---------------------------------------------------------------- */}

      <div className="border-b border-[#26382A] px-3 py-6 lg:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#C86B38]/10 p-3">
                <ShoppingBasket className="h-7 w-7 text-[#D88A3E]" />
              </div>

              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Shopping List
                </h1>

                <p className="mt-1 text-sm text-[#8D988E]">
                  Everything you need for your weekly meal plan.
                </p>
              </div>
            </div>
          </div>

          {/* <button
            type="button"
            className="flex w-fit items-center gap-2 rounded-xl bg-[#C86B38] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D9824A]"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button> */}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Main                                                             */}
      {/* ---------------------------------------------------------------- */}

      <main className="mx-auto max-w-[1600px] px-3 py-6 lg:px-6">
        {/* -------------------------------------------------------------- */}
        {/* Week Navigation                                                */}
        {/* -------------------------------------------------------------- */}

        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center overflow-hidden rounded-xl border border-[#344238] bg-[#101D14]">
              <button
                type="button"
                className="border-r border-[#344238] p-3 text-[#A8A99A] transition hover:text-[#E8A06F]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 px-5 py-3">
                <CalendarDays className="h-4 w-4 text-[#D88A3E]" />

                <span className="text-sm font-medium">
                  {formatDate(weekData.start_date)}
                  {" - "}
                  {formatDate(weekData.end_date)}
                </span>
              </div>

              <button
                type="button"
                className="border-l border-[#344238] p-3 text-[#A8A99A] transition hover:text-[#E8A06F]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              className="rounded-xl border border-[#344238] bg-[#101D14] px-5 py-3 text-sm transition hover:border-[#C86B38]"
            >
              Current Week
            </button>
          </div>

          <button
            type="button"
            onClick={resetItems}
            className="flex w-fit items-center gap-2 rounded-xl border border-[#344238] bg-[#101D14] px-4 py-3 text-sm text-[#C5C9BE] transition hover:border-[#C86B38]"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Demo
          </button>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Statistics                                                     */}
        {/* -------------------------------------------------------------- */}

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#26382A] bg-[#101D14] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#8D988E]">Total Items</p>

                <p className="mt-2 text-3xl font-semibold">{totalItems}</p>
              </div>

              <div className="rounded-xl bg-[#C86B38]/10 p-3">
                <ClipboardList className="h-6 w-6 text-[#D88A3E]" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#26382A] bg-[#101D14] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#8D988E]">Purchased</p>

                <p className="mt-2 text-3xl font-semibold text-[#8FAF6C]">
                  {completedItems}
                </p>
              </div>

              <div className="rounded-xl bg-[#769A57]/10 p-3">
                <CheckCircle2 className="h-6 w-6 text-[#769A57]" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#26382A] bg-[#101D14] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#8D988E]">Remaining</p>

                <p className="mt-2 text-3xl font-semibold text-[#E8A06F]">
                  {pendingItems}
                </p>
              </div>

              <div className="rounded-xl bg-[#C86B38]/10 p-3">
                <CircleAlert className="h-6 w-6 text-[#D88A3E]" />
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Progress                                                       */}
        {/* -------------------------------------------------------------- */}

        <div className="mb-6 rounded-2xl border border-[#26382A] bg-[#101D14] p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-medium">Weekly Shopping Progress</h2>

              <p className="mt-1 text-sm text-[#7E887F]">
                {completedItems} of {totalItems} items completed
              </p>
            </div>

            <span className="text-xl font-semibold text-[#E8A06F]">
              {progress}%
            </span>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#26382A]">
            <div
              className="h-full rounded-full bg-[#C86B38] transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Content                                                        */}
        {/* -------------------------------------------------------------- */}

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
          {/* ------------------------------------------------------------ */}
          {/* Shopping Items                                              */}
          {/* ------------------------------------------------------------ */}

          <section className="overflow-hidden rounded-2xl border border-[#26382A] bg-[#0E1B12]">
            {/* Section Header */}

            <div className="flex flex-col gap-4 border-b border-[#26382A] p-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Your Shopping Items</h2>

                <p className="mt-1 text-sm text-[#7E887F]">
                  Based on your selected weekly meal plan.
                </p>
              </div>

              <button
                type="button"
                onClick={clearCompleted}
                className="flex w-fit items-center gap-2 rounded-lg border border-[#344238] px-4 py-2 text-xs text-[#A8A99A] transition hover:border-red-400 hover:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear Completed
              </button>
            </div>

            {/* Category Filter */}

            {/* <div className="flex gap-2 overflow-x-auto border-b border-[#26382A] p-4">
              {categories.map((category) => {
                const active = category === selectedCategory;

                return (
                  <button
                    type="button"
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs transition ${
                      active
                        ? "bg-[#C86B38] text-white"
                        : "border border-[#344238] bg-[#101D14] text-[#9DA695] hover:border-[#C86B38]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div> */}

            {/* Items */}

            <div className="divide-y divide-[#26382A]">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`group flex flex-col gap-4 p-5 transition md:flex-row md:items-center ${
                      item.completed
                        ? "bg-[#101D14]/50 opacity-60"
                        : "hover:bg-[#142117]"
                    }`}
                  >
                    {/* Checkbox */}

                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition ${
                        item.completed
                          ? "border-[#769A57] bg-[#769A57]"
                          : "border-[#556052] hover:border-[#C86B38]"
                      }`}
                    >
                      {item.completed && (
                        <Check className="h-4 w-4 text-white" />
                      )}
                    </button>

                    {/* Item */}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={`font-medium ${
                            item.status === "PURCHASED" ? "text-[#788278] line-through" : ""
                          }`}
                        >
                          {item.ingredient_name}
                        </h3>

                        {/* <span className="rounded-md bg-[#293B20] px-2 py-1 text-[10px] text-[#AEBB9D]">
                          {item.category}
                        </span> */}
                      </div>

                      <p className="mt-1 text-xs text-[#758076]">
                        Required: {item.required_quantity} {item.unit}
                        {" • "}
                        In pantry: {item.pantry_quantity} {item.unit}
                      </p>
                    </div>

                    {/* Buy Quantity */}

                    <div className="flex items-center justify-between gap-4 rounded-xl bg-[#172319] px-4 py-3 md:min-w-[160px]">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#7E887F]">
                          Buy
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#E8A06F]">
                          {item.quantity_to_buy} {item.unit}
                        </p>
                      </div>

                      {item.completed && (
                        <PackageCheck className="h-5 w-5 text-[#769A57]" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
                  <div className="rounded-full bg-[#769A57]/10 p-5">
                    <ShoppingBasket className="h-8 w-8 text-[#769A57]" />
                  </div>

                  <h3 className="mt-4 font-semibold">No items found</h3>

                  <p className="mt-2 text-sm text-[#758076]">
                    There are no shopping items in this category.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* ------------------------------------------------------------ */}
          {/* Sidebar                                                     */}
          {/* ------------------------------------------------------------ */}

          <aside className="space-y-5">
            {/* Summary */}

            <div className="rounded-2xl border border-[#26382A] bg-[#0E1B12] p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#C86B38]/10 p-3">
                  <ShoppingBasket className="h-5 w-5 text-[#D88A3E]" />
                </div>

                <div>
                  <h3 className="font-medium">Weekly Summary</h3>

                  <p className="mt-1 text-xs text-[#758076]">
                    Your current shopping progress
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <SummaryRow label="Total items" value={String(totalItems)} />

                <SummaryRow
                  label="Purchased"
                  value={String(completedItems)}
                  valueClass="text-[#769A57]"
                />

                <SummaryRow
                  label="Remaining"
                  value={String(pendingItems)}
                  valueClass="text-[#E8A06F]"
                />
              </div>
            </div>

            {/* Smart Info */}

            <div className="rounded-2xl border border-[#26382A] bg-[#101D14] p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-[#769A57]/10 p-3">
                  <PackageCheck className="h-5 w-5 text-[#769A57]" />
                </div>

                <div>
                  <h3 className="font-medium">Pantry Connected</h3>

                  <p className="mt-2 text-xs leading-5 text-[#758076]">
                    Items you already have in your pantry are automatically
                    considered when creating your shopping list.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip */}

            <div className="rounded-2xl border border-[#4A5238] bg-[#172319] p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-[#D88A3E]">
                Smart Tip
              </p>

              <p className="mt-3 text-sm leading-6 text-[#AEB5A8]">
                Your shopping list is generated from your weekly meal plan.
                Complete items as you purchase them and keep track of
                what&apos;s remaining.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Summary Row                                                                */
/* -------------------------------------------------------------------------- */

interface SummaryRowProps {
  label: string;
  value: string;
  valueClass?: string;
}

const SummaryRow = ({
  label,
  value,
  valueClass = "text-[#F3EEDF]",
}: SummaryRowProps) => {
  return (
    <div className="flex items-center justify-between border-b border-[#26382A] pb-3 last:border-b-0 last:pb-0">
      {" "}
      <span className="text-sm text-[#8D988E]">{label} </span>
      <span className={`text-sm font-semibold ${valueClass}`}>{value}</span>
    </div>
  );
};

export default ShoppingListContainer;
