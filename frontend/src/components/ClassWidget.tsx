import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

interface ClassWidgetProps {
  name: string;
  id: string;
  onDelete: () => void;
}

export default function ClassWidget(props: ClassWidgetProps) {
  return (
    <div
      className="bg-gray-300 border-gray-500 border-2 rounded-xl 
      min-h-36 flex
      justify-between"
    >
      <div className="m-4">
        <Link
          to={`/classDashboard/${props.id}`}
          className="text-2xl underline"
        >
          {props.name}
        </Link>
      </div>

      <div className="mr-4 ">
        <DotDotDotMenu onDelete={props.onDelete} />
      </div> 
    </div>
  );
}

function DotDotDotMenu(props: { onDelete: () => void }) {
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
    </Menu>
  );
}
