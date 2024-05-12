import React, { useEffect, useState } from "react";
import axios from "axios";

interface Item {
  id: string
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
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get<Item[]>(`${process.env.REACT_APP_BACKEND_URL}/api/items`);
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleItemClick = (itemName: string) => {
    setSelectedItem(selectedItem === itemName ? null : itemName);
  };
  
  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <div className="font-bold text-lg">Items</div>
          <div className="font-bold text-lg">Cost</div>
        </div>
        {items.map((item) => (
          <div key={item.id} className={`flex justify-between border-b py-2 items-center ${selectedItem === item.id ? 'bg-gray-200' : ''}`}
          onClick={() => handleItemClick(item.name)}>
            <div className="flex-1 flex items-center pr-4">
              <i className={`fas ${item.icon} fa-lg mr-2 rounded-full bg-gray-200 p-2 ${selectedItem === item.id ? 'animate-slow-ping' : ''}`}></i>
              <div>
                <div className="font-bold">{item.name}</div>
                <div>{item.description}</div>
              </div>
            </div>
            <div className="w-32 text-right font-bold flex items-center">
              <i className="fas fa-coins text-yellow-400 mr-1"></i>
              {item.cost} Gold
            </div>
          </div>
        ))}
        {selectedItem && (
          <div className="flex justify-center mt-4">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                const item = items.find(item => item.id === selectedItem);
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
