SELECT * FROM diet_users JOIN diet_profile ON diet_users.id = diet_profile.user_id WHERE user_id = $1
