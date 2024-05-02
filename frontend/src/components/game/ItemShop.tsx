import React from "react";

const ItemShop = () => {
  const items = [
    { name: "Magic Wand", description: "Deal +5 damage", icon: "fa-magic", cost: "10 Gold" },
    { name: "Flaming Sword", description: "Deal 8 damage over time", icon: "fa-fire", cost: "12 Gold" },
    { name: "Health Potion", description: "Heal 10 health", icon: "fa-heart", cost: "15 Gold" },
    { name: "Damage Potion", description: "Deal +5 damage, and take +5 incoming damage", icon: "fa-skull-crossbones", cost: "10 Gold" },
    { name: "Defense Potion", description: "-5 incoming damage, but deal -5 damage", icon: "fa-shield-alt", cost: "10 Gold" }
];

return (
  <div className="container mx-auto mt-10">
      <div className="flex flex-col">
          <div className="flex justify-between mb-4">
              <div className="font-bold text-lg">Items</div>
              <div className="font-bold text-lg">Cost</div>
          </div>
          {items.map((item, index) => (
              <div key={index} className="flex justify-between border-b py-2 items-center">
                  <div className="flex-1 flex items-center pr-4">
                      <i className={`fas ${item.icon} fa-lg mr-2 rounded-full bg-gray-200 p-2`}></i>
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
      </div>
  </div>
);
};

export default ItemShop;
