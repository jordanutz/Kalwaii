INSERT INTO user_records
  (user_id, meal_id, food_id, date_posted, quantity)
  VALUES
  ($1, $2, $3, $4, $5)
  returning*
