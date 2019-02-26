SELECT sum(calories * quantity) AS total_calories,
SUM(carbohydrates * quantity) AS carbohydrates,
SUM(fat * quantity) AS fat,
SUM(protein * quantity) AS protein,
SUM(sugar * quantity) AS sugar,
SUM(saturated_fat * quantity) AS saturatedFat,
SUM(unsaturated_fat * quantity) AS unsaturatedFat,
SUM(cholesterol * quantity) AS cholesterol,
SUM(sodium * quantity) AS sodium,
SUM(potassium * quantity) AS potassium
FROM food JOIN user_records ON food.id = user_records.food_id
WHERE user_id = $1 AND date_posted = $2
