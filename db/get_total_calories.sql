SELECT sum(calories * quantity) AS total_calories,
SUM(carbohydrates * quantity) AS carbohydrates,
SUM(fat * quantity) AS fat,
SUM (protein * quantity) AS protein
FROM food JOIN user_records ON food.id = user_records.food_id
WHERE user_id = 1 AND date_posted = 'Feb 25 2019'
