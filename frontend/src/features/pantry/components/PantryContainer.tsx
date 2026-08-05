"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import PantryItemsContainer from "./PantryItemsContainer";
import { CreatePantryItemDialog } from "./CreatePantryItemDialog";
import { useCreatePantry } from "../hooks/useCreatePantry";
import { CreatePantryItemRequest } from "../types/pantry.types";
import { toast } from "sonner";
import { useUpdatePantryItem } from "../hooks/useUpdatePantryItem";

type Mode = "add" | "edit";

const PantryContainer = () => {
  const [activeCreateDialog, setActiveCreateDialog] = useState(false);
  const [mode, setMode] = useState<Mode>("add");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const form = useForm<CreatePantryItemRequest>({
    defaultValues: {
      ingredient_name: "",
      quantity: 0,
      unit: "kg",
      category: "Other",
      expiry_date: "",
      is_low_stock: false,
    },
  });

  const { mutate: createPantry, isPending } = useCreatePantry();
  const { mutate: updatePantry} = useUpdatePantryItem()

const onSubmit = (data: CreatePantryItemRequest) => {
  const payload = {
    ...data,
    expiry_date: data.expiry_date || null,
  };

  if (mode === "add") {
    createPantry(payload, {
      onSuccess: (response) => {
        toast.success(response.message);
        form.reset();
        setActiveCreateDialog(false);
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      },
    });

    return;
  }

  updatePantry(
    {
      id: Number(selectedItemId),
      data: payload,
    },
    {
      onSuccess: () => {
        toast.success("Pantry item updated successfully");
        form.reset();
        setActiveCreateDialog(false);
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      },
    }
  );
};

  const toggleAddItem = () => {
    setActiveCreateDialog(true);
    setMode("add");
  };

  const toggleEditMode = (id: string) => {
    setSelectedItemId(id);
    setMode("edit");
    setActiveCreateDialog(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pantry</h1>
          <p className="text-muted-foreground text-sm">
            Manage your Ingredients and track expiry dates
          </p>
        </div>

        <button
          className="rounded-lg bg-(--color-rust) px-4 py-2 font-semibold text-white transition hover:opacity-90"
          onClick={toggleAddItem}
        >
          Add Items
        </button>
      </div>

      <hr />

      <div>
        <PantryItemsContainer mode={mode} onEdit={toggleEditMode} />
      </div>
      <CreatePantryItemDialog
        open={activeCreateDialog}
        onOpenChange={setActiveCreateDialog}
        form={form}
        onSubmit={onSubmit}
        isPending={isPending}
        mode={mode}
        pantryItemId={Number(selectedItemId) || null}
      />
    </div>
  );
};

export default PantryContainer;
