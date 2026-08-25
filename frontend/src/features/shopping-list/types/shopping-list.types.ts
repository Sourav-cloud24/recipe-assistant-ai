export interface Items {
    ingredient_name: string;
    required_quantity: number;
    pantry_quantity: number;
    quantity_to_buy: number;
    unit: string;
}

export interface GetShoppingListResponse {
  success: boolean;
  message: string;
  data: {
    start_date: string;
    end_date: string;
    items: Items[];
  };
}