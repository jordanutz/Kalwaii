SELECT * FROM user_records
JOIN food ON user_records.food_id = food.id
WHERE user_id = $1 AND meal_id = $2 AND date_posted = $3
