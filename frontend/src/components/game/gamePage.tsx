import React, { useState, useEffect } from "react";
import axios from "axios";
import { AutoFlashcard } from "./AutoFlashcard";
import Select from "./PeoplePicker";
import { Timer } from "./Timer";
import DamageDealer from "./damageDealer";
import { useAuth } from "../../context/auth/AuthContext";
import { useParams } from "react-router-dom";
import ItemShop from "./ItemShop";
import ConfirmUseModal from "../ConfirmUseModal";

const NUMBER_OF_QUESTIONS = 5;

interface Question {
  id: string;
  question: string;
  answers: string[];
  possibleAnswers: string[]; // We might want to change this to a IMultipleChoiceAnswers list so that we can house the answer object
}

interface IMultipleChoiceAnswers {
  _id: string;
  answer: string;
  correct: boolean;
  question: string;
}

interface QuestionResponse {
  _id: string;
  class: string;
  createdBy: string;
  isHidden: boolean;
  question: string;
  type: string;
}

interface Item {
  _id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;  
}

interface Inventory {
  _id: string;
  userId: string;
  classId: string;
  itemId: Item;
  quantity: number;
}

async function fetchQuestionsAndAnswers(classId: string | undefined) {
  try {
    const questionResponse = await axios.get<QuestionResponse[]>(
      new URL(`/api/class/${classId}`, process.env.REACT_APP_BACKEND_URL!).href,
      { withCredentials: true }
    );

    const answerResponse = await axios.get<IMultipleChoiceAnswers[]>(
      new URL(
        "/api/question/multipleChoiceAnswers",
        process.env.REACT_APP_BACKEND_URL!
      ).href,
      { withCredentials: true }
    );

    let unmappedQuestionSet = [] as QuestionResponse[];

    if (questionResponse.data.length === 0) {
      return "never";
    }

    if (NUMBER_OF_QUESTIONS > questionResponse.data.length) {
      while (unmappedQuestionSet.length < NUMBER_OF_QUESTIONS) {
        console.log(unmappedQuestionSet);
        console.log("hi");
        unmappedQuestionSet = unmappedQuestionSet.concat(
          questionResponse.data
            .sort(() => Math.random() - Math.random())
            .slice(
              0,
              Math.min(
                NUMBER_OF_QUESTIONS - unmappedQuestionSet.length,
                questionResponse.data.length
              )
            )
        );
      }
    } else {
      unmappedQuestionSet = questionResponse.data
        .sort(() => Math.random() - Math.random())
        .slice(0, NUMBER_OF_QUESTIONS);
    }

    const questions: Question[] = unmappedQuestionSet.map((question) => {
      const mappedAnswers = [];
      for (let i = 0; i < answerResponse.data.length; i++) {
        if (question._id === answerResponse.data[i].question) {
          // REMINDER: reformat this to add the answer object and not just the name
          mappedAnswers.push(answerResponse.data[i].answer);
        }
      }

      const answers = answerResponse.data
        .filter((answer) => answer.question === question._id && answer.correct)
        .map((a) => a.answer);
      return {
        id: question._id,
        question: question.question,
        answers: answers,
        possibleAnswers: mappedAnswers,
      };
    });
    return questions;
  } catch (error) {
    console.log("Error fetching questions and answers", error);
    return [];
  }
}

interface GamePageProps {}

interface PersonGroupRecord {
  id: string;
  lastName: string;
  firstName: string;
  profileColor: string;
  health: number;
}

