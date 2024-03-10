import { Combobox, Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface ClassItem {
  id: string;
  name: string;
}
export default function AddClassModal(props: {
  open: boolean;
  onClose: () => void;
  newClasses: { name: string; id: string }[];
  onSubmit: (c: ClassItem) => void;
}) {
  const [selected, setSelected] = useState<ClassItem | null>(null);

  useEffect(() => {
    if (props.open) {
      setSelected(null);
    }
  }, [props.open]);

  return (
    <>
      <Transition appear show={props.open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-visible">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-md transform overflow-visible rounded-2xl 
                  bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add a Class
                  </Dialog.Title>
                  <div className="mt-2">
                    {/* Cetner checkbox */}
                    <div className="flex justify-center">
                      <ClassComboBox
                        setSelected={setSelected}
                        selected={selected}
                        classes={props.newClasses}
                      />
                    </div>
                  </div>

                  <div className="mt-4 right flex gap-3">
                    <button
                      onClick={props.onClose}
                      className="inline-flex justify-center rounded-md border border-transparent 
                        bg-blue-100 px-4 py-2 text-sm font-medium 
                        text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 
                        focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Close
                    </button>
                    <button
                      disabled={!selected}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent 
                        bg-green-100 px-4 py-2 text-sm font-medium 
                        text-black-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 
                        focus-visible:ring-green-500 focus-visible:ring-offset-2
                          disabled:hover:bg-gray-200
                          disabled:bg-gray-200
                          disabled:text-gray-500"
                      onClick={() => {
                        props.onSubmit(selected!);
                        props.onClose();
                      }}
                    >
                      Add Class!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function ClassComboBox(props: {
  classes: ClassItem[];
  setSelected: (selected: ClassItem | null) => void;
  selected: ClassItem | null;
}) {
  const [query, setQuery] = useState("");

  const filteredClasses =
    query === ""
      ? props.classes
      : props.classes
          .filter((classObj) =>
            classObj.name
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          )
          .slice(0, 5);

  return (
    <div className="top-16 w-72 self-center">
      <Combobox value={props.selected} onChange={props.setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-scroll rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(c: ClassItem | null) => (c ? c.name : "")}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for a class"
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-scroll rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredClasses.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredClasses.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
