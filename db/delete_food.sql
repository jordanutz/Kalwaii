DELETE FROM user_records WHERE id = $1;
SELECT * FROM food JOIN user_records ON user_records.food_id = food.id
WHERE user_id = $2 AND meal_id = $3 AND date_posted = $4
