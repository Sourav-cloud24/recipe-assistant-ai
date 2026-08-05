export const pantryKeys = {
  all: ["pantry-items"] as const,
  list: (search: string) => [...pantryKeys.all, search] as const,
  detail: (id: number | null) => [...pantryKeys.all, "detail", id] as const,
};