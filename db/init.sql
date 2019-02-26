drop table food
drop table meal
drop table diet_users
drop table diet_profile

select * from diet_users
select * from diet_profile
select * from meal
select * from food
select * from user_records

JOIN STATEMENTS:
Retrieves caloric expenditure for user:
select (weight * gender_multiplier) * 24 * lean_factor_multiplier * activity_coefficient as caloric_expenditure
from diet_users join diet_profile on diet_users.id = diet_profile.user_id where user_id = 1

SELECT sum(calories) AS total_calories,
SUM(carbohydrates) AS carbohydrates,
SUM(fat) AS fat,
SUM (protein) AS protein
FROM food JOIN user_records ON food.id = user_records.food_id
WHERE user_id = $1 AND date_posted = $2



select sum(calories * quantity) from meal
join user_records on meal.id = user_records.meal_id
join food on food.id = user_records.food_id
where user_id = 1 and date_posted = 'Feb 25 2019'

create table diet_users (
    id serial primary key,
    auth0_id text,
    username text,
    email text,
    photo text
)

create table diet_profile (
    id serial primary key,
    user_id integer references diet_users(id),
    goal text not null,
    gender text not null,
    age integer not null,
    height integer not null,
    weight decimal not null,
    physical_level text not null,
    body_fat int not null,
    gender_multiplier decimal not null,
    lean_factor_multiplier decimal not null,
    activity_coefficient decimal not null
)

create table user_records (
    id serial primary key,
    user_id integer references diet_users(id),
    meal_id integer references meal(id),
    food_id integer references food(id),
    date_posted text not null,
    quantity integer not null
)

create table food (
    id serial primary key,
    name varchar(40) not null,
    calories int not null,
    preparation text not null,
    protein decimal not null,
    carbohydrates decimal not null,
    fat decimal not null,
    sugar decimal not null,
    saturated_fat decimal not null,
    unsaturated_fat decimal not null,
    cholesterol decimal not null,
    sodium decimal not null,
    potassium decimal not null
)

create table meal (
    id serial primary key,
    meal varchar(40) not null
)

