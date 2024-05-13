import mongoose from "mongoose";
import { getConnection } from "./db.js";
import { User } from "./user.js";
import { Class } from "./class.js";
import { Item } from "./item.js";

export const inventorySchema = new mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: User.modelName
    },
    classId: {
      type: mongoose.Types.ObjectId,
      ref: Class.modelName,
      required: true,
    },
    itemId: {
      type: mongoose.Types.ObjectId,
      ref: Item.modelName,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0
    }
})

export const Inventory = (await getConnection()).model(
  "Inventory",
  inventorySchema,
);

export async function addIventoryItem(
  userId: mongoose.Types.ObjectId,
  classId: mongoose.Types.ObjectId,
  itemId: mongoose.Types.ObjectId,
  quantity: number = 1
) {
  const newInventoryItem = new Inventory({
    userId,
    classId,
    itemId,
    quantity
  });

  await newInventoryItem.save();
  return newInventoryItem;
}

export async function getInventoryItems(userId: mongoose.Types.ObjectId, classId: mongoose.Types.ObjectId) {
  // Fetch inventory items for a specific user and class
  const inventoryItems = await Inventory.find({ userId, classId }).populate('itemId');
  return inventoryItems;
}

export async function removeInventoryItem(inventoryItemId: mongoose.Types.ObjectId) {
  // Remove a specific inventory item
  const result = await Inventory.findByIdAndDelete(inventoryItemId);
  return result;
}

