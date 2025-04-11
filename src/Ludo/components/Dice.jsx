import React, { useState } from "react";
import { motion } from "framer-motion";
import dice1 from "/images/1.png";
import dice2 from "/images/2.png";
import dice3 from "/images/3.png";
import dice4 from "/images/4.png";
import dice5 from "/images/5.png";
import dice6 from "/images/6.png";

const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

const Dice = ({ onRoll, canRoll }) => {
  const [diceValue, setDiceValue] = useState(1);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    if (rolling || !canRoll) return;
    setRolling(true);

    const newValue = Math.floor(Math.random() * 6) + 1;
    
    let rollFrames = 10;
    let currentFrame = 0;

    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      currentFrame++;
      if (currentFrame >= rollFrames) {
        clearInterval(rollInterval);
        setTimeout(() => {
          setDiceValue(newValue);
          setRolling(false);
          onRoll(newValue);
        }, 300); 
      }
    }, 150); 
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <motion.img
        src={diceImages[diceValue - 1]}
        alt={`Dice ${diceValue}`}
        className="w-20 h-20 drop-shadow-lg cursor-pointer"
        animate={rolling ? { rotate: [0, 90, 180, 270, 360,270,180,90,0] } : { rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        onClick={rollDice}
        style={{ cursor: canRoll ? 'pointer' : 'not-allowed', opacity: canRoll ? 1 : 0.5 }}
      />
    </div>
  );
};

export default Dice;