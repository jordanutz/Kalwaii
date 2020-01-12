INSERT INTO diet_users
(name, email, password)
VALUES
($1, $2, $3)
returning id, name, email;