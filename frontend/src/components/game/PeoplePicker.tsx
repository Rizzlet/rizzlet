import React, { useState, useEffect } from "react";

interface PeoplePickerProps {
  selectedPerson: string | null; // Person's ID
  onSelectPerson: () => string; // Assume this will change selectedPerson
  disabled: boolean;
  people: {
    id: string;
    name: string;
    health: number;
  }[]; // Exactly 3
}

export function PeoplePicker(props: PeoplePickerProps) {
  const [selectedPerson, setSelectedPerson] = useState(props.selectedPerson);

  //Update selected person when selected person changes
  useEffect(() => {
    setSelectedPerson(props.selectedPerson);
  }, [props.selectedPerson])

  // Use Avatars (User's initial)
  // Healthbars under them
  // Highlight selected use somehow

  return <div></div>;
}

// function onSelectChange(props: { onSelectPerson: () => string });

