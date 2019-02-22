UPDATE diet_profile SET goal = $2 where user_id = $1;
SELECT * FROM diet_users JOIN diet_profile ON diet_users.id = diet_profile.user_id WHERE user_id = $1
