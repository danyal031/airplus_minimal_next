"use client";
import React, { useEffect, useState } from "react";
import TravelCard from "./TravelCard";
import CreditList from "./CreditList";
import TransactionList from "./TransactionList";
import { CreditCardDataTypes } from "@/DataTypes/creditCard/creditCardTypes";
import { getCreditCard } from "@/global-files/axioses";
import { useGlobalContext } from "@/context/store";
import CardColorList from "./CardColorList";

const CreditCardContainer = () => {
  // initial states
  const [creditCard, setCreditCard] = useState<CreditCardDataTypes | null>(
    null
  );
  const [showLoadingCard, setShowLoadingCard] = useState<boolean>(true);
  const [helperTextCard, setHelperTextCard] = useState<string>("");
  const { userData } = useGlobalContext().userContext;
  // for choose card color
  const [cardColor, setCardColor] = useState<string>("");

  // for toggle card color
  const toggleCardColor = (color: string) => {
    setCardColor(color);
  };

  // handle get credit card
  useEffect(() => {
    getCreditCard(userData?.uuid)
      .then((res: any) => {
        setCreditCard(res.payload);
        setShowLoadingCard(false);
      })
      .catch((err) => {
        if (err.response.data.error.code === 1000) {
          setShowLoadingCard(false);
          setHelperTextCard(err.response.data.error.message);
        }
      });
  }, []);

  return (
    <div className="container my-24">
      <div className="bg-paper rounded-2xl p-5 grid grid-cols-1 gap-8">
        <TravelCard
          creditCard={creditCard}
          helperTextCard={helperTextCard}
          showLoadingCard={showLoadingCard}
          baseColor={cardColor}
        />
        <CardColorList toggleCardColor={toggleCardColor} />
        <CreditList helperTextCard={helperTextCard} />
        <TransactionList />
      </div>
    </div>
  );
};

export default CreditCardContainer;
