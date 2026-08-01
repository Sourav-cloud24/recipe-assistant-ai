"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CreatePantryItemDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
}: CreatePantryItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        {/* <DialogTrigger>
          <Button
            className="bg(--color-copper) text-(--color-parchment) hover:bg-(--color-accent)"
          >
            + Add item
          </Button>
        </DialogTrigger> */}

        <DialogContent className="sm:max-w-xl bg-(--color-parchment) text-(--color-ink) border-none rounded-sm p-0 overflow-hidden shadow-2xl">
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
                Add to the pantry
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
                  name="name"
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
                    name="quantity"
                    type="number"
                    placeholder="0"
                    className={fieldClass}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="unit" className={labelClass}>
                    Unit
                  </Label>
                  <Select name="unit" defaultValue="pieces">
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
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category" className={labelClass}>
                  Shelf
                </Label>
                <Select name="category" defaultValue="other">
                  <SelectTrigger id="category" className={fieldClass}>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-(--color-parchment) text-(--color-ink) border-(--color-line)">
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="grains">Grains</SelectItem>
                    <SelectItem value="canned">Canned goods</SelectItem>
                    <SelectItem value="condiments">Condiments</SelectItem>
                    <SelectItem value="spices">Spices</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="expiry" className={labelClass}>
                  Best before (optional)
                </Label>
                <Input
                  id="expiry"
                  name="expiry"
                  type="date"
                  className={fieldClass}
                />
              </div>

              <label
                htmlFor="running-low"
                className="flex items-center gap-2.5 text-sm text-(--color-ink)/70 cursor-pointer"
              >
                {/* <Checkbox
                  id="running-low"
                  checked={runningLow}
                  onCheckedChange={(v) => setRunningLow(v === true)}
                  className="border-[var(--color-line)] data-[state=checked]:bg-[var(--color-copper)] data-[state=checked]:border-[var(--color-copper)]"
                /> */}
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

              <Button
                type="submit"
                className="bg-(--color-accent) text-(--color-parchment) hover:bg-(--color-accent)"
              >
                Add to ledger
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
