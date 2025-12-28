import { useState,useEffect } from "react";
import { GameHeader } from "./components/GameHeader";
import { Card } from "./components/Card";

const cardValues = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H"
  ];

function App() {
  const [ cards, setCards ] = useState([]);
  const [ flippedCards , setFlippedCards ] = useState([]);
  const [ matchedCards , setMatchedCards ] = useState([]);
  const initializeGame = () => {
    // Shuffle card values

    const finalCards = cardValues.map((value , index) =>({
      id: index,
      value,
      isFlipped : false,
      isMatched : false
    }));
    setCards(finalCards);
  };

  useEffect(()=>{
    initializeGame();
  },[]);

  const handleCardClick = (card) =>{
    if(card.isFlipped || card.isMatched ){
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

    if(newFlippedCards.length === 2){
      const firstCard = cards[flippedCards[0]];
      if(firstCard.value === card.value){
        //matched
        setTimeout(()=>{
          

        setCards((prev)=> prev.map((c) => {
            if (c.id === card.id || c.id === firstCard.id) {
              return { ...c, isMatched: true };
            } else {
              return c;
            }
          })
      );
        setFlippedCards([]);

        },300);
      }else{
        //fliped the baack both cards
        setTimeout(()=>{
          const flippedBackCards = newCards.map((c)=>{
          if(newFlippedCards.includes(c.id) || c.id){
            return {...c, isFlipped: false};
          }else{
            return c;
          }
        });
        setCards(flippedBackCards);

        setFlippedCards([]);

        },1000);
      }
    }
  };
  
  return (
    <div className="app">
      <GameHeader score={3} move={10} />    

      <div className="cards-grid">
        {cards.map((card) =>{
          return (<Card card={card} onClick={handleCardClick}/>);

        })}
      </div>
    </div>
  );
}

export default App
