SELECT sum(calories) AS total_calories
FROM food JOIN user_records ON food.id = user_records.food_id
WHERE user_id = $1 AND date_posted = $2
