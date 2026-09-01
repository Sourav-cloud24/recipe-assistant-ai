"use client";

import {
  CalendarDays,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Leaf,
  Package,
  ShoppingCart,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Utensils,
} from "lucide-react";

// --------------------------------------------------
// Dummy Data
// Later these will come from APIs
// --------------------------------------------------

const dashboardData = {
  pantry: {
    totalItems: 32,
    runningLow: 5,
    expiringSoon: 4,
    freshItems: 14,
    goodStock: 9,
  },

  recipes: {
    generatedThisWeek: 18,
    newRecipes: 4,
  },

  meals: {
    plannedThisWeek: 21,
    remaining: 7,
  },

  shopping: {
    totalItems: 14,
    purchased: 6,
    pending: 8,
  },

  upcomingMeals: [
    {
      id: 1,
      name: "Paneer Butter Masala",
      mealType: "Lunch",
      date: "Mon, Aug 31",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300",
      diet: "Veg",
    },
    {
      id: 2,
      name: "Masala Oats",
      mealType: "Breakfast",
      date: "Tue, Sep 1",
      image:
        "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=300",
      diet: "Veg",
    },
    {
      id: 3,
      name: "Veg Biryani",
      mealType: "Dinner",
      date: "Tue, Sep 1",
      image:
        "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300",
      diet: "Veg",
    },
  ],

  expiringItems: [
    {
      id: 1,
      name: "Spinach",
      expiryDate: "Sep 2, 2026",
      remaining: "In 2 days",
      type: "vegetable",
    },
    {
      id: 2,
      name: "Milk",
      expiryDate: "Sep 3, 2026",
      remaining: "In 3 days",
      type: "dairy",
    },
    {
      id: 3,
      name: "Tomato",
      expiryDate: "Sep 4, 2026",
      remaining: "In 4 days",
      type: "vegetable",
    },
  ],

  recentRecipes: [
    {
      id: 1,
      name: "Veg Stir Fry Noodles",
      image:
        "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500",
      diet: "Veg",
      difficulty: "Easy",
    },
    {
      id: 2,
      name: "Chickpea Salad",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
      diet: "Vegan",
      difficulty: "Easy",
    },
    {
      id: 3,
      name: "Stuffed Bell Peppers",
      image:
        "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=500",
      diet: "Veg",
      difficulty: "Medium",
    },
    {
      id: 4,
      name: "Oats Pancakes",
      image:
        "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=500",
      diet: "Veg",
      difficulty: "Easy",
    },
  ],
};

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
          <p className="text-sm font-medium text-gray-600">{title}</p>

          <h2 className="mt-1 text-3xl font-bold text-[#142019]">
            {value}
          </h2>

          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

// --------------------------------------------------
// Pantry Donut
// --------------------------------------------------

