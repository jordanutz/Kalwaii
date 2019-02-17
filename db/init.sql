drop table food
drop table meal
drop table diet_users
drop table diet_profile

select * from diet_users
select * from diet_profile
select * from meal
select * from food
select * from user_records

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
    gender_multiplier int not null,
    lean_factor_multiplier int not null,
    activity_coefficient int not null
)

create table user_records (
    id serial primary key,
    user_id integer references diet_users(id),
    meal_id integer references meal(id),
    food_id integer references food(id),
    date_posted date not null,
    quantity integer not null
)

create table food (
    id serial primary key,
    name varchar(40) not null,
    calories decimal not null,
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
