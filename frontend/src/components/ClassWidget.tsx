import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { SwatchIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

interface ClassWidgetProps {
  name: string;
  id: string;
  onDelete: () => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

export default function ClassWidget(props: ClassWidgetProps) {
  const [backgroundColor, setBackgroundColor] = useState(props.selectedColor);

  useEffect(() => {
    // Update background color when selectedColor prop changes
    setBackgroundColor(props.selectedColor);
  }, [props.selectedColor]);

  const changeColor = (color: string) => {
    setBackgroundColor(color);
    props.setSelectedColor(color);
  };

  return (
    <div
      className={`${backgroundColor} flex min-h-44 max-w-screen-md 
      justify-between rounded-xl
      border-2 border-gray-400`}
    >
      <div className="m-5">
        <Link
          to={`/classDashboard/${props.id}`}
          className="text-2xl hover:underline"
        >
          {props.name}
        </Link>
      </div>

      <div className="mr-4 ">
        <DotDotDotMenu onDelete={props.onDelete} changeColor={changeColor} />
      </div>
    </div>
  );
}

function DotDotDotMenu(props: {
  onDelete: () => void;
  changeColor: (color: string) => void;
}) {
  const [showColorModal, setShowColorModal] = useState(false);

  const toggleColorModal = () => {
    setShowColorModal(!showColorModal);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md text-black hover:text-gray-800">
          <p className="text-3xl">...</p>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              <button
                className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-gray-200"
                onClick={toggleColorModal}
              >
                <SwatchIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                Change Color
              </button>
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-red-400 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={props.onDelete}
                >
                  <ArrowLeftStartOnRectangleIcon
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Leave Class
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
      {showColorModal && (
        <ColorModal
          onClose={toggleColorModal}
          changeColor={props.changeColor}
        />
      )}
    </Menu>
  );
}

function ColorModal(props: {
  onClose: () => void;
  changeColor: (color: string) => void;
}) {
  const colors = [
    { name: "Blue", value: "bg-blue-200" },
    { name: "Green", value: "bg-green-200" },
    { name: "Yellow", value: "bg-yellow-100" },
    { name: "Pink", value: "bg-rose-200" },
    { name: "Purple", value: "bg-purple-200" },
    { name: "Orange", value: "bg-orange-200" },
    { name: "Gray", value: "bg-gray-200" },
  ];

  const [selectedColor, setSelectedColor] = useState("");

  const selectColor = (color: string) => {
    setSelectedColor(color);
    props.changeColor(color);
    props.onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="w-64 rounded-lg bg-white p-4">
        <div className="mb-4 text-lg font-semibold">Choose Color</div>
        <div className="space-y-2">
          {colors.map((color, index) => (
            <button
              key={index}
              className="group flex w-full items-center space-x-2 rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-gray-100"
              onClick={() => selectColor(color.value)}
            >
              <div
                className={`h-6 w-6 rounded-full ${color.value}`}
                style={{
                  border:
                    selectedColor === color.value ? "2px solid black" : "none",
                }}
              ></div>
              <span>{color.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
