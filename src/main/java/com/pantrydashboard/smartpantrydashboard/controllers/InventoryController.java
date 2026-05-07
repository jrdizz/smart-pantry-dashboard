package com.pantrydashboard.smartpantrydashboard.controllers;

import com.pantrydashboard.smartpantrydashboard.DTO.RestockItem;
import com.pantrydashboard.smartpantrydashboard.entity.InventoryItem;
import com.pantrydashboard.smartpantrydashboard.services.InventoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping("/api/items")
    public List<InventoryItem> getInventoryItems() {
        return inventoryService.getAllInventoryItems();
    }

    @PostMapping("/api/items")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public InventoryItem createInventoryItem(@RequestBody InventoryItem inventoryItem) {
        return inventoryService.saveInventoryItem(inventoryItem);
    }


    @PatchMapping("/api/items/{id}/restock")
    @PreAuthorize("hasRole('ADMIN')")
    public InventoryItem restockInventoryItem(@Valid @RequestBody RestockItem restockItem, @PathVariable int id) {
        return inventoryService.restockItem(id, restockItem.getQuantity());
    }

    @DeleteMapping("/api/items/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteInventoryItem(@PathVariable int id) {
        inventoryService.deleteInventoryItem(id);
    }


}
