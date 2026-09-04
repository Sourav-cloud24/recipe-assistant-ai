"use client";

import {
  CalendarDays,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Package,
  ShoppingCart,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Utensils,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useOverview } from "../hooks/useOverview";

// --------------------------------------------------
// Reusable Components
// --------------------------------------------------

const StatCard = ({
  icon,
  title,
  value,
  description,
  iconClass,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  description: string;
  iconClass: string;
}) => {
  return (
    <div className="rounded-2xl border border-[#e5e1d8] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${iconClass}`}
        >
          {icon}
        </div>

        <div>
          <p className="text-sm font-medium text-gray-600">
            {title}
          </p>

          <h2 className="mt-1 text-3xl font-bold text-[#142019]">
            {value}
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

// --------------------------------------------------
// Pantry Overview
// --------------------------------------------------

const PantryOverview = ({
  pantry,
}: {
  pantry: {
    total_items: number;
    low_stock_items: number;
    expiring_soon_items: number;
  };
}) => {
  const {
    total_items,
    low_stock_items,
    expiring_soon_items,
  } = pantry;

  const normalStockItems =
    total_items - low_stock_items - expiring_soon_items;

  const lowStockPercentage =
    total_items > 0
      ? Math.round((low_stock_items / total_items) * 100)
      : 0;

  const expiringPercentage =
    total_items > 0
      ? Math.round(
          (expiring_soon_items / total_items) * 100
        )
      : 0;

  const normalStockPercentage =
    total_items > 0
      ? 100 - lowStockPercentage - expiringPercentage
      : 0;

  return (
    <div className="rounded-2xl border border-[#e5e1d8] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-[#142019]">
          Pantry Overview
        </h2>
      </div>

      <div className="flex flex-col items-center gap-6 sm:flex-row">
        {/* Donut */}
        <div
          className="relative flex h-48 w-48 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(
              #4ba65b 0% ${normalStockPercentage}%,
              #f39b2f ${normalStockPercentage}% ${
                normalStockPercentage + lowStockPercentage
              }%,
              #e44b3c ${
                normalStockPercentage + lowStockPercentage
              }% 100%
            )`,
          }}
        >
          <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
            <span className="text-3xl font-bold text-[#142019]">
              {total_items}
            </span>

            <span className="text-xs text-gray-500">
              Total Items
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-3">
          <LegendItem
            dot="bg-[#4ba65b]"
            label="Good Stock"
            value={normalStockItems}
            percentage={`${normalStockPercentage}%`}
          />

          <LegendItem
            dot="bg-[#f39b2f]"
            label="Running Low"
            value={low_stock_items}
            percentage={`${lowStockPercentage}%`}
          />

          <LegendItem
            dot="bg-[#e44b3c]"
            label="Expiring Soon"
            value={expiring_soon_items}
            percentage={`${expiringPercentage}%`}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl bg-[#eff8ef] px-4 py-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-[#3c8b4b]" />

          <span className="text-sm text-[#285e32]">
            {expiring_soon_items} items expiring soon
          </span>
        </div>

        <button className="text-sm font-medium text-[#287638] hover:underline">
          View Pantry
        </button>
      </div>
    </div>
  );
};

// --------------------------------------------------
// Legend Item
// --------------------------------------------------

const LegendItem = ({
  dot,
  label,
  value,
  percentage,
}: {
  dot: string;
  label: string;
  value: number;
  percentage: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span
          className={`h-2.5 w-2.5 rounded-full ${dot}`}
        />

        <span className="text-sm text-gray-600">
          {label}
        </span>
      </div>

      <span className="text-sm font-medium text-gray-700">
        {value} ({percentage})
      </span>
    </div>
  );
};

// --------------------------------------------------
// Upcoming Meals
// --------------------------------------------------

const UpcomingMeals = ({
  meals,
}: {
  meals: {
    id: string;
    meal_date: string;
    meal_type: string;
    notes: string | null;
    recipe_id: string;
    recipe_title: string;
  }[];
}) => {
  const formatMealDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="rounded-2xl border border-[#e5e1d8] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#142019]">
          Upcoming Meals
        </h2>

        <CalendarDays className="h-5 w-5 text-gray-500" />
      </div>

      <div className="space-y-3">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div
              key={meal.id}
              className="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-0"
            >
              {/* Meal Icon */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#eff8ef]">
                <Utensils className="h-6 w-6 text-[#4ba65b]" />
              </div>

              {/* Meal Info */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-[#142019]">
                  {meal.recipe_title}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {meal.meal_type} •{" "}
                  {formatMealDate(meal.meal_date)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="py-6 text-center text-sm text-gray-500">
            No meals planned for this week.
          </p>
        )}
      </div>

      <button className="mt-4 flex items-center gap-2 text-sm font-medium text-[#d36c34] hover:underline">
        View Meal Planner
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

// --------------------------------------------------
// Shopping Summary
// --------------------------------------------------

const ShoppingSummary = ({
  shopping,
}: {
  shopping: {
    total_items: number;
    pending_items: number;
    purchased_items: number;
  };
}) => {
  const {
    total_items,
    pending_items,
    purchased_items,
  } = shopping;

  const purchasedPercentage =
    total_items > 0
      ? Math.round(
          (purchased_items / total_items) * 100
        )
      : 0;

  const pendingPercentage =
    total_items > 0
      ? Math.round(
          (pending_items / total_items) * 100
        )
      : 0;

  return (
    <div className="rounded-2xl border border-[#e5e1d8] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#142019]">
          Shopping List Summary
        </h2>

        <ShoppingCart className="h-5 w-5 text-gray-500" />
      </div>

      <div className="flex items-center justify-center">
        <div
          className="relative flex h-48 w-48 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(
              #4ba65b 0% ${purchasedPercentage}%,
              #e46b2e ${purchasedPercentage}% 100%
            )`,
          }}
        >
          <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
            <span className="text-3xl font-bold text-[#142019]">
              {total_items}
            </span>

            <span className="text-xs text-gray-500">
              Total Items
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {/* Purchased */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#4ba65b]" />

            <span className="text-sm text-gray-600">
              Purchased
            </span>
          </div>

          <span className="text-sm font-medium">
            {purchased_items} ({purchasedPercentage}%)
          </span>
        </div>

        {/* Pending */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e46b2e]" />

            <span className="text-sm text-gray-600">
              To Buy
            </span>
          </div>

          <span className="text-sm font-medium">
            {pending_items} ({pendingPercentage}%)
          </span>
        </div>
      </div>

      <button className="mt-5 flex items-center gap-2 text-sm font-medium text-[#d36c34] hover:underline">
        View Shopping List
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

// --------------------------------------------------
// Expiring Soon
// --------------------------------------------------

const ExpiringSoon = ({
  count,
}: {
  count: number;
}) => {
  return (
    <div className="rounded-2xl border border-[#e5e1d8] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#142019]">
          Expiring Soon
        </h2>

        <AlertTriangle className="h-5 w-5 text-[#e17a2e]" />
      </div>

      <div className="flex flex-col items-center justify-center py-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1e7]">
          <AlertTriangle className="h-8 w-8 text-[#e17a2e]" />
        </div>

        <p className="mt-4 text-3xl font-bold text-[#142019]">
          {count}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          items expiring soon
        </p>
      </div>

      <button className="mt-4 flex items-center gap-2 text-sm font-medium text-[#d36c34] hover:underline">
        View All Pantry
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

// --------------------------------------------------
// Recently Generated Recipes
// --------------------------------------------------

const RecentRecipes = ({
  recipes,
}: {
  recipes: {
    id: string;
    title: string;
    description: string;
    cuisine: string | null;
    diet: string | null;
    cooking_time: number;
    servings: number;
    source: string;
    created_at: string;
  }[];
}) => {
  return (
    <div className="rounded-2xl border border-[#e5e1d8] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#142019]">
            Recently Generated Recipes
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Your latest AI-generated recipes
          </p>
        </div>

        <Sparkles className="h-5 w-5 text-[#d36c34]" />
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Recipe Image Placeholder */}
              <div className="relative flex h-32 items-center justify-center overflow-hidden bg-[#eff8ef]">
                <ChefHat className="h-12 w-12 text-[#4ba65b]" />
              </div>

              <div className="p-3">
                <h3 className="line-clamp-1 text-sm font-semibold text-[#142019]">
                  {recipe.title}
                </h3>

                {recipe.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                    {recipe.description}
                  </p>
                )}

                <div className="mt-2 flex flex-wrap gap-2">
                  {recipe.diet && (
                    <span className="rounded-full bg-[#eaf6e9] px-2 py-1 text-[10px] font-medium text-[#398443]">
                      {recipe.diet}
                    </span>
                  )}

                  {recipe.cuisine && (
                    <span className="rounded-full bg-[#fff1e7] px-2 py-1 text-[10px] font-medium text-[#d36c34]">
                      {recipe.cuisine}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
                  <Clock3 className="h-3.5 w-3.5" />

                  <span>
                    {recipe.cooking_time} min
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full py-6 text-center text-sm text-gray-500">
            No recently generated recipes.
          </p>
        )}
      </div>

      <button className="mt-5 flex items-center gap-2 text-sm font-medium text-[#d36c34] hover:underline">
        View All Recipes
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

// --------------------------------------------------
// Main Dashboard
// --------------------------------------------------

const DashboardContainer = () => {
  // --------------------------------------------------
  // Selected Week
  // --------------------------------------------------

  const [selectedDateByUser, setSelectedDateByUser] =
    useState<string>(() => {
      const today = new Date();

      const day = today.getDay();

      const diff = day === 0 ? -6 : 1 - day;

      const monday = new Date(today);

      monday.setDate(today.getDate() + diff);

      return monday.toISOString().split("T")[0];
    });

  // --------------------------------------------------
  // Dashboard API
  // --------------------------------------------------

  const {
    data: overviewResponse,
    isLoading: isOverviewLoading,
    isError: isOverviewError,
    error: overviewError,
  } = useOverview(selectedDateByUser);

  // --------------------------------------------------
  // Extract API Data
  // --------------------------------------------------

  const overviewdata = overviewResponse?.data;

  // --------------------------------------------------
  // Week Navigation
  // --------------------------------------------------

  const changeWeek = (direction: number) => {
    const currentDate = new Date(
      `${selectedDateByUser}T00:00:00`
    );

    currentDate.setDate(
      currentDate.getDate() + direction * 7
    );

    setSelectedDateByUser(
      currentDate.toISOString().split("T")[0]
    );
  };

  // --------------------------------------------------
  // Week Label
  // --------------------------------------------------

  const weekLabel = useMemo(() => {
    if (!overviewdata?.week) {
      return "";
    }

    const startDate = new Date(
      `${overviewdata.week.start_date}T00:00:00`
    );

    const endDate = new Date(
      `${overviewdata.week.end_date}T00:00:00`
    );

    const start = startDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    const end = endDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return `${start} – ${end}`;
  }, [overviewdata]);

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (isOverviewLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#4ba65b]" />

          <p className="mt-3 text-sm text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Error
  // --------------------------------------------------

  if (isOverviewError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="font-medium text-red-500">
            Failed to load dashboard
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {overviewError instanceof Error
              ? overviewError.message
              : "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // No Data
  // --------------------------------------------------

  if (!overviewdata) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">
          No dashboard data available.
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="min-h-screen">
      <main className="p-5 lg:p-7">

        {/* ----------------------------------------
            HEADER
        ----------------------------------------- */}

        <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-[#142019]">
                Welcome back, Sourav!
              </h1>

              <span className="text-2xl">👋</span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Here&apos;s what&apos;s cooking in your kitchen today.
            </p>
          </div>

          {/* Week Selector */}
          <div className="flex items-center self-start overflow-hidden rounded-xl border border-[#ddd9cf] bg-white">
            <div className="flex items-center gap-2 px-4 py-3">
              <CalendarDays className="h-4 w-4 text-gray-600" />

              <span className="whitespace-nowrap text-sm font-medium text-gray-700">
                {weekLabel}
              </span>
            </div>

            <button
              onClick={() => changeWeek(-1)}
              className="border-l border-[#ddd9cf] px-4 py-3 transition hover:bg-gray-50"
              aria-label="Previous week"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={() => changeWeek(1)}
              className="border-l border-[#ddd9cf] px-4 py-3 transition hover:bg-gray-50"
              aria-label="Next week"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ----------------------------------------
            STAT CARDS
        ----------------------------------------- */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={
              <Package className="h-7 w-7 text-[#42924d]" />
            }
            title="Pantry Items"
            value={overviewdata.pantry.total_items}
            description={`${overviewdata.pantry.low_stock_items} running low`}
            iconClass="bg-[#edf8ed]"
          />

          <StatCard
            icon={
              <ChefHat className="h-7 w-7 text-[#db762f]" />
            }
            title="Recipes Generated"
            value={overviewdata.recent_recipes.length}
            description="Recently generated recipes"
            iconClass="bg-[#fff1e7]"
          />

          <StatCard
            icon={
              <CalendarDays className="h-7 w-7 text-[#7054c9]" />
            }
            title="Meals Planned"
            value={overviewdata.upcoming_meals.length}
            description="Meals planned this week"
            iconClass="bg-[#f2effc]"
          />

          <StatCard
            icon={
              <ShoppingCart className="h-7 w-7 text-[#3985bb]" />
            }
            title="Shopping List"
            value={overviewdata.shopping_list.total_items}
            description={`${overviewdata.shopping_list.pending_items} pending items`}
            iconClass="bg-[#edf6fc]"
          />
        </div>

        {/* ----------------------------------------
            MIDDLE SECTION
        ----------------------------------------- */}

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">

          {/* Pantry */}
          <PantryOverview
            pantry={overviewdata.pantry}
          />

          {/* Upcoming Meals */}
          <UpcomingMeals
            meals={overviewdata.upcoming_meals}
          />

          {/* Shopping */}
          <ShoppingSummary
            shopping={overviewdata.shopping_list}
          />
        </div>

        {/* ----------------------------------------
            BOTTOM SECTION
        ----------------------------------------- */}

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">

          {/* Expiring */}
          <ExpiringSoon
            count={overviewdata.pantry.expiring_soon_items}
          />

          {/* Recipes */}
          <div className="xl:col-span-2">
            <RecentRecipes
              recipes={overviewdata.recent_recipes}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardContainer;