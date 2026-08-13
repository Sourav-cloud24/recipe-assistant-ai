"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Plus,
  Users,
  X,
  Pencil,
  Eye,
  Sun,
  Moon,
  Coffee,
  Sparkles,
  ShoppingBasket,
  Leaf,
  Bell,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type MealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";

interface MealPlan {
  id: number;
  date: string;
  mealType: MealType;
  title: string;
  recipeId: number;
  cookingTime: number;
  servings: number;
  image: string;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  notes?: string;
}

/* -------------------------------------------------------------------------- */
/* Dummy Data                                                                 */
/* -------------------------------------------------------------------------- */

const dummyMealPlans: MealPlan[] = [
  {
    id: 1,
    date: "2025-08-12",
    mealType: "BREAKFAST",
    title: "Oats Berry Bowl",
    recipeId: 101,
    cookingTime: 10,
    servings: 1,
    image:
      "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=500",
    calories: 320,
    protein: "12g",
    carbs: "48g",
    fat: "8g",
    notes: "Add some fresh berries before serving.",
  },
  {
    id: 2,
    date: "2025-08-12",
    mealType: "LUNCH",
    title: "Quinoa Bowl",
    recipeId: 102,
    cookingTime: 25,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
    calories: 420,
    protein: "18g",
    carbs: "52g",
    fat: "12g",
  },
  {
    id: 3,
    date: "2025-08-12",
    mealType: "DINNER",
    title: "Lauki Curry",
    recipeId: 103,
    cookingTime: 30,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    calories: 380,
    protein: "14g",
    carbs: "42g",
    fat: "14g",
  },
  {
    id: 4,
    date: "2025-08-12",
    mealType: "SNACK",
    title: "Roasted Makhana",
    recipeId: 104,
    cookingTime: 15,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1599599810694-b5ac3f7b6b8c?w=500",
    calories: 220,
    protein: "8g",
    carbs: "26g",
    fat: "9g",
  },

  {
    id: 5,
    date: "2025-08-13",
    mealType: "BREAKFAST",
    title: "Veg Omelette",
    recipeId: 105,
    cookingTime: 15,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=500",
    calories: 280,
    protein: "20g",
    carbs: "8g",
    fat: "18g",
  },
  {
    id: 6,
    date: "2025-08-13",
    mealType: "LUNCH",
    title: "Paneer Bhurji",
    recipeId: 106,
    cookingTime: 20,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
    calories: 320,
    protein: "18g",
    carbs: "22g",
    fat: "14g",
    notes: "Light and high protein lunch. Perfect with roti or rice.",
  },
  {
    id: 7,
    date: "2025-08-13",
    mealType: "DINNER",
    title: "Jeera Rice & Dal",
    recipeId: 107,
    cookingTime: 35,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
    calories: 460,
    protein: "17g",
    carbs: "64g",
    fat: "13g",
  },
  {
    id: 8,
    date: "2025-08-13",
    mealType: "SNACK",
    title: "Greek Yogurt",
    recipeId: 108,
    cookingTime: 5,
    servings: 1,
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500",
    calories: 180,
    protein: "15g",
    carbs: "14g",
    fat: "6g",
  },

  {
    id: 9,
    date: "2025-08-14",
    mealType: "BREAKFAST",
    title: "Chia Pudding Mango",
    recipeId: 109,
    cookingTime: 10,
    servings: 1,
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=500",
    calories: 260,
    protein: "9g",
    carbs: "38g",
    fat: "9g",
  },
  {
    id: 10,
    date: "2025-08-14",
    mealType: "LUNCH",
    title: "Veg Pasta",
    recipeId: 110,
    cookingTime: 30,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500",
    calories: 480,
    protein: "17g",
    carbs: "62g",
    fat: "16g",
  },
  {
    id: 11,
    date: "2025-08-14",
    mealType: "DINNER",
    title: "Stuffed Capsicum",
    recipeId: 111,
    cookingTime: 40,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=500",
    calories: 340,
    protein: "16g",
    carbs: "30g",
    fat: "15g",
  },
  {
    id: 12,
    date: "2025-08-14",
    mealType: "SNACK",
    title: "Protein Smoothie",
    recipeId: 112,
    cookingTime: 8,
    servings: 1,
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500",
    calories: 290,
    protein: "24g",
    carbs: "28g",
    fat: "8g",
  },

  {
    id: 13,
    date: "2025-08-15",
    mealType: "BREAKFAST",
    title: "Poha",
    recipeId: 113,
    cookingTime: 20,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=500",
    calories: 310,
    protein: "9g",
    carbs: "46g",
    fat: "9g",
  },
  {
    id: 14,
    date: "2025-08-15",
    mealType: "LUNCH",
    title: "Chana Masala",
    recipeId: 114,
    cookingTime: 35,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    calories: 390,
    protein: "18g",
    carbs: "48g",
    fat: "12g",
  },
  {
    id: 15,
    date: "2025-08-15",
    mealType: "DINNER",
    title: "Palak Paneer",
    recipeId: 115,
    cookingTime: 35,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
    calories: 420,
    protein: "22g",
    carbs: "18g",
    fat: "22g",
  },
  {
    id: 16,
    date: "2025-08-15",
    mealType: "SNACK",
    title: "Nuts & Seeds",
    recipeId: 116,
    cookingTime: 5,
    servings: 1,
    image:
      "https://images.unsplash.com/photo-1599599810694-b5ac3f7b6b8c?w=500",
    calories: 240,
    protein: "8g",
    carbs: "12g",
    fat: "18g",
  },

  {
    id: 17,
    date: "2025-08-16",
    mealType: "BREAKFAST",
    title: "Smoothie Bowl",
    recipeId: 117,
    cookingTime: 10,
    servings: 1,
    image:
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=500",
    calories: 300,
    protein: "11g",
    carbs: "44g",
    fat: "9g",
  },
  {
    id: 18,
    date: "2025-08-16",
    mealType: "LUNCH",
    title: "Dal Tadka & Rice",
    recipeId: 118,
    cookingTime: 35,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
    calories: 470,
    protein: "19g",
    carbs: "68g",
    fat: "13g",
  },
  {
    id: 19,
    date: "2025-08-16",
    mealType: "DINNER",
    title: "Veg Khichdi",
    recipeId: 119,
    cookingTime: 30,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    calories: 360,
    protein: "15g",
    carbs: "54g",
    fat: "9g",
  },
  {
    id: 20,
    date: "2025-08-16",
    mealType: "SNACK",
    title: "Buttermilk",
    recipeId: 120,
    cookingTime: 5,
    servings: 1,
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500",
    calories: 120,
    protein: "7g",
    carbs: "10g",
    fat: "4g",
  },

  {
    id: 21,
    date: "2025-08-17",
    mealType: "BREAKFAST",
    title: "Masala Upma",
    recipeId: 121,
    cookingTime: 20,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=500",
    calories: 320,
    protein: "9g",
    carbs: "48g",
    fat: "10g",
  },
  {
    id: 22,
    date: "2025-08-17",
    mealType: "LUNCH",
    title: "Veg Biryani",
    recipeId: 122,
    cookingTime: 45,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500",
    calories: 520,
    protein: "16g",
    carbs: "72g",
    fat: "17g",
  },
  {
    id: 23,
    date: "2025-08-17",
    mealType: "DINNER",
    title: "Mix Veg Curry",
    recipeId: 123,
    cookingTime: 30,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    calories: 350,
    protein: "12g",
    carbs: "38g",
    fat: "14g",
  },
  {
    id: 24,
    date: "2025-08-17",
    mealType: "SNACK",
    title: "Fruit Chaat",
    recipeId: 124,
    cookingTime: 10,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=500",
    calories: 180,
    protein: "3g",
    carbs: "38g",
    fat: "2g",
  },

  {
    id: 25,
    date: "2025-08-18",
    mealType: "BREAKFAST",
    title: "Fruit Salad",
    recipeId: 125,
    cookingTime: 10,
    servings: 1,
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=500",
    calories: 210,
    protein: "4g",
    carbs: "42g",
    fat: "3g",
  },
];

/* -------------------------------------------------------------------------- */
/* Week Data                                                                  */
/* -------------------------------------------------------------------------- */

const weekDays = [
  {
    date: "2025-08-12",
    day: "Mon",
    shortDate: "12 Aug",
  },
  {
    date: "2025-08-13",
    day: "Tue",
    shortDate: "13 Aug",
  },
  {
    date: "2025-08-14",
    day: "Wed",
    shortDate: "14 Aug",
  },
  {
    date: "2025-08-15",
    day: "Thu",
    shortDate: "15 Aug",
  },
  {
    date: "2025-08-16",
    day: "Fri",
    shortDate: "16 Aug",
  },
  {
    date: "2025-08-17",
    day: "Sat",
    shortDate: "17 Aug",
  },
  {
    date: "2025-08-18",
    day: "Sun",
    shortDate: "18 Aug",
  },
];

const mealRows: {
  type: MealType;
  label: string;
  icon: typeof Sun;
}[] = [
  {
    type: "BREAKFAST",
    label: "Breakfast",
    icon: Sun,
  },
  {
    type: "LUNCH",
    label: "Lunch",
    icon: Sun,
  },
  {
    type: "DINNER",
    label: "Dinner",
    icon: Moon,
  },
  {
    type: "SNACK",
    label: "Snacks",
    icon: Coffee,
  },
];

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

const MealPlanContainer = () => {
  const [selectedDate, setSelectedDate] = useState("2025-08-13");
  const [selectedMeal, setSelectedMeal] = useState<MealPlan | null>(
    dummyMealPlans.find((meal) => meal.id === 6) ?? null,
  );

  const mealsForSelectedDay = useMemo(() => {
    return dummyMealPlans.filter((meal) => meal.date === selectedDate);
  }, [selectedDate]);

  const getMeal = (type: MealType, date: string) => {
    return dummyMealPlans.find(
      (meal) => meal.date === date && meal.mealType === type,
    );
  };

  const handlePreviousDay = () => {
    const currentIndex = weekDays.findIndex(
      (day) => day.date === selectedDate,
    );

    if (currentIndex > 0) {
      setSelectedDate(weekDays[currentIndex - 1].date);
    }
  };

  const handleNextDay = () => {
    const currentIndex = weekDays.findIndex(
      (day) => day.date === selectedDate,
    );

    if (currentIndex < weekDays.length - 1) {
      setSelectedDate(weekDays[currentIndex + 1].date);
    }
  };

  return (
    <div className="min-h-screen bg-[#07110B] text-[#F3EEDF]">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                            */}
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

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden rounded-xl border border-[#344238] bg-[#101D14] px-5 py-2.5 text-sm font-medium transition hover:border-[#C86B38] lg:block"
            >
              My Recipes
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Main Content                                                      */}
      {/* ------------------------------------------------------------------ */}

      <main className="px-2.5 py-6 lg:px-4">
        {/* Controls */}

        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center overflow-hidden rounded-xl border border-[#344238] bg-[#101D14]">
              <button
                type="button"
                className="border-r border-[#344238] p-3 text-[#C5C9BE] hover:text-[#C86B38]"
              >
                <CalendarDays className="h-4 w-4" />
              </button>

              <span className="px-4 text-sm">
                12 Aug – 18 Aug 2025
              </span>

              <button
                type="button"
                onClick={handlePreviousDay}
                className="border-l border-[#344238] p-3 text-[#A8A99A] hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleNextDay}
                className="border-l border-[#344238] p-3 text-[#A8A99A] hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSelectedDate("2025-08-13")}
              className="rounded-xl border border-[#344238] bg-[#101D14] px-5 py-3 text-sm hover:border-[#C86B38]"
            >
              Today
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex rounded-xl border border-[#344238] bg-[#101D14] p-1">
              <button
                type="button"
                className="rounded-lg bg-[#2B351D] px-5 py-2 text-sm text-[#E8A06F]"
              >
                Week
              </button>

              <button
                type="button"
                className="rounded-lg px-5 py-2 text-sm text-[#7E887F]"
              >
                Month
              </button>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-[#C86B38] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D9824A]"
            >
              <Plus className="h-4 w-4" />
              Add Meal
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Planner + Details                                                */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
          {/* Planner */}

          <div className="overflow-hidden rounded-2xl border border-[#26382A] bg-[#0E1B12]">
            {/* Days Header */}

            <div className="grid grid-cols-[95px_repeat(7,minmax(100px,1fr))] border-b border-[#26382A]">
              <div className="flex items-center px-4 py-4 text-sm font-medium text-[#B7BCA8]">
                Meal
              </div>

              {weekDays.map((day) => {
                const active = day.date === selectedDate;

                return (
                  <button
                    type="button"
                    key={day.date}
                    onClick={() => setSelectedDate(day.date)}
                    className={`relative border-l border-[#26382A] px-2 py-4 text-center transition ${
                      active
                        ? "bg-[#18251A]"
                        : "hover:bg-[#142117]"
                    }`}
                  >
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

            {/* Meal Rows */}

            {mealRows.map((row) => {
              const RowIcon = row.icon;

              return (
                <div
                  key={row.type}
                  className="grid min-h-[145px] grid-cols-[95px_repeat(7,minmax(100px,1fr))] border-b border-[#26382A] last:border-b-0"
                >
                  {/* Meal Type */}

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
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedMeal(meal);
                              setSelectedDate(day.date);
                            }}
                            className={`group relative h-full min-h-[125px] w-full overflow-hidden rounded-xl border text-left transition ${
                              selectedMeal?.id === meal.id
                                ? "border-[#C86B38] bg-[#1B281C]"
                                : "border-[#344238] bg-[#172319] hover:border-[#68774C]"
                            }`}
                          >
                            <img
                              src={meal.image}
                              alt={meal.title}
                              className="h-[68px] w-full object-cover opacity-90 transition group-hover:scale-105"
                            />

                            <div className="p-2.5">
                              <p className="line-clamp-2 text-xs font-medium leading-4 text-[#F3EEDF]">
                                {meal.title}
                              </p>

                              <div className="mt-2 flex items-center gap-1 text-[10px] text-[#7F8A80]">
                                <Clock3 className="h-3 w-3" />
                                {meal.cookingTime} min
                              </div>
                            </div>

                            <span className="absolute right-2 top-[72px] text-[#8A9289]">
                              •••
                            </span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="flex h-full min-h-[125px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#344238] text-[#69746C] transition hover:border-[#C86B38] hover:bg-[#C86B38]/5 hover:text-[#E8A06F]"
                          >
                            <Plus className="h-5 w-5" />

                            <span className="text-xs">
                              Add {row.label.slice(0, -1)}
                            </span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Bottom Message */}

            <div className="flex items-center justify-center gap-2 border-t border-[#26382A] px-5 py-4 text-sm text-[#9DA695]">
              <span>🍃</span>
              A well planned meal is a step towards a healthier you.
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Details Panel                                                    */}
          {/* ---------------------------------------------------------------- */}

          <aside className="rounded-2xl border border-[#26382A] bg-[#0E1B12] p-4">
            {selectedMeal ? (
              <>
                {/* Panel Header */}

                <div className="mb-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePreviousDay}
                    className="text-[#C86B38]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <p className="text-sm font-medium text-[#D88A3E]">
                    Tuesday, 13 Aug
                  </p>

                  <button
                    type="button"
                    onClick={handleNextDay}
                    className="text-[#C86B38]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Image */}

                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={selectedMeal.image}
                    alt={selectedMeal.title}
                    className="h-48 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => setSelectedMeal(null)}
                    className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white backdrop-blur"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Recipe Info */}

                <div className="mt-4">
                  <h2 className="text-2xl font-semibold">
                    {selectedMeal.title}
                  </h2>

                  <div className="mt-2 flex items-center gap-2 text-sm text-[#A8A99A]">
                    <span className="h-2 w-2 rounded-full bg-[#C86B38]" />

                    {selectedMeal.mealType.charAt(0) +
                      selectedMeal.mealType.slice(1).toLowerCase()}
                  </div>
                </div>

                {/* Metadata */}

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-[#172319] p-3">
                    <div className="flex items-center gap-2 text-[#A8A99A]">
                      <Clock3 className="h-4 w-4" />

                      <span className="text-xs">Cooking</span>
                    </div>

                    <p className="mt-1 text-sm font-medium">
                      {selectedMeal.cookingTime} min
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#172319] p-3">
                    <div className="flex items-center gap-2 text-[#A8A99A]">
                      <Users className="h-4 w-4" />

                      <span className="text-xs">Servings</span>
                    </div>

                    <p className="mt-1 text-sm font-medium">
                      {selectedMeal.servings} servings
                    </p>
                  </div>
                </div>

                {/* Actions */}

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#344238] bg-[#111D14] py-3 text-xs font-medium text-[#C5C9BE] transition hover:border-[#C86B38]"
                  >
                    <Eye className="h-4 w-4" />
                    View Recipe
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#C86B38] py-3 text-xs font-semibold text-white transition hover:bg-[#D9824A]"
                  >
                    <Pencil className="h-4 w-4" />
                    Change Meal
                  </button>
                </div>

                {/* Nutrition */}

                <div className="mt-6">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#D88A3E]">
                    Nutrition Snapshot
                  </p>

                  <div className="grid grid-cols-4 gap-2">
                    <NutritionItem
                      value={selectedMeal.protein}
                      label="Protein"
                    />

                    <NutritionItem
                      value={selectedMeal.carbs}
                      label="Carbs"
                    />

                    <NutritionItem
                      value={selectedMeal.fat}
                      label="Fats"
                    />

                    <NutritionItem
                      value={String(selectedMeal.calories)}
                      label="Kcal"
                    />
                  </div>
                </div>

                {/* Notes */}

                <div className="mt-6">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#D88A3E]">
                    Notes
                  </p>

                  <div className="rounded-xl border border-[#4A5238] bg-[#172319] p-4">
                    <div className="flex gap-3">
                      <p className="flex-1 text-sm leading-6 text-[#AEB5A8]">
                        {selectedMeal.notes ??
                          "No notes have been added for this meal."}
                      </p>

                      <button
                        type="button"
                        className="text-[#9A9D8A] hover:text-[#E8A06F]"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-[#C86B38]/10 p-5">
                  <CalendarDays className="h-8 w-8 text-[#C86B38]" />
                </div>

                <h3 className="text-lg font-semibold">
                  Select a meal
                </h3>

                <p className="mt-2 max-w-[220px] text-sm leading-6 text-[#778279]">
                  Select any meal from your weekly planner to see its details.
                </p>
              </div>
            )}
          </aside>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Bottom Feature Cards                                              */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {/* AI Planner */}

          <div className="rounded-2xl border border-[#26382A] bg-[#101D14] p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-[#C86B38]/10 p-3">
                <Sparkles className="h-5 w-5 text-[#D88A3E]" />
              </div>

              <div>
                <h3 className="font-medium">Auto Plan with AI</h3>

                <p className="mt-1 text-xs text-[#758076]">
                  Let AI suggest meals for your week automatically.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="rounded-lg bg-[#293B20] px-5 py-2.5 text-sm text-[#D9DFC8] transition hover:bg-[#354B28]"
            >
              Generate Plan
            </button>
          </div>

          {/* Nutrition */}

          <div className="rounded-2xl border border-[#26382A] bg-[#101D14] p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-[#769A57]/10 p-3">
                <Leaf className="h-5 w-5 text-[#769A57]" />
              </div>

              <div>
                <h3 className="font-medium">
                  Balance Your Nutrition
                </h3>

                <p className="mt-1 text-xs text-[#758076]">
                  Get a balanced intake of protein, carbs, and fats.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="rounded-lg bg-[#293B20] px-5 py-2.5 text-sm text-[#D9DFC8] transition hover:bg-[#354B28]"
            >
              View Insights
            </button>
          </div>

          {/* Shopping List */}

          <div className="rounded-2xl border border-[#26382A] bg-[#101D14] p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-[#C86B38]/10 p-3">
                <ShoppingBasket className="h-5 w-5 text-[#D88A3E]" />
              </div>

              <div>
                <h3 className="font-medium">
                  Shopping List
                </h3>

                <p className="mt-1 text-xs text-[#758076]">
                  Generate your weekly shopping list in one click.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="rounded-lg bg-[#293B20] px-5 py-2.5 text-sm text-[#D9DFC8] transition hover:bg-[#354B28]"
            >
              Go to List
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Nutrition Component                                                        */
/* -------------------------------------------------------------------------- */

interface NutritionItemProps {
  value: string;
  label: string;
}

const NutritionItem = ({
  value,
  label,
}: NutritionItemProps) => {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#65783D] bg-[#172319]">
        <span className="text-[10px] font-semibold">
          {value}
        </span>
      </div>

      <p className="mt-2 text-[10px] text-[#899187]">
        {label}
      </p>
    </div>
  );
};

export default MealPlanContainer;