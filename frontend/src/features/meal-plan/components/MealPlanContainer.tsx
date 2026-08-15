"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Hash,
  Leaf,
  Moon,
  Plus,
  Sparkles,
  ShoppingBasket,
  Sun,
  Users,
  X,
} from "lucide-react";

import { DialogDemo } from "./MealPlanDialog";
import { useRecipes } from "@/features/my-recipes/hooks/useRecipes";
import { useGetMealPlans } from "../hooks/useGetMealPlans";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type MealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";

export interface CreateMealPlan {
  meal_date: string;
  meal_type: MealType;
  recipe_id: number;
  notes?: string;
}

export interface MealPlan {
  id: number;
  user_id: number;
  recipe_id: number;
  meal_date: string;
  meal_type: MealType;
  servings: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateMealPlanResponse {
  success: boolean;
  message: string;
  data: MealPlan;
}

export interface GetMealPlansResponse {
  success: boolean;
  message: string;
  data: {
    start_date: string;
    end_date: string;
    meal_plans: MealPlan[];
  };
}

interface WeekDay {
  date: string;
  day: string;
  shortDate: string;
  isToday: boolean;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const parseApiDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
};

const formatDateToApi = (date: Date) => {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (value: string) => {
  if (!value) return "";

  const date = parseApiDate(value);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatShortDate = (value: string) => {
  if (!value) return "";

  const date = parseApiDate(value);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
  }).format(date);
};

const formatLongDate = (value: string) => {
  if (!value) return "";

  const date = parseApiDate(value);

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatDateTime = (value: string) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatMealType = (value: MealType) => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

/*
 Dialog currently receives dates in DD-MM-YYYY format
 from your existing implementation.
*/
const formatDialogDate = (value: string) => {
  if (!value) return "";

  const [year, month, day] = value.split("-");

  return `${day}-${month}-${year}`;
};

const generateWeekDays = (startDate: string, endDate: string): WeekDay[] => {
  if (!startDate || !endDate) {
    return [];
  }

  const start = parseApiDate(startDate);
  const end = parseApiDate(endDate);

  const today = formatDateToApi(new Date());

  const days: WeekDay[] = [];

  const current = new Date(start);

  while (current <= end) {
    const date = formatDateToApi(current);

    days.push({
      date,

      day: new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
      }).format(current),

      shortDate: new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
      }).format(current),

      isToday: date === today,
    });

    current.setDate(current.getDate() + 1);
  }

  return days;
};

/* -------------------------------------------------------------------------- */
/* Meal Rows                                                                  */
/* -------------------------------------------------------------------------- */

const mealRows: {
  type: MealType;
  label: string;
  addLabel: string;
  icon: typeof Sun;
}[] = [
  {
    type: "BREAKFAST",
    label: "Breakfast",
    addLabel: "Add Breakfast",
    icon: Sun,
  },
  {
    type: "LUNCH",
    label: "Lunch",
    addLabel: "Add Lunch",
    icon: Sun,
  },
  {
    type: "DINNER",
    label: "Dinner",
    addLabel: "Add Dinner",
    icon: Moon,
  },
  {
    type: "SNACK",
    label: "Snacks",
    addLabel: "Add Snack",
    icon: Coffee,
  },
];

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

const MealPlanContainer = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const [selectedMeal, setSelectedMeal] = useState<MealPlan | null>(null);

  const [openAddMealDialog, setAddMealOpenDialog] = useState(false);

  const [selectedMealDate, setSelectedMealDate] = useState("");

  const [selectedMealType, setSelectedMealType] = useState("");

  /* ------------------------------------------------------------------------ */
  /* Recipe API                                                               */
  /* ------------------------------------------------------------------------ */

  const { data: recipeResponse, isLoading: isRecipesLoading } = useRecipes();

  const recipes = recipeResponse?.data ?? [];

  /* ------------------------------------------------------------------------ */
  /* Meal Plan API                                                            */
  /* ------------------------------------------------------------------------ */

  const {
    data: mealPlanResponse,
    isLoading: isMealPlanLoading,
    isError: isMealPlanError,
    error: mealPlanError,
  } = useGetMealPlans();

  /* ------------------------------------------------------------------------ */
  /* API Data                                                                 */
  /* ------------------------------------------------------------------------ */

  const startDate = mealPlanResponse?.data?.start_date ?? "";

  const endDate = mealPlanResponse?.data?.end_date ?? "";

  const mealPlans: MealPlan[] = mealPlanResponse?.data?.meal_plans ?? [];

  /* ------------------------------------------------------------------------ */
  /* Generate Week From API                                                   */
  /* ------------------------------------------------------------------------ */

  const weekDays = useMemo(
    () => generateWeekDays(startDate, endDate),
    [startDate, endDate],
  );

  /* ------------------------------------------------------------------------ */
  /* Set Initial Selected Date                                                */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (weekDays.length === 0) {
      return;
    }

    const today = formatDateToApi(new Date());

    setSelectedDate((currentSelectedDate) => {
      /*
         Keep current selection if it
         still belongs to this API week.
        */
      const currentStillExists = weekDays.some(
        (day) => day.date === currentSelectedDate,
      );

      if (currentStillExists) {
        return currentSelectedDate;
      }

      /*
         If today belongs to this week,
         automatically select today.
        */
      const todayExists = weekDays.some((day) => day.date === today);

      if (todayExists) {
        return today;
      }

      /*
         Otherwise select the first
         API date.
        */
      return weekDays[0].date;
    });
  }, [weekDays]);

  /* ------------------------------------------------------------------------ */
  /* Keep Selected Meal Updated                                               */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!selectedMeal) {
      return;
    }

    const updatedMeal = mealPlans.find((meal) => meal.id === selectedMeal.id);

    if (!updatedMeal) {
      setSelectedMeal(null);
      return;
    }

    setSelectedMeal(updatedMeal);
  }, [mealPlans]);

  /* ------------------------------------------------------------------------ */
  /* Selected Day Meals                                                       */
  /* ------------------------------------------------------------------------ */

  const mealsForSelectedDay = useMemo(() => {
    return mealPlans.filter((meal) => meal.meal_date === selectedDate);
  }, [mealPlans, selectedDate]);

  /* ------------------------------------------------------------------------ */
  /* Meal Count                                                               */
  /* ------------------------------------------------------------------------ */

  const plannedMealCount = mealPlans.length;

  /* ------------------------------------------------------------------------ */
  /* Get Meal By Date + Meal Type                                             */
  /* ------------------------------------------------------------------------ */

  const getMeal = (type: MealType, date: string) => {
    return mealPlans.find(
      (meal) => meal.meal_date === date && meal.meal_type === type,
    );
  };

  /* ------------------------------------------------------------------------ */
  /* Get First Available Meal Type                                            */
  /* ------------------------------------------------------------------------ */

  const getFirstAvailableMealType = (date: string): MealType => {
    const existingTypes = mealPlans
      .filter((meal) => meal.meal_date === date)
      .map((meal) => meal.meal_type);

    const available = mealRows.find((row) => !existingTypes.includes(row.type));

    return available?.type ?? "BREAKFAST";
  };

  /* ------------------------------------------------------------------------ */
  /* Day Navigation                                                          */
  /* ------------------------------------------------------------------------ */

  const handlePreviousDay = () => {
    if (!selectedDate) {
      return;
    }

    const currentIndex = weekDays.findIndex((day) => day.date === selectedDate);

    if (currentIndex > 0) {
      const previousDate = weekDays[currentIndex - 1].date;

      setSelectedDate(previousDate);

      setSelectedMeal(null);
    }
  };

  const handleNextDay = () => {
    if (!selectedDate) {
      return;
    }

    const currentIndex = weekDays.findIndex((day) => day.date === selectedDate);

    if (currentIndex >= 0 && currentIndex < weekDays.length - 1) {
      const nextDate = weekDays[currentIndex + 1].date;

      setSelectedDate(nextDate);

      setSelectedMeal(null);
    }
  };

  /* ------------------------------------------------------------------------ */
  /* Today                                                                    */
  /* ------------------------------------------------------------------------ */

  const handleToday = () => {
    const today = formatDateToApi(new Date());

    const todayExists = weekDays.some((day) => day.date === today);

    if (todayExists) {
      setSelectedDate(today);
      setSelectedMeal(null);

      return;
    }

    if (weekDays.length > 0) {
      setSelectedDate(weekDays[0].date);

      setSelectedMeal(null);
    }
  };

  /* ------------------------------------------------------------------------ */
  /* Open Add Meal Dialog                                                     */
  /* ------------------------------------------------------------------------ */

  const toggleAddMeal = (date: string, type: MealType) => {
    setSelectedDate(date);

    setSelectedMealDate(formatDialogDate(date));

    setSelectedMealType(type);

    setAddMealOpenDialog(true);
  };

  /* ------------------------------------------------------------------------ */
  /* Main Add Meal Button                                                     */
  /* ------------------------------------------------------------------------ */

  const handleMainAddMeal = () => {
    if (!selectedDate) {
      return;
    }

    const mealType = getFirstAvailableMealType(selectedDate);

    toggleAddMeal(selectedDate, mealType);
  };

  /* ------------------------------------------------------------------------ */
  /* Loading                                                                  */
  /* ------------------------------------------------------------------------ */

  if (isMealPlanLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07110B] text-[#F3EEDF]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#344238] border-t-[#C86B38]" />

          <p className="mt-4 text-sm text-[#8D988E]">
            Loading your meal plan...
          </p>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Error                                                                    */
  /* ------------------------------------------------------------------------ */

  if (isMealPlanError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07110B] px-4 text-[#F3EEDF]">
        <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <CalendarDays className="mx-auto h-10 w-10 text-red-400" />

          <h2 className="mt-4 text-lg font-semibold">
            Unable to load meal plan
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#8D988E]">
            {mealPlanError instanceof Error
              ? mealPlanError.message
              : "Something went wrong while fetching your weekly meal plan."}
          </p>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="min-h-screen bg-[#07110B] text-[#F3EEDF]">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}

      <div className="border-b border-[#26382A] px-2.5 py-6 lg:px-4">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-[#769A57]" />

              <h1 className="text-3xl font-semibold tracking-tight">
                Meal Planner
              </h1>
            </div>

            <p className="mt-2 text-sm text-[#8D988E]">
              Plan your meals. Stay organized. Eat better.
            </p>
          </div>

          <button
            type="button"
            className="hidden rounded-xl border border-[#344238] bg-[#101D14] px-5 py-2.5 text-sm font-medium transition hover:border-[#C86B38] lg:block"
          >
            My Recipes
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Main Content                                                       */}
      {/* ------------------------------------------------------------------ */}

      <main className="px-2.5 py-6 lg:px-4">
        {/* ---------------------------------------------------------------- */}
        {/* Controls                                                         */}
        {/* ---------------------------------------------------------------- */}

        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {/* Week Range */}

            <div className="flex items-center overflow-hidden rounded-xl border border-[#344238] bg-[#101D14]">
              <div className="border-r border-[#344238] p-3 text-[#C86B38]">
                <CalendarDays className="h-4 w-4" />
              </div>

              <span className="px-4 text-sm text-[#DADDD4]">
                {startDate && endDate
                  ? `${formatDisplayDate(startDate)} - ${formatDisplayDate(
                      endDate,
                    )}`
                  : "No week available"}
              </span>

              <button
                type="button"
                onClick={handlePreviousDay}
                disabled={!selectedDate || weekDays[0]?.date === selectedDate}
                className="border-l border-[#344238] p-3 text-[#A8A99A] transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleNextDay}
                disabled={
                  !selectedDate ||
                  weekDays[weekDays.length - 1]?.date === selectedDate
                }
                className="border-l border-[#344238] p-3 text-[#A8A99A] transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Today */}

            <button
              type="button"
              onClick={handleToday}
              className="rounded-xl border border-[#344238] bg-[#101D14] px-5 py-3 text-sm transition hover:border-[#C86B38]"
            >
              Today
            </button>

            {/* Planned Count */}

            <div className="rounded-xl border border-[#344238] bg-[#101D14] px-4 py-3 text-sm text-[#8D988E]">
              <span className="font-semibold text-[#E8A06F]">
                {plannedMealCount}
              </span>{" "}
              {plannedMealCount === 1 ? "meal" : "meals"} planned
            </div>
          </div>

          {/* Add Meal */}

          <button
            type="button"
            onClick={handleMainAddMeal}
            disabled={!selectedDate || isRecipesLoading}
            className="flex items-center gap-2 rounded-xl bg-[#C86B38] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D9824A] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Add Meal
          </button>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Empty API State                                                   */}
        {/* ---------------------------------------------------------------- */}

        {mealPlans.length === 0 && (
          <div className="mb-5 flex items-center gap-4 rounded-2xl border border-[#344238] bg-[#101D14] px-5 py-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C86B38]/10">
              <CalendarDays className="h-5 w-5 text-[#C86B38]" />
            </div>

            <div>
              <p className="text-sm font-medium text-[#F3EEDF]">
                Your meal plan is empty
              </p>

              <p className="mt-1 text-xs leading-5 text-[#7E887F]">
                No meals have been planned from{" "}
                <span className="text-[#B7BCA8]">
                  {formatDisplayDate(startDate)}
                </span>{" "}
                to{" "}
                <span className="text-[#B7BCA8]">
                  {formatDisplayDate(endDate)}
                </span>
                . Select an empty slot below to add your first meal.
              </p>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Planner + Details                                                 */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
          {/* -------------------------------------------------------------- */}
          {/* Planner                                                        */}
          {/* -------------------------------------------------------------- */}

          <div className="overflow-x-auto rounded-2xl border border-[#26382A] bg-[#0E1B12]">
            <div className="min-w-[900px]">
              {/* ---------------------------------------------------------- */}
              {/* Week Header                                                */}
              {/* ---------------------------------------------------------- */}

              <div
                className="grid border-b border-[#26382A]"
                style={{
                  gridTemplateColumns: `95px repeat(${Math.max(
                    weekDays.length,
                    1,
                  )}, minmax(100px, 1fr))`,
                }}
              >
                <div className="flex items-center px-4 py-4 text-sm font-medium text-[#B7BCA8]">
                  Meal
                </div>

                {weekDays.map((day) => {
                  const active = day.date === selectedDate;

                  return (
                    <button
                      type="button"
                      key={day.date}
                      onClick={() => {
                        setSelectedDate(day.date);

                        setSelectedMeal(null);
                      }}
                      className={`relative border-l border-[#26382A] px-2 py-4 text-center transition ${
                        active ? "bg-[#18251A]" : "hover:bg-[#142117]"
                      }`}
                    >
                      {day.isToday && (
                        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#C86B38]" />
                      )}

                      <p
                        className={`text-sm font-semibold ${
                          active ? "text-[#E8A06F]" : "text-[#F3EEDF]"
                        }`}
                      >
                        {day.day}
                      </p>

                      <p className="mt-1 text-xs text-[#788278]">
                        {day.shortDate}
                      </p>

                      {active && (
                        <span className="absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-t-full bg-[#C86B38]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* ---------------------------------------------------------- */}
              {/* Meal Rows                                                  */}
              {/* ---------------------------------------------------------- */}

              {mealRows.map((row) => {
                const RowIcon = row.icon;

                return (
                  <div
                    key={row.type}
                    className="grid min-h-[145px] border-b border-[#26382A] last:border-b-0"
                    style={{
                      gridTemplateColumns: `95px repeat(${Math.max(
                        weekDays.length,
                        1,
                      )}, minmax(100px, 1fr))`,
                    }}
                  >
                    {/* Meal Label */}

                    <div className="flex flex-col items-center justify-center gap-3 border-r border-[#26382A] px-2">
                      <RowIcon
                        className={`h-6 w-6 ${
                          row.type === "DINNER"
                            ? "text-[#8F9B67]"
                            : "text-[#D78B3F]"
                        }`}
                      />

                      <span className="text-center text-xs font-medium">
                        {row.label}
                      </span>
                    </div>

                    {/* Days */}

                    {weekDays.map((day) => {
                      const meal = getMeal(row.type, day.date);

                      const active = day.date === selectedDate;

                      return (
                        <div
                          key={`${day.date}-${row.type}`}
                          className={`border-l border-[#26382A] p-2 ${
                            active ? "bg-[#101E14]" : ""
                          }`}
                        >
                          {meal ? (
                            /*
                                 API Meal
                                */
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedMeal(meal);

                                setSelectedDate(day.date);
                              }}
                              className={`group relative flex h-full min-h-[125px] w-full flex-col justify-between rounded-xl border p-3 text-left transition ${
                                selectedMeal?.id === meal.id
                                  ? "border-[#C86B38] bg-[#1B281C]"
                                  : "border-[#344238] bg-[#172319] hover:border-[#68774C]"
                              }`}
                            >
                              <div>
                                <div className="mb-2 flex items-center justify-between gap-2">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#253326] text-[#E8A06F]">
                                    <Hash className="h-4 w-4" />
                                  </div>

                                  <span className="text-[10px] text-[#667168]">
                                    #{meal.id}
                                  </span>
                                </div>

                                <p className="line-clamp-2 text-xs font-semibold leading-4 text-[#F3EEDF]">
                                  Recipe #{meal.recipe_id}
                                </p>

                                <p className="mt-1 text-[10px] text-[#7F8A80]">
                                  {formatMealType(meal.meal_type)}
                                </p>
                              </div>

                              <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#8D988E]">
                                <Users className="h-3 w-3" />

                                <span>
                                  {meal.servings}{" "}
                                  {meal.servings === 1 ? "serving" : "servings"}
                                </span>
                              </div>
                            </button>
                          ) : (
                            /*
                                 Empty Slot
                                */
                            <button
                              type="button"
                              onClick={() => toggleAddMeal(day.date, row.type)}
                              className="flex h-full min-h-[125px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#344238] text-[#69746C] transition hover:border-[#C86B38] hover:bg-[#C86B38]/5 hover:text-[#E8A06F]"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#172319]">
                                <Plus className="h-4 w-4" />
                              </div>

                              <span className="text-xs">{row.addLabel}</span>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {/* Footer */}

              <div className="flex items-center justify-center gap-2 border-t border-[#26382A] px-5 py-4 text-sm text-[#9DA695]">
                <span>🍃</span>A well planned meal is a step towards a healthier
                you.
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Details Panel                                                  */}
          {/* -------------------------------------------------------------- */}

          <aside className="rounded-2xl border border-[#26382A] bg-[#0E1B12] p-4">
            {selectedMeal ? (
              <>
                {/* Header */}

                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#758076]">
                      Meal Details
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#D88A3E]">
                      {formatLongDate(selectedMeal.meal_date)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedMeal(null)}
                    className="rounded-lg border border-[#344238] bg-[#111D14] p-2 text-[#929B92] transition hover:border-[#C86B38] hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Recipe */}

                <div className="rounded-xl border border-[#344238] bg-[#172319] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-[#7E887F]">Recipe</p>

                      <h2 className="mt-1 text-xl font-semibold text-[#F3EEDF]">
                        Recipe #{selectedMeal.recipe_id}
                      </h2>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C86B38]/10 text-[#E8A06F]">
                      <Hash className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm text-[#A8A99A]">
                    <span className="h-2 w-2 rounded-full bg-[#C86B38]" />

                    {formatMealType(selectedMeal.meal_type)}
                  </div>
                </div>

                {/* Basic Information */}

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <DetailCard
                    label="Meal Plan ID"
                    value={`#${selectedMeal.id}`}
                  />

                  <DetailCard
                    label="Recipe ID"
                    value={`#${selectedMeal.recipe_id}`}
                  />

                  <DetailCard
                    label="Servings"
                    value={String(selectedMeal.servings)}
                    icon={Users}
                  />

                  <DetailCard
                    label="User ID"
                    value={`#${selectedMeal.user_id}`}
                  />
                </div>

                {/* Meal Date */}

                <div className="mt-4 rounded-xl border border-[#344238] bg-[#111D14] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#253326]">
                      <CalendarDays className="h-4 w-4 text-[#E8A06F]" />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#758076]">
                        Meal Date
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#F3EEDF]">
                        {formatDisplayDate(selectedMeal.meal_date)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notes */}

                <div className="mt-5">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#D88A3E]">
                    Notes
                  </p>

                  <div className="min-h-[100px] rounded-xl border border-[#4A5238] bg-[#172319] p-4">
                    <p className="text-sm leading-6 text-[#AEB5A8]">
                      {selectedMeal.notes?.trim()
                        ? selectedMeal.notes
                        : "No notes have been added for this meal."}
                    </p>
                  </div>
                </div>

                {/* Record Information */}

                <div className="mt-5">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#758076]">
                    Record Information
                  </p>

                  <div className="space-y-3 rounded-xl border border-[#26382A] bg-[#101A12] p-4">
                    <RecordRow
                      label="Created"
                      value={formatDateTime(selectedMeal.created_at)}
                    />

                    <div className="border-t border-[#26382A]" />

                    <RecordRow
                      label="Last updated"
                      value={formatDateTime(selectedMeal.updated_at)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex min-h-[500px] flex-col items-center justify-center px-4 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#C86B38]/10">
                  <CalendarDays className="h-7 w-7 text-[#C86B38]" />
                </div>

                <h3 className="text-lg font-semibold">
                  {mealPlans.length === 0
                    ? "No meals planned yet"
                    : "Select a meal"}
                </h3>

                <p className="mt-2 max-w-[230px] text-sm leading-6 text-[#778279]">
                  {mealPlans.length === 0
                    ? "Choose an empty slot from the weekly planner to start adding meals."
                    : "Select a planned meal from the weekly planner to see its details."}
                </p>

                {selectedDate && (
                  <>
                    <div className="mt-4 rounded-lg bg-[#172319] px-3 py-2 text-xs text-[#899187]">
                      {formatLongDate(selectedDate)}
                    </div>

                    <button
                      type="button"
                      onClick={handleMainAddMeal}
                      disabled={isRecipesLoading}
                      className="mt-5 flex items-center gap-2 rounded-xl bg-[#C86B38] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#D9824A] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                      Add Meal
                    </button>
                  </>
                )}
              </div>
            )}
          </aside>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Selected Day Summary                                              */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-5 rounded-2xl border border-[#26382A] bg-[#101D14] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#758076]">
                Selected Day
              </p>

              <h3 className="mt-1 font-medium text-[#F3EEDF]">
                {selectedDate
                  ? formatLongDate(selectedDate)
                  : "No date selected"}
              </h3>
            </div>

            <div className="rounded-xl bg-[#172319] px-4 py-2 text-sm text-[#A8A99A]">
              <span className="font-semibold text-[#E8A06F]">
                {mealsForSelectedDay.length}
              </span>{" "}
              {mealsForSelectedDay.length === 1 ? "meal" : "meals"} planned
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Feature Cards                                                     */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={Sparkles}
            title="Auto Plan with AI"
            description="Let AI suggest meals for your week automatically."
            button="Generate Plan"
          />

          <FeatureCard
            icon={Leaf}
            title="Balance Your Nutrition"
            description="Review your weekly meal planning progress."
            button="View Insights"
          />

          <FeatureCard
            icon={ShoppingBasket}
            title="Shopping List"
            description="Prepare your shopping list from your planned meals."
            button="Go to List"
          />
        </div>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* Add Meal Dialog                                                    */}
      {/* ------------------------------------------------------------------ */}

      <DialogDemo
        open={openAddMealDialog}
        onOpenChange={setAddMealOpenDialog}
        selectedMealDate={selectedMealDate}
        selectedMealType={selectedMealType}
        recipes={recipes}
      />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Detail Card                                                                */
/* -------------------------------------------------------------------------- */

interface DetailCardProps {
  label: string;
  value: string;
  icon?: typeof Users;
}

const DetailCard = ({ label, value, icon: Icon }: DetailCardProps) => {
  return (
    <div className="rounded-xl bg-[#172319] p-3">
      <div className="flex items-center gap-2 text-[#A8A99A]">
        {Icon && <Icon className="h-4 w-4" />}

        <span className="text-xs">{label}</span>
      </div>

      <p className="mt-1 text-sm font-medium text-[#F3EEDF]">{value}</p>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Record Row                                                                 */
/* -------------------------------------------------------------------------- */

interface RecordRowProps {
  label: string;
  value: string;
}

const RecordRow = ({ label, value }: RecordRowProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-[#758076]">{label}</span>

      <span className="text-right text-xs text-[#B7BCA8]">{value}</span>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Feature Card                                                               */
/* -------------------------------------------------------------------------- */

interface FeatureCardProps {
  icon: typeof Leaf;
  title: string;
  description: string;
  button: string;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  button,
}: FeatureCardProps) => {
  return (
    <div className="rounded-2xl border border-[#26382A] bg-[#101D14] p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl bg-[#C86B38]/10 p-3">
          <Icon className="h-5 w-5 text-[#D88A3E]" />
        </div>

        <div>
          <h3 className="font-medium">{title}</h3>

          <p className="mt-1 text-xs leading-5 text-[#758076]">{description}</p>
        </div>
      </div>

      <button
        type="button"
        className="rounded-lg bg-[#293B20] px-5 py-2.5 text-sm text-[#D9DFC8] transition hover:bg-[#354B28]"
      >
        {button}
      </button>
    </div>
  );
};

export default MealPlanContainer;