insert into meal
  (meal)
  values
  ('Breakfast'),
  ('Lunch'),
  ('Dinner'),
  ('Snack')

  insert into food
    (name, calories, preparation, protein, carbohydrates, fat, sugar, saturated_fat, unsaturated_fat, cholesterol, sodium, potassium)
    values
    ('Oatmeal', 152, 'Standard Serving (8.1oz)', 5.5, 26.1, 3.2, 1.15, 0.46, 1.8, 0, 113, 140),
    ('Oatmeal Cookie', 112, 'Whole cookie (0.9oz)', 1.5, 17.2, 4.5, 6.16, 1.13, 3.1, 0, 96, 35),
    ('Egg', 79, 'Medium (1.90oz)', 6.9, 0.4, 5.2, 0.22, 1.7, 2.5, 205, 78, 76),
    ('Whole Wheat Bread', 181, '2 Slices', 9, 30.8, 2.5, 3.12, 0.52, 1.6, 0, 328, 183),
    ('Bacon', 55, 'Piece (0.5oz)', 2.5, 0, 5, 0, 2, 0, 20, 135, 0),
    ('Breakfast Sausage', 115, 'Whole (1.8oz)', 7.7, 0.8, 9, 0, 1.92, 4.9, 80, 292, 114),
    ('2% Milk', 130, 'Standard Serving (8.8 fl.oz)', 9, 12, 5, 12, 3, 2, 20, 110, 0),
    ('Whole Milk', 132, 'Standard Serving (7.1 fl.oz)', 6.6, 9, 7.8, 0, 5.02, 2.3, 28, 86, 310),
    ('1% Milk', 98, 'Standard Serving (8.5 fl.oz)', 8, 12, 2.5, 11, 1.5, 1, 10, 120, 0),
    ('Orange Juice', 112, 'Cup (8.7oz)', 1.7, 25.8, 0.5, 20.83, 0.06, 0.2, 0, 2, 496),
    ('Granola Bar', 115, 'Whole Bar (0.9oz)', 2.5, 15.8, 4.9, 0, 0.58, 4, 0, 72, 82),
    ('Banana', 116, 'Whole Banana (4.6oz)', 1.4, 29.6, 0.4, 15.86, 0.13, 0.1, 0, 1, 465),
    ('Orange', 85, 'Whole Orange (6.5oz)', 1.3, 21.2, 0.4, 16.82, 0.05, 0.1, 0, 0, 311),
    ('Ice Cream, Vanilla', 142, 'Scoop(2.8oz)', 2.9, 15.8, 7.8, 9.2, 4.89, 2.5, 19, 48, 139),
    ('Cliff Bar - Chocolate Chip', 250, 'Standard Serving (2.4oz)', 9, 45, 5, 22, 1.5, 0, 0, 300, 210),
    ('Chicken Breast without Skin, grilled', 171, 'Whole (4oz)', 34.5, 0, 3.6, 0, 1.12, 2.2, 118, 61, 442),
    ('Sweet Potato', 113, 'Medium Size (4.6oz)', 2, 26, 0.1, 5, 0.07, 0.01, 0, 70, 438),
    ('Broccoli', 31, 'Standard Serving (3.2oz)', 2.5, 6, 0.3, 1.53, 0.03, 0, 0, 30, 284),
    ('Vanilla Protein Powder', 150, '1 Scoop (1.4oz)', 25, 8, 2.5, 2, 1, 1.4, 80, 100, 160),
    ('Turkey Breast', 120, 'Serving (1.6oz)', 28, 0, 0.5, 0, 0, 0, 70, 55, 0),
    ('Kind Bar', 200, 'Standard Serving (1.4oz)', 5, 17, 15, 5, 3.5, 0, 0, 0, 0),
    ('Apple', 65, 'Whole (4.4oz)', 0.3, 17.3, 0.2, 12.99, 0.03, 0.1, 0, 1, 134),
    ('Nonfat Greek Yogurt', 171, 'Cup (3.5oz)', 15.6, 7.4, 8.1, 5.48, 5.19, 6.6, 4, 0, 158),
    ('Salmon Burger', 179, 'Standard Serving (4oz)', 19, 3, 10, 2, 2, 8, 80, 550, 0),
    ('Brown Rice', 222, 'Standard Serving, cooked', 5.2, 45.9, 1.8, 0.7, 0.36, 1.3, 0, 10, 86),
    ('Asparagus', 4, 'Spear Medium (0.5oz)', 0.4, 0.6, 0, 0.19, 0.01, 0, 0, 2, 34),
    ('Cliff Protein Bar', 270, '1 Bar (2.4oz)', 20, 31, 8, 23, 4, 4, 0, 240, 140),
    ('Peanut Butter', 89, 'Tablespoon (0.5oz)', 3.7, 3.3, 7.5, 0.47, 0.94, 6.1, 0, 47, 0),
    ('Almond Milk', 41, 'Standard Serving (8.5 fl.oz)', 1, 2, 3, 0, 0, 0, 0, 183, 0),
    ('Almonds, Raw', 144, 'Standard Serving (0.9oz)', 5.3, 5.4, 12.4, 0.97, 0.93, 10.7, 0, 0, 176),
    ('Romaine Lettuce', 14, '1 Cup (3oz)', 1, 3, 0, 1, 0, 0, 0, 5, 210),
    ('Albacore Tuna, canned', 90, 'Standard Serving (3oz)', 20.5, 0, 0.9, 0, 0.2, 0.4, 26, 287, 202),
    ('Pizza, Tomato with Cheese', 289, 'Slice (5.3oz)', 4.9, 33.9, 15.9, 1.2, 2.25, 12.7, 0, 510, 345),
    ('Panda Express, Fried Rice', 513, 'Standard Serving (9.4oz)', 12, 82.5, 18, 6, 3.25, 14, 60, 855, 0),
    ('Panda Express, Chow Mein', 489, 'Standard Serving (9.4oz)', 13, 65, 22, 8, 4, 0, 0, 1060, 0),
    ('Panda Express, Orange Chicken', 489, 'Standard Serving (5.7oz)', 25, 51, 23, 19, 5, 0, 80, 820, 0),
    ('Panda Express, Honey Walnut Shrimp', 370, 'Standard Serving (3.7oz)', 14, 27, 23, 9, 4, 0, 110, 470, 0),
    ('Turkey Burger', 151, 'Standard Serving (4oz)', 27, 7.8, 1.2, 3.1, 0.4, 0.8, 0, 134, 0),
    ('Zucchini', 13, 'Standard Serving (2.6oz)', 0.9, 2.3, 0.2, 1.87, 0.06, 0.1, 0, 6, 196),
    ('Dark Chocolate', 207, 'Whole Bar (1.4oz)', 1.6, 24.4, 14, 21.11, 8.23, 5, 0, 7, 119)
