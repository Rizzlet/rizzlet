import React, { useEffect, useState } from "react";
import axios from "axios";

interface Item {
  _id: string
  name: string;
  description: string;
  icon: string;
  cost: number;
}

interface ItemShopProps {
  onBuyItem: (item: Item) => void;
}

const ItemShop: React.FC<ItemShopProps> = ({ onBuyItem }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get<Item[]>(`${process.env.REACT_APP_BACKEND_URL}/api/items`);
        console.log("Fetched items:", response.data); // Log to check data structure
        setItems(response.data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleItemClick = (itemId: string) => {
    console.log("Item clicked:", itemId); // Log the clicked item ID
    setSelectedItemId(selectedItemId === itemId ? null : itemId);
  };
  
  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col">
        {items.map((item) => (
          <div key={item._id} className={`flex justify-between border-b py-2 items-center ${selectedItemId === item._id ? 'bg-gray-200' : ''}`}
            onClick={() => handleItemClick(item._id)}>
            <div className="flex-1 flex items-center">
              <i className={`ml-2 fas ${item.icon} fa-2x mr-5`}></i>
              <div>
                <div className="font-bold">{item.name}</div>
                <div>{item.description}</div>
              </div>
            </div>
            <div className="w-32 text-right font-bold flex items-center">
              <i className="fas fa-coins text-yellow-500 mr-1"></i>
              {item.cost} Gold
            </div>
          </div>
        ))}
        {selectedItemId && (
          <div className="flex justify-center mt-4">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                const item = items.find(item => item._id === selectedItemId);
                if (item) onBuyItem(item);
              }}>
              Buy Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemShop;