export default function GamePage(props: GamePageProps) {
  const [questionSet, setQuestionSet] = useState<Question[] | null | "never">(
    null
  );
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [usersInClass, setUsersInClass] = useState<PersonGroupRecord[]>([]);
  const [timeInCentiseconds, setTimeInCentiseconds] = useState(0);
  const [doingFlashcard, setDoingFlashcard] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [isAttacking, setIsAttacking] = useState(false);
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [userHealth, setUserHealth] = useState<null | number>(null);
  const [showShop, setShowShop] = useState(false);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [goldAmount, setGoldAmount] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<Inventory | null>(null);
  const [activeItemBonus, setActiveItemBonus] = useState(0);
  const [activeItemName, setActiveItemName] = useState<string | null>(null);

  const authData = useAuth();

  const params = useParams();

  const classId = params.classId;

  useEffect(() => {
    const fetchGoldAmount = async () => {
        if (authData.authUserId && classId) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/gold/${authData.authUserId}/${classId}`, {
                    withCredentials: true
                });
                setGoldAmount(response.data.gold);
            } catch (error) {
                console.error("Failed to fetch gold amount:", error);
            }
        }
    };

    fetchGoldAmount();
}, [authData.authUserId, classId]);

  useEffect(() => {
    const fetchAllItems = async () => {
        try {
            const response = await axios.get<Item[]>(`${process.env.REACT_APP_BACKEND_URL}/api/items`, {
                withCredentials: true
            });
            setAllItems(response.data);
        } catch (error) {
            console.error("Failed to fetch items:", error);
        }
    };
    fetchAllItems();
  }, []);

  useEffect(() => {
    async function fetchInventory() {
      if (!authData.authUserId || !classId) return;
      try {
        const { data } = await axios.get<Inventory[]>(`${process.env.REACT_APP_BACKEND_URL}/api/inventory/${authData.authUserId}/${classId}`, {
          withCredentials: true
        });
        setInventory(data);
      } catch (error) {
        console.error("Failed to fetch inventory:", error);
        setInventory([]);
      }
    }

    fetchInventory();
  }, [authData.authUserId, classId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<PersonGroupRecord[]>(
          `${process.env.REACT_APP_BACKEND_URL}/api/game/${classId}/group`,
          {
            withCredentials: true,
          }
        );

        setUserHealth(
          response.data.find((u) => u.id === authData.authUserId)!.health
        );
        const peopleFormat = response.data.filter(
          (u) => u.id !== authData.authUserId
        );

        console.log(`PeopleFormat: ${JSON.stringify(peopleFormat)}`);

        setUsersInClass(peopleFormat);
      } catch (error) {
        console.error("fetch error: ", error);
      }

      fetchQuestionsAndAnswers(classId).then((questions) => {
        setQuestionSet(questions);
      });
    }
    fetchData();
  }, [setUsersInClass, authData.authUserId, classId]);
  

   useEffect(() => {
    async function fetchUserByClass() {
      try {
        const response = await axios.get<any>(
          `${process.env.REACT_APP_BACKEND_URL}/api/class/${classId}/user`,
          {
            withCredentials: true,
          }
        );
  
        const peopleFormat = response.data.slice(0, 3).map((user: any) => ({
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          profileColor: user.profileColor,
          health: user.health,
        }));
  
        setUsersInClass(peopleFormat);
      } catch (error) {
        console.log("fetch error: ", error);
      }
    }

    fetchQuestionsAndAnswers(classId).then((questions) => {
      setQuestionSet(questions);
    });
    fetchUserByClass();
  }, [classId]);

  //update the score of the attacker based on damage
  async function updateAttackerScore(damage: Number, attacker: string) {
    try {
      await axios.post(
        new URL(
          "/api/user/updateAttackerScore",
          process.env.REACT_APP_BACKEND_URL!
        ).href,
        {
          damageAmount: damage,
          attacker: authData.authUserId,
          classId: classId,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error, "Error updating user health");
    }
  }

  const formatTime = (totalCentiseconds: number): string => {
    const minutes = Math.floor(totalCentiseconds / 6000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((totalCentiseconds % 6000) / 100)
      .toString()
      .padStart(2, "0");
    const centiseconds = (totalCentiseconds % 100).toString().padStart(2, "0");
    return `${minutes}:${seconds}:${centiseconds}`;
  };

  const buyItem = async (item: Item) => {
    if (inventory.length < 3) {
      if (goldAmount >= item.cost) { // Check if user has enough gold
        try {
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/inventory`, {
            userId: authData.authUserId,
            classId: classId,
            itemId: item._id,
            quantity: 1
          }, { withCredentials: true });
  
          // Deduct the cost of the item from gold
          const goldResponse = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/gold/update`, {
            userId: authData.authUserId,
            classId: classId,
            amount: item.cost 
          }, { withCredentials: true });
  
          setGoldAmount(goldResponse.data.gold); // Update the state with the new gold amount
  
          const fullItemDetails = allItems.find(i => i._id === item._id);
          if (fullItemDetails) {
            const newItem = {
              ...response.data,
              itemId: fullItemDetails  
            };
            setInventory(currentInventory => [...currentInventory, newItem]);
            alert("Item added to inventory!");
          } else {
            console.error("Item details not found in allItems.");
          }
        } catch (error) {
          alert("Failed to add item to inventory. Please try again.");
          console.error("Error adding item to inventory:", error);
        }
      } else {
        alert("Not enough gold to purchase this item.");
      }
    } else {
      alert("Maximum 3 items allowed in inventory.");
    }
  };

  const handleItemClick = (inventoryItem: Inventory) => {
    console.log("Selected Inventory Item:", inventoryItem);
    setSelectedInventoryItem(inventoryItem);
    setShowConfirmModal(true);
  };
  
  const handleUseItem = (inventoryItem: Inventory) => {
    if (!inventoryItem) return;

    // Determine the bonus or effect of the item
  const itemEffect = determineItemEffect(inventoryItem.itemId);

    if (itemEffect.type === 'health') { //Health items
        const currentHealth = userHealth || 0;
        const addHealth = itemEffect.value
        const totalHealth = Math.min(addHealth + currentHealth, 100) //100 is the max health but backend doesnt reflect that
        setUserHealth(totalHealth); // Update health in the state
        updateHealthOnBackend(addHealth);
    } else if (itemEffect.type === 'damage') { //Damage items
        setActiveItemBonus(itemEffect.value);
        setActiveItemName(inventoryItem.itemId.name); 
    }
    removeItemFromInventory(inventoryItem._id);
    setShowConfirmModal(false);
  };

  const updateHealthOnBackend = async (healthChange: number) => {
    try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/updateHealth`, {
            damageAmount: healthChange, 
            attackUser: authData.authUserId,  // ID of yourself
            classId: classId  
        }, { withCredentials: true });

        console.log("Health updated successfully!", healthChange);
    } catch (error) {
        console.error("Failed to update health on the server:", error);
    }
  };

  const removeItemFromInventory = async (inventoryId: string) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/inventory/${inventoryId}`;
    console.log("Attempting to delete inventory item at:", url);  
    try {
      const response = await axios.delete(url, { withCredentials: true });
      if (response.status === 200) {
        setInventory(currentInventory => currentInventory.filter(item => item._id !== inventoryId));
      } else {
        alert("Failed to remove the item.");
      }
    } catch (error) {
      console.error("Error removing item from inventory:", error);
      alert("Error removing item from inventory.");
    }
  };

  const determineItemEffect = (item: Item) => {
    switch (item.name) {
        case 'Magic Wand':
            return { type: 'damage', value: 5 };
        case 'Flame Spell':
            return { type: 'damage', value: 8 };
        case 'Damage Spell':
            return { type: 'damage', value: 15 };
        case 'Health Potion':
            return { type: 'health', value: 10 };
        case 'Health Spell':
            return { type: 'health', value: 15 };
        default:
            return { type: 'none', value: 0 };
    }
};

  return (
    <div className="grid grid-cols-2 gap-4 h-screen overflow-hidden">
      {/* Left side of the screen */}
      <div className="col-span-1 bg-[url('https://s3.amazonaws.com/spoonflower/public/design_thumbnails/0424/5908/1431605648965_shop_thumb.png')] p-4 pt-5">
        {/* PeoplePicker component */}
        <Select
          selectedPerson={selectedPerson}
          onSelectPerson={setSelectedPerson}
          disabled={!isAttacking}
          people={usersInClass}
          userHealth={userHealth || 100}
        />
        {/* Attack Button */}
        <div className="flex justify-center items-center">
          <DamageDealer
            classId={classId || ""}
            disabled={!isAttacking || !selectedPerson}
            targetId={selectedPerson}
            onClick={() => {
              setTimeInCentiseconds(0);
              setIsAttacking(false);
              setSelectedPerson(null);
              updateAttackerScore(calculateDamage(correctQuestions, timeInCentiseconds, activeItemBonus), authData.authUserId);

              let newUsers = [...usersInClass];
              newUsers.find((u) => u.id === selectedPerson)!.health -=
                calculateDamage(correctQuestions, timeInCentiseconds, activeItemBonus);
              setUsersInClass(newUsers);

              setActiveItemBonus(0);    
              setActiveItemName(null);  

              setCurrentQuestionIdx(0);
              setCorrectQuestions(0);
            }}
            damage={-calculateDamage(correctQuestions, timeInCentiseconds, activeItemBonus)}
          />
        </div>
      </div>

      {/* Shop Button */}
      
      <div className="fixed bottom-10 right-10 flex items-center space-x-5"> 
        <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowShop(true)}>
            Shop
        </button>

        {/* Gold Display */}
        <div className="flex items-center bg-yellow-400 text-white font-bold py-2 px-4 rounded-full">
            <i className="fas fa-coins"></i> 
            <span className="ml-2">{goldAmount} Gold</span>
        </div>
      </div>

      {/*Shop popup*/}

      {showShop && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full">
            <ItemShop onBuyItem={buyItem} />
            <button
              onClick={() => setShowShop(false)}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Close Shop
            </button>
          </div>
        </div>
      )}

      {/*Inventory*/}

      <div className="fixed bottom-10 left-10">
        <div className="text-xl font-bold mb-2">Inventory</div>
        <div className="flex items-center space-x-2">
          {inventory.map((inventoryItem, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(inventoryItem)}
              className="flex justify-center items-center w-12 h-12 bg-gray-200 rounded-full"
            >
              <i className={`fas ${inventoryItem.itemId.icon} text-xl`}></i>
            </button>
          ))}
        </div>
      </div>

    {/* Modal for confirming item use */}
  
      {selectedInventoryItem && (
        <ConfirmUseModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => {
            handleUseItem(selectedInventoryItem);
            setShowConfirmModal(false);
          }}
          title={`Use ${selectedInventoryItem?.itemId.name}?`}
        />
      )}

      {/* Right side of the screen */}

      <div className="col-span-1 bg-gray-200 p-4 flex flex-col content-center">
        {/* TimerPage and AutoFlashcard components */}
        {!doingFlashcard && !isAttacking && (
          <div className="container py-10 px-10 min-w-full flex flex-col items-center justify-center">
            <button
              className={
                " text-white font-bold py-2 px-4 mt-3 w-2/3 h-20 rounded " +
                (questionSet === null || questionSet === "never"
                  ? "bg-gray-300"
                  : "bg-green-600 hover:bg-green-500")
              }
              disabled={questionSet === null || questionSet === "never"}
              onClick={() => setDoingFlashcard(true)}
            >
              {questionSet === null && "Loading..."}

              {questionSet === "never" && "No Questions Yet..."}

              {questionSet !== null &&
                questionSet !== "never" &&
                "Start Round!"}
            </button>
          </div>
        )}

        {isAttacking && (
          <div className="flex flex-col items-center pt-10">
            <div className="text-2xl">
              <div className="mb-10"> 
                Time Elapsed: {formatTime(timeInCentiseconds)} (x
                {calculateMultiplier(timeInCentiseconds).toFixed(1)} Multiplier)
              </div>
              <div className="mb-10"> 
                Questions Correct: {correctQuestions}/{NUMBER_OF_QUESTIONS} (
                {calculateBaseDamage(correctQuestions)} Base Damage)
              </div>
              {activeItemBonus > 0 && (
                <div className="mb-10">
                  {activeItemName} Bonus: +{activeItemBonus} Damage
                </div>
              )}
              <div>Total Damage: {calculateDamage(correctQuestions, timeInCentiseconds, activeItemBonus)}</div>
            </div>
          </div>
        )}

        {doingFlashcard && questionSet && questionSet !== "never" && (
          <>
            <div className="flex flex-col items-center">
              <Timer
                start={doingFlashcard}
                timeInCentiseconds={timeInCentiseconds}
                setTimeInCentiseconds={setTimeInCentiseconds}
              />
              {(doingFlashcard || isAttacking) && (
                <div className="text-2xl">{formatTime(timeInCentiseconds)}</div>
              )}
            </div>
            <AutoFlashcard
              questionSet={questionSet}
              onQuestionAnswer={(lastQuestionRight: boolean) => {
                if (lastQuestionRight) {
                  setCorrectQuestions((cq) => cq + 1);
                }
                setCurrentQuestionIdx((last) => {
                  if (last + 1 === NUMBER_OF_QUESTIONS) {
                    setDoingFlashcard(false);
                    setIsAttacking(true);
                    setDoingFlashcard(false);
                  }
                  return Math.min(NUMBER_OF_QUESTIONS - 1, last + 1);
                });
              }}
              currentQuestionIdx={currentQuestionIdx}
              resultTimeSecs={0.5}
            />
          </>
        )}
      </div>
    </div>
  );
}

function calculateDamage(numberCorrect: number, timeCentiseconds: number, itemBonus: number) {
  const baseDamage = calculateBaseDamage(numberCorrect);
  const multiplier = calculateMultiplier(timeCentiseconds);
  return Math.round(multiplier * baseDamage + itemBonus); 
}


function calculateBaseDamage(numberCorrect: number) {
  return numberCorrect * 3;
}

function calculateMultiplier(timeCentiseconds: number) {
  return (15 - timeCentiseconds / 100) / 5;
}