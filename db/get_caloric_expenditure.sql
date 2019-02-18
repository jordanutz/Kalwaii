select (weight * gender_multiplier * 24 * lean_factor_multiplier) * activity_coefficient as caloric_expenditure
from diet_users join diet_profile on diet_users.id = diet_profile.user_id where user_id = $1
