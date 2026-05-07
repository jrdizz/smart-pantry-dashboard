package entity;

import com.pantrydashboard.smartpantrydashboard.entity.InventoryItem;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class InventoryTest {

    @Test
    void testIsLowStock_WhenQuantityIsLessThanThreshold_ShouldReturnTrue()
    {
        InventoryItem item = new InventoryItem(1, "Apples", 4, 5);

        assertTrue(item.isLowStock(), "Item should be low stock when quantity is (4) is less than threshold (5)");
    }

    @Test
    void testIsLowStock_WhenQuantityIsGreaterThanThreshold_ShouldReturnTrue() {
        InventoryItem item = new InventoryItem(1,"Apples", 5, 5 );

        assertFalse(item.isLowStock(), "Item should not be low stock when quantity (5) equals threshold (5)");
    }

    @Test
    void testIsLowStock_WhenQuantityIsGreaterThanThreshold_shouldReturnFalse() {
        InventoryItem item = new InventoryItem(1,"Apples", 10, 5 );

        assertFalse(item.isLowStock(), "Item should NOT be low stock when quantity (10) is greater than threshold (5)");
    }
}
