import React, { useState } from "react";

interface Item {
  name: string;
  description: string;
  icon: string;
  cost: string;
}

interface ItemShopProps {
  onBuyItem: (item: Item) => void;  // Define a prop type for onBuyItem
}

const items = [
  { name: "Magic Wand", description: "Deal +5 damage", icon: "fa-magic", cost: "10 Gold" },
  { name: "Flaming Sword", description: "Deal +8 damage", icon: "fa-fire", cost: "15 Gold" },
  { name: "Health Potion", description: "Heal 10 health", icon: "fa-heart", cost: "15 Gold" },
  { name: "Damage Potion", description: "Deal +5 damage, and take +5 incoming damage", icon: "fa-skull-crossbones", cost: "10 Gold" },
  { name: "Defense Potion", description: "-5 incoming damage, but deal -5 damage", icon: "fa-shield-alt", cost: "10 Gold" }
];

const ItemShop: React.FC<ItemShopProps> = ({ onBuyItem }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

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
        {items.map((item, index) => (
          <div key={index} className={`flex justify-between border-b py-2 items-center ${selectedItem === item.name ? 'bg-gray-200' : ''}`}
            onClick={() => handleItemClick(item.name)}>
            <div className="flex-1 flex items-center pr-4">
              <i className={`fas ${item.icon} fa-lg mr-2 rounded-full bg-gray-200 p-2 ${selectedItem === item.name ? 'animate-slow-ping' : ''}`}></i>
              <div>
                <div className="font-bold">{item.name}</div>
                <div>{item.description}</div>
              </div>
            </div>
            <div className="w-32 text-right font-bold flex items-center">
              <i className="fas fa-coins text-yellow-400 mr-1"></i>
              {item.cost}
            </div>
          </div>
        ))}
    {selectedItem && (
    <div className="flex justify-center mt-4">
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
      const item = items.find(item => item.name === selectedItem);
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
