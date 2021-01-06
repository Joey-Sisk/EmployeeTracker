DROP DATABASE employee_manager_db;

CREATE TABLE employee_manager_db;
USE employee_manager_db;

CREATE TABLE employee_db (
	id INT PRIMARY KEY;
    first_name VARCHAR(30);
    last_name VARCHAR(30);
    role_id INT NOT NULL;
    manager_id INT NOT NULL;
);

CREATE TABLE role_db (
	id INT PRIMARY KEY;
    title VARCHAR(30);
    salary DECIMAL NOT NULL;
    department_id INT NOT NULL;
);

CREATE TABLE department_db (
	id INT NOT NULL;
    name VARCHAR(30);
);

SELECT * FROM employee_manager_db

--------------------------------------

CREATE DATABASE top_songsDB;
USE top_songsDB;

CREATE TABLE top_1000 (
	position INT NOT NULL,
    artist VARCHAR (100) NULL,
    song VARCHAR (100) NULL,
    year INT NULL,
    raw_total DECIMAL(10, 4) NULL,
    raw_usa DECIMAL(10, 4) NULL,
    raw_uk DECIMAL(10, 4) NULL,
    raw_eur DECIMAL(10, 4) NULL,
    raw_row DECIMAL(10, 4) NULL,
    PRIMARY KEY (position)
);

CREATE TABLE top_albums (
	position INT NOT NULL,
    artist VARCHAR (100) NULL,
    song VARCHAR (100) NULL,
    year INT NULL,
    raw_total DECIMAL(10, 4) NULL,
    raw_usa DECIMAL(10, 4) NULL,
    raw_uk DECIMAL(10, 4) NULL,
    raw_eur DECIMAL(10, 4) NULL,
    raw_row DECIMAL(10, 4) NULL,
    PRIMARY KEY (position)
);

SELECT * FROM top_1000;

SELECT * 
FROM top_1000 
WHERE artist = "the white stripes";

SELECT artist
FROM top_1000
GROUP BY artist
HAVING COUNT(*) > 1;

SELECT artist
FROM top_1000
WHERE position BETWEEN 1 and 10;

SELECT *
FROM top_1000
WHERE song = "my heart will go on";

SELECT *
FROM top_1000
INNER JOIN top_albums ON top_1000.artist = top_albums.artist AND top_1000.year = top_albums.year
WHERE top_albums.artist = "the beatles"
ORDER BY top_albums.year, top_albums.position;


