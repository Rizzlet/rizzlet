import React from "react";
interface Person {
  _id: string;
  firstName: string;
  lastName: string;
  health: number;
}

interface PeoplePickerProps {
  selectedPerson: string | null; // Person's ID
  onSelectPerson: (id: string) => void; // Function to handle selecting a person
  disabled: boolean;
  people: Person[]; // Exactly 3
}

const PeoplePicker: React.FC<PeoplePickerProps> = ({
  selectedPerson,
  onSelectPerson,
  disabled,
  people,
}) => {


  return (
    <div>
      
    </div>
  );
};
export default PeoplePicker;
