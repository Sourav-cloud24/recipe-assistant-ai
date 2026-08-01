"use client";

import { useState } from "react";
import PantryItemsContainer from "./PantryItemsContainer";
import { CreatePantryItemDialog } from "./CreatePantryItemDialog";

const PantryContainer = () => {
  const [activeCreateDialog, setActiveCreateDialog] = useState(false);

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
          onClick={() => setActiveCreateDialog(true)}
        >
          Add Items
        </button>
      </div>

      <hr />

      <div>
        <PantryItemsContainer />
      </div>

      <CreatePantryItemDialog
        open={activeCreateDialog}
        onOpenChange={setActiveCreateDialog}
      />
    </div>
  );
};

export default PantryContainer;