const PantryOverview = () => {
  const {
    totalItems,
    freshItems,
    runningLow,
    expiringSoon,
    goodStock,
  } = dashboardData.pantry;

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
              #4ba65b 0% 44%,
              #f39b2f 44% 60%,
              #e44b3c 60% 73%,
              #4d94c6 73% 100%
            )`,
          }}
        >
          <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
            <span className="text-3xl font-bold text-[#142019]">
              {totalItems}
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
            label="Fresh"
            value={freshItems}
            percentage="44%"
          />

          <LegendItem
            dot="bg-[#f39b2f]"
            label="Running Low"
            value={runningLow}
            percentage="16%"
          />

          <LegendItem
            dot="bg-[#e44b3c]"
            label="Expiring Soon"
            value={expiringSoon}
            percentage="13%"
          />

          <LegendItem
            dot="bg-[#4d94c6]"
            label="Good Stock"
            value={goodStock}
            percentage="27%"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl bg-[#eff8ef] px-4 py-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-[#3c8b4b]" />

          <span className="text-sm text-[#285e32]">
            4 items expiring within 7 days
          </span>
        </div>

        <button className="text-sm font-medium text-[#287638] hover:underline">
          View Pantry
        </button>
      </div>
    </div>
  );
};

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
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />

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

const UpcomingMeals = () => {
  return (
    <div className="rounded-2xl border border-[#e5e1d8] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#142019]">
          Upcoming Meals
        </h2>

        <CalendarDays className="h-5 w-5 text-gray-500" />
      </div>

      <div className="space-y-3">
        {dashboardData.upcomingMeals.map((meal) => (
          <div
            key={meal.id}
            className="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-0"
          >
            <img
              src={meal.image}
              alt={meal.name}
              className="h-14 w-14 rounded-xl object-cover"
            />

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-[#142019]">
                {meal.name}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {meal.mealType} • {meal.date}
              </p>
            </div>

            <span className="rounded-full bg-[#eaf6e9] px-3 py-1 text-xs font-medium text-[#388642]">
              {meal.diet}
            </span>
          </div>
        ))}
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

const ShoppingSummary = () => {
  const { totalItems, purchased, pending } =
    dashboardData.shopping;

  const purchasedPercentage = Math.round(
    (purchased / totalItems) * 100
  );

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
              {totalItems}
            </span>

            <span className="text-xs text-gray-500">
              Total Items
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#4ba65b]" />

            <span className="text-sm text-gray-600">
              Purchased
            </span>
          </div>

          <span className="text-sm font-medium">
            {purchased} ({purchasedPercentage}%)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e46b2e]" />

            <span className="text-sm text-gray-600">
              To Buy
            </span>
          </div>

          <span className="text-sm font-medium">
            {pending} ({100 - purchasedPercentage}%)
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

const ExpiringSoon = () => {
  return (
    <div className="rounded-2xl border border-[#e5e1d8] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#142019]">
          Expiring Soon
        </h2>

        <AlertTriangle className="h-5 w-5 text-[#e17a2e]" />
      </div>

      <div>
        {dashboardData.expiringItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eff8ef]">
                {item.type === "dairy" ? (
                  <Package className="h-4 w-4 text-[#5a91b5]" />
                ) : (
                  <Leaf className="h-4 w-4 text-[#4ba65b]" />
                )}
              </div>

              <span className="text-sm font-medium text-gray-700">
                {item.name}
              </span>
            </div>

            <div className="text-right">
              <p className="text-xs font-medium text-gray-600">
                {item.expiryDate}
              </p>

              <p className="mt-1 text-xs text-[#dc4939]">
                {item.remaining}
              </p>
            </div>
          </div>
        ))}
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

const RecentRecipes = () => {
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
        {dashboardData.recentRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="group cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative h-32 overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-3">
              <h3 className="line-clamp-1 text-sm font-semibold text-[#142019]">
                {recipe.name}
              </h3>

              <div className="mt-2 flex gap-2">
                <span className="rounded-full bg-[#eaf6e9] px-2 py-1 text-[10px] font-medium text-[#398443]">
                  {recipe.diet}
                </span>

                <span className="rounded-full bg-[#fff1e7] px-2 py-1 text-[10px] font-medium text-[#d36c34]">
                  {recipe.difficulty}
                </span>
              </div>
            </div>
          </div>
        ))}
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

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="p-5 lg:p-7">
        {/* Header */}
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

          {/* Week selector */}
          <div className="flex items-center self-start overflow-hidden rounded-xl border border-[#ddd9cf] bg-white">
            <div className="flex items-center gap-2 px-4 py-3">
              <CalendarDays className="h-4 w-4 text-gray-600" />

              <span className="whitespace-nowrap text-sm font-medium text-gray-700">
                August 31 – September 6, 2026
              </span>
            </div>

            <button className="border-l border-[#ddd9cf] px-4 py-3 transition hover:bg-gray-50">
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button className="border-l border-[#ddd9cf] px-4 py-3 transition hover:bg-gray-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ----------------------------------------
            STAT CARDS
        ----------------------------------------- */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Package className="h-7 w-7 text-[#42924d]" />}
            title="Pantry Items"
            value={dashboardData.pantry.totalItems}
            description={`${dashboardData.pantry.runningLow} running low`}
            iconClass="bg-[#edf8ed]"
          />

          <StatCard
            icon={<ChefHat className="h-7 w-7 text-[#db762f]" />}
            title="Recipes Generated"
            value={dashboardData.recipes.generatedThisWeek}
            description={`${dashboardData.recipes.newRecipes} new recipes`}
            iconClass="bg-[#fff1e7]"
          />

          <StatCard
            icon={<CalendarDays className="h-7 w-7 text-[#7054c9]" />}
            title="Meals Planned"
            value={dashboardData.meals.plannedThisWeek}
            description={`${dashboardData.meals.remaining} meals remaining`}
            iconClass="bg-[#f2effc]"
          />

          <StatCard
            icon={<ShoppingCart className="h-7 w-7 text-[#3985bb]" />}
            title="Shopping List"
            value={dashboardData.shopping.totalItems}
            description={`${dashboardData.shopping.pending} pending items`}
            iconClass="bg-[#edf6fc]"
          />
        </div>

        {/* ----------------------------------------
            MIDDLE SECTION
        ----------------------------------------- */}
        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* Pantry */}
          <PantryOverview />

          {/* Upcoming Meals */}
          <UpcomingMeals />

          {/* Shopping */}
          <ShoppingSummary />
        </div>

        {/* ----------------------------------------
            BOTTOM SECTION
        ----------------------------------------- */}
        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* Expiring */}
          <ExpiringSoon />

          {/* Recipes */}
          <div className="xl:col-span-2">
            <RecentRecipes />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;