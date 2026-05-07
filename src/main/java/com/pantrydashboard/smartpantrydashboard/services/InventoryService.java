package com.pantrydashboard.smartpantrydashboard.services;

import com.pantrydashboard.smartpantrydashboard.entity.InventoryItem;
import com.pantrydashboard.smartpantrydashboard.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository repository;

    public List<InventoryItem> getAllInventoryItems() {
        return repository.findAll();
    }

    public InventoryItem saveInventoryItem(InventoryItem inventoryItem) {
        return repository.save(inventoryItem);
    }

    public InventoryItem restockItem(int id, int quantityToAdd) {
        InventoryItem item = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item with id " + id + " not found"));

        item.setQuantity(item.getQuantity() + quantityToAdd);
        return repository.save(item);
    }

    public void deleteInventoryItem(int id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
        }
        repository.deleteById(id);
    }
}

