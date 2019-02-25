SELECT sum(calories) AS total_calories,
SUM(carbohydrates) AS carbohydrates,
SUM(fat) AS fat,
SUM (protein) AS protein
FROM food JOIN user_records ON food.id = user_records.food_id
WHERE user_id = $1 AND date_posted = $2
