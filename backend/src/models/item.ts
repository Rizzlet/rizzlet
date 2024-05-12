import mongoose from 'mongoose';
import { getConnection } from "./db.js";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
});

type ItemUpdate = {
  name?: string;
  description?: string;
  cost?: number;
};


export const Item = (await getConnection()).model(
  "Item",
  itemSchema,
);

export async function addItem(name: string, description: string, cost: number, icon: string) {
  const newItem = new Item({
    name,
    description,
    cost, 
    icon
  });
  await newItem.save();
  return newItem;
}

export const getAllItems = async () => {
  return await Item.find({});  
}

// Function to update an existing item
export async function updateItem(itemId: mongoose.Types.ObjectId, updates: ItemUpdate) {
  const item = await Item.findByIdAndUpdate(itemId, updates, { new: true });
  return item;
}

// Function to delete an item
export async function deleteItem(itemId: mongoose.Types.ObjectId) {
  await Item.findByIdAndDelete(itemId);
}
