insert into diet_profile
  (user_id,
    goal,
    gender,
    age,
    height,
    weight,
    physical_level,
    body_fat,
    gender_multiplier,
    lean_factor_multiplier,
    activity_coefficient)
    values
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    returning*;
