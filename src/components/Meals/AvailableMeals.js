import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {


	////// 2 показывает если ошибку сервер не работает и данные не можем получить
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState(false);

	useEffect(() => {
		const fetchMeals = async () => {
			
			const response = await fetch("https://http-fod-shop-default-rtdb.firebaseio.com/meals.json");

			if (!response.ok) {
				throw new Error("Error");
			}

			const responseData =  await response.json(); // Получаем объект а нужен массив, далее трансформируем
			setIsLoading(false);
			const loadedMeals = []; // тут будет новый массив с объекта с сервера
 
			for (const key in responseData) { // объект превращаем в массив
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					price: responseData[key].price,
					description: responseData[key].description
				})
			}

			setMeals(loadedMeals); // записываем данные в стейт, чтоыб функция обновилась и данные записались дальше
		}

	
			fetchMeals().catch((error) => {
				setIsLoading(false);
				setHttpError(error.message);
			}); // запускаем получение данных с сервера
		
		
		
	}, []);
	////// 2 показывает если ошибку сервер не работает и данные не можем получить

	// 1 полностью рабочий вариант с получением данных, выодятся только данные, ошибки не выводятся
	
	/* const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchMeals = async () => {
			
			const response = await fetch("https://http-fod-shop-default-rtdb.firebaseio.com/meals.json");
			const responseData =  await response.json(); // Получаем объект а нужен массив, далее трансформируем
			setIsLoading(false);
			const loadedMeals = []; // тут будет новый массив с объекта с сервера
 
			for (const key in responseData) { // объект превращаем в массив
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					price: responseData[key].price,
					description: responseData[key].description
				})
			}

			setMeals(loadedMeals); // записываем данные в стейт, чтоыб функция обновилась и данные записались дальше
		}

		
		fetchMeals(); // запускаем получение данных с сервера
	}, []); */

	// 1 полностью рабочий вариант с получением данных, выодятся только данные, ошибки не выводятся

	console.log(meals);

	if (httpError) {
		return (
			<section className={classes.meals}>
				<p>{httpError && <p>error http massage</p>}</p>
    		</section>
		)
	}

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
		
      <Card>
	  	{isLoading && <p>Loading</p>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
