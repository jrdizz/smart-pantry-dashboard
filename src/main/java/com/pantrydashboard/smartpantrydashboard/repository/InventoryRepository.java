package com.pantrydashboard.smartpantrydashboard.repository;

import com.pantrydashboard.smartpantrydashboard.entity.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<InventoryItem, Integer> {
}
