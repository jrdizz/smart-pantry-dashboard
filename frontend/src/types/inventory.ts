export interface InventoryItem {
    id: number;
    name: string;
    quantity: number;
    minThreshold: number;
    isLowStock?: boolean;
}