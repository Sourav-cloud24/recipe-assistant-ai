"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, SubmitHandler, UseFormReturn } from "react-hook-form";
import { CreatePantryItemRequest } from "../types/pantry.types";
import { useGetPantryById } from "../hooks/useGetPantryById";
import { useEffect } from "react";

type CreatePantryItemDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<CreatePantryItemRequest>;
  onSubmit: SubmitHandler<CreatePantryItemRequest>;
  isPending: boolean;
  mode: "add" | "edit";
  pantryItemId: number | null;
};
// Reusable ledger-style underline classes for inputs/triggers
const fieldClass =
  "border-0 border-b-[1.5px] border-[var(--color-line)] rounded-none bg-transparent px-1 text-[var(--color-ink)] " +
  "placeholder:text-[var(--color-ink)]/40 shadow-none focus-visible:ring-0 focus-visible:border-[var(--color-copper)] " +
  "transition-colors";

const labelClass =
  "font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--color-sage)]";

export function CreatePantryItemDialog({
  open,
  onOpenChange,
  form,
  onSubmit,
  isPending,
  mode,
  pantryItemId,
}: CreatePantryItemDialogProps) {
  const { register, handleSubmit, control } = form;
  const { data: pantryItem, isLoading } = useGetPantryById(
    pantryItemId,
    mode === "edit",
  );

  useEffect(() => {
    if (mode === "add") {
      form.reset({
        ingredient_name: "",
        quantity: 0,
        unit: "",
        category: "",
        expiry_date: "",
        is_low_stock: false,
      });
    }
  }, [mode, form]);
  
  useEffect(() => {
    if (mode !== "edit" || !pantryItem) return;

    form.reset({
      ingredient_name: pantryItem.data.ingredient_name,
      quantity: pantryItem.data.quantity,
      unit: pantryItem.data.unit,
      category: pantryItem.data.category,
      expiry_date: pantryItem.data.expiry_date
        ? pantryItem.data.expiry_date.slice(0, 10)
        : "",
      is_low_stock: pantryItem.data.is_low_stock,
    });
  }, [mode, pantryItem, form]);

  console.log(form.watch());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-(--color-parchment) text-(--color-ink) border-none rounded-sm p-0 overflow-hidden shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Left ledger-stitch edge */}
          <div
            className="absolute inset-y-0 left-0 w-1.5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(var(--color-parchment) 0 8px, var(--color-line) 8px 9px)",
            }}
          />

          <div className="px-9 pt-8 pb-7">
            <DialogHeader className="space-y-1">
              <p className={labelClass}>New ledger entry</p>
              <DialogTitle className="font-serif font-medium text-2xl text-(--color-ink)">
                {`${mode === "add" ? "Add" : "Update"} to the pantry`}
              </DialogTitle>
              <DialogDescription className="text-(--color-ink)/60 text-sm">
                Log a new item and we&apos;ll track its freshness for you.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-6">
              <div className="grid gap-2">
                <Label htmlFor="item-name" className={labelClass}>
                  Item name
                </Label>
                <Input
                  id="item-name"
                  {...register("ingredient_name")}
                  placeholder="Rosemary, dried"
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="quantity" className={labelClass}>
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="0"
                    {...register("quantity", { valueAsNumber: true })}
                    className={fieldClass}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="unit" className={labelClass}>
                    Unit
                  </Label>
                  <Controller
                    name="unit"
                    control={control}
                    // defaultValue="kg"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="unit" className={fieldClass}>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent className="bg-(--color-parchment) text-(--color-ink) border-(--color-line)">
                          <SelectItem value="pieces">Pieces</SelectItem>
                          <SelectItem value="g">Grams</SelectItem>
                          <SelectItem value="kg">Kilograms</SelectItem>
                          <SelectItem value="ml">Millilitres</SelectItem>
                          <SelectItem value="l">Litres</SelectItem>
                          <SelectItem value="can">Can</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category" className={labelClass}>
                  Shelf
                </Label>
                <Controller
                  name="category"
                  control={control}
                  // defaultValue="Other"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="category" className={fieldClass}>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-(--color-parchment) text-(--color-ink) border-(--color-line)">
                        <SelectItem value="Fruits">Fruits</SelectItem>
                        <SelectItem value="Dairy">Dairy</SelectItem>
                        <SelectItem value="Meat">Meat</SelectItem>
                        <SelectItem value="Grains">Grains</SelectItem>
                        <SelectItem value="Canned goods">
                          Canned goods
                        </SelectItem>
                        <SelectItem value="Condiments">Condiments</SelectItem>
                        <SelectItem value="Spices">Spices</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="expiry" className={labelClass}>
                  Best before (optional)
                </Label>
                <Input
                  id="expiry"
                  type="date"
                  {...register("expiry_date")}
                  className={fieldClass}
                />
              </div>

              <label
                htmlFor="running-low"
                className="flex items-center gap-2.5 text-sm text-(--color-ink)/70 cursor-pointer"
              >
                <input
                  id="running-low"
                  type="checkbox"
                  {...register("is_low_stock")}
                  className="h-4 w-4 rounded border border-(--color-line) text-(--color-copper) focus:ring-(--color-copper)"
                />
                Mark as running low
              </label>
            </div>

            <DialogFooter className="gap-3 sm:gap-3">
              <DialogClose>
                <Button
                  type="button"
                  variant="outline"
                  className="border-(--color-ink)/40 text-(--color-ink) bg-transparent hover:bg-(--color-ink)/5"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isPending}>
                {isPending
                  ? mode === "add"
                    ? "Adding..."
                    : "Updating..."
                  : mode === "add"
                    ? "Add to ledger"
                    : "Update item"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
