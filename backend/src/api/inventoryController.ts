import { Request, Response } from "express";
import { Inventory } from "../models/inventory.js";
import { Item } from "../models/item.js";
import { addItem as addItemToDB } from "../models/item.js";
import { getAllItems } from "../models/item.js";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";

export async function addItem(req: Request, res: Response) {
  try {
    const { name, description, cost, icon } = req.body;
    const newItem = await addItemToDB(name, description, cost, icon);
    res.status(201).json(newItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add item", error: error.message });
  }
}

export async function fetchItems(req: Request, res: Response) {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch items", error: error.message });
  }
}

// Add an item to a user's inventory for a specific class
export async function addToInventory(req: Request, res: Response) {
  const token = req.get("X-token")!;
  const userData = verifyAndDecodeToken(token);
  if (!userData) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { classId, itemId, quantity } = req.body as {
    classId: string;
    itemId: string;
    quantity: number;
  };
  const userId = userData.id;

  try {
    const existingItem = await Inventory.findOne({ userId, classId, itemId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json(existingItem);
    } else {
      const newItem = new Inventory({ userId, classId, itemId, quantity });
      await newItem.save();
      return res.status(201).json(newItem);
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Failed to add item to inventory",
        error: error.message,
      });
  }
}

export async function updateItem(req: Request, res: Response): Promise<void> {
  const { itemId } = req.params;
  const { name, description, cost, icon } = req.body;

  try {
    const updates = { name, description, cost, icon };
    const updatedItem = await Item.findByIdAndUpdate(itemId, updates, {
      new: true,
    });

    if (!updatedItem) {
      res.status(404).send("Item not found");
    } else {
      res.status(200).json(updatedItem);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update item", error: error.message });
  }
}

// Get the inventory of a user for a specific class
export async function getInventory(req: Request, res: Response) {
  const { userId, classId } = req.params;

  try {
    const inventoryItems = await Inventory.find({ userId, classId }).populate(
      "itemId",
    );
    if (inventoryItems.length > 0) {
      return res.status(200).json(inventoryItems);
    } else {
      return res.status(404).json({ message: "No inventory items found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve inventory", error: error.message });
  }
}

// Remove an item from inventory
export async function removeFromInventory(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedItem = await Inventory.findByIdAndDelete(id);
    if (deletedItem) {
      return res
        .status(200)
        .json({ message: "Item successfully removed from inventory" });
    } else {
      return res.status(404).json({ message: "Item not found in inventory" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error removing item from inventory",
        error: error.message,
      });
  }
}
