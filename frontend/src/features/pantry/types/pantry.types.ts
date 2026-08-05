export interface CreatePantryItemRequest {
  ingredient_name: string;
  quantity: number;
  unit: string;
  category: string;
  expiry_date?: string | null;
  is_low_stock?: boolean;
}

export interface PantryItem {
  id: number;
  user_id: number;
  ingredient_name: string;
  quantity: number;
  unit: string;
  category: string;
  expiry_date: string | null;
  is_low_stock: boolean;
  created_at: string;
  updated_at: string;
}

export interface PantryResponse {
  success: boolean;
  message: string;
  data: PantryItem[];
}

export interface UpdatePantryItemRequest {
  ingredient_name: string;
  quantity: number;
  unit: string;
  category: string;
  expiry_date?: string | null;
  is_low_stock?: boolean;
}

export interface UpdatePantryItemResponse {
  success: boolean;
  message: string;
  data: PantryItem;
}

export interface DeletePantryResponse {
  success: boolean;
  message: string;
}