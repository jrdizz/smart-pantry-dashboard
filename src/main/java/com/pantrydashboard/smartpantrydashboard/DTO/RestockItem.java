package com.pantrydashboard.smartpantrydashboard.DTO;

import jakarta.validation.constraints.Positive;

public class RestockItem {

    @Positive(message = "Restock quantity must be a positive number")
    private int quantity;

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}
