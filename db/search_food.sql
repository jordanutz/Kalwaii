SELECT * FROM food WHERE name ILIKE CONCAT('%', $1, '%')
