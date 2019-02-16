select * from diet_users join diet_profile on diet_users.id = diet_profile.user_id where user_id = $1
