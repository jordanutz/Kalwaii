SELECT (weight * gender_multiplier * 24 * lean_factor_multiplier) * activity_coefficient AS caloric_expenditure
FROM diet_users JOIN diet_profile ON diet_users.id = diet_profile.user_id WHERE user_id = $1
