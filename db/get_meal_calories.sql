SELECT * FROM meal
JOIN user_records ON meal.id = user_records.meal_id
JOIN food ON food.id = user_records.food_id
WHERE user_id = $1 AND date_posted = $2
