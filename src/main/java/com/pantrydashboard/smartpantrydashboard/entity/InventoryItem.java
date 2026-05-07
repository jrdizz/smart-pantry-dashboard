package com.pantrydashboard.smartpantrydashboard.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;

@Entity
@Table(name = "inventory_items")
public class InventoryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @PositiveOrZero(message = "Item quantity cannot be negative")
    private Integer quantity;

    private Integer minThreshold;

    public InventoryItem(Integer id, String name, Integer quantity, Integer minThreshold) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.minThreshold = minThreshold;
    }

    public InventoryItem() {

    }

    @JsonProperty("isLowStock")
    public boolean isLowStock() {
        return quantity < minThreshold;
    }

    public Integer getId(){
        return this.id;
    }

    public String getName(){
        return this.name;
    }

    public Integer getQuantity(){
        return this.quantity;
    }

    public Integer getMinThreshold(){
        return this.minThreshold;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setMinThreshold(Integer minThreshold) {
        this.minThreshold = minThreshold;
    }
}
