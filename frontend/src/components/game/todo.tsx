import React from "react";

interface HealthBarProps {
  health: number; // Some number 0 - 100;
}

export function HealthBar(props: HealthBarProps) {
  return "Healthbar";
}

interface FlashcardGameProps {
  onFinishGame: () => {
    questionsRight: number;
    questionsWrong: number;
    timeInSecs: number;
  };

  gameStarted: boolean;
}

export function FlashcardGame(props: FlashcardGameProps) {
  return (
    <div>
      <Timer /* Add funcs */ />
    </div>
  );
}

interface AutoFlashcardProps {
  questionSet: {
    id: string;
    question: string;
    answer: string;
    possibleAnswers: string[];
  }[];
  onQuestionAnswer: () => {
    questionsAnswered: number;
    lastQuestionRight: boolean;
  };
  currentQuestion: number;
}

export function AutoFlashcard(props: AutoFlashcardProps) {
  return "AutoFlashcard";
}

interface TimerProps {
  timeInSecs: number;
  setTimeInSecs: () => number;
  start: boolean; // When false => true, restart to 0
}

export function Timer(props: TimerProps) {
  // Stopwatch
  // Start at 0.00
  return "Healthbar";
}

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
  // Use Avatars (User's initial)
  // Healthbars under them
  // Highlight selected use somehow

  return "Healthbar";
}

interface DamageDealerProps {
  selectedPerson: string;
  bonusDamage: number;
  disabled: boolean;
}

export function DamageDealer(props: DamageDealerProps) {
  // Deals with DB to actually deal damage
  //
  return "Healthbar";
}
