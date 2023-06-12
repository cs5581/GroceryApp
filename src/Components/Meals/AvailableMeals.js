import React from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const DUMMY_MEALS = [
  {
    id: "g1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "g2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "g3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "g4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const [groceries, setGroceries] = useState([]);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://groceryapp-88b25-default-rtdb.firebaseio.com/Groceries.json"
      );
      const responseData = await response.json();

      const loadedGroceries = [];
      for (const key in responseData) {
        loadedGroceries.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setGroceries(loadedGroceries);
    };
    fetchMeals();
  }, []);

  const mealsList = groceries.map((x) => (
    <MealItem
      key={x.id}
      id={x.id}
      name={x.name}
      description={x.description}
      price={x.price}
    ></MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
