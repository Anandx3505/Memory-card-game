import { useState,useEffect } from "react";
import { GameHeader } from "./components/GameHeader";
import { Card } from "./components/Card";
import { WinCard } from "./components/WinCard";

const cardValues = [
  "🗿","💀","🤡","😂","🫡","🥲","😵‍💫","🫠",
  "🗿","💀","🤡","😂","🫡","🥲","😵‍💫","🫠"
];

function App() {
  const [ cards, setCards ] = useState([]);
  const [ flippedCards , setFlippedCards ] = useState([]);
  const [ matchedCards , setMatchedCards ] = useState([]);
  const [ score , setScore ] = useState(0);
  const [ move , setMove ] = useState(0);
  const [ isLocked , setIsLocked ] = useState(false);

  const shuffleArray = (array) => {
  const shuffled = [...array]; 
  let currentIndex = shuffled.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  }

  return shuffled;
};




  const initializeGame = () => {
    // Shuffle card values
    const shuffledCards = shuffleArray(cardValues);

    const finalCards = shuffledCards.map((value , index) =>({
      id: index,
      value,
      isFlipped : false,
      isMatched : false
    }));
    setCards(finalCards);
    setMove(0);
    setScore(0);
    setFlippedCards([]);
    setMatchedCards([]);
    setIsLocked(false);
  };
    



  useEffect(initializeGame,[]);

  const handleCardClick = (card) =>{
    

    if(isLocked || card.isFlipped || card.isMatched ){
      return;
    };

    const newCards = cards.map((c)=>{
      if(c.id === card.id){
        return {...c, isFlipped:true};
      }else{
        return c;
      }
    });

    setCards(newCards);
    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsLocked(true);
      const firstCard = newCards.find((c) => c.id === newFlippedCards[0]);
      if (firstCard && firstCard.value === card.value) {
        // matched
        setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
        setScore((prev) => prev + 1);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => {
              if (c.id === card.id || c.id === firstCard.id) {
                return { ...c, isMatched: true };
              } else {
                return c;
              }
            })
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 300);
      } else {
        // flip back both cards
        setTimeout(() => {
          const flippedBackCards = newCards.map((c) => {
            if (newFlippedCards.includes(c.id)) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          });
          setCards(flippedBackCards);

          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
      setMove((prev) => prev + 1);
    }
  };
  
  const isGameComplete = matchedCards.length === cardValues.length;

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.code === "Space" && isGameComplete) {
      e.preventDefault(); // prevents page scroll
      initializeGame();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [isGameComplete]);

  
  return (  
    <div className="app">
      <GameHeader score={score} move={move} onReset={initializeGame} />    
      {isGameComplete && <WinCard move={move} />}
      <div className="cards-grid">
        {cards.map((card) =>{
          return (<Card card={card} onClick={handleCardClick} />);

        })}
      </div>
    </div>
  );
}

export default App
