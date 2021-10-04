CREATE TABLE movie (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    director VARCHAR(255),
    description VARCHAR(255),
    duration_min INT,
    CONSTRAINT prevent_duplicate UNIQUE (title)
);

CREATE TABLE cast (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    rolename VARCHAR(255),
    movie_id INT,
    CONSTRAINT cast_fk_movie_id
    FOREIGN KEY (movie_id) 
        REFERENCES movie(movie_id),
    CONSTRAINT prevent_duplicate UNIQUE (name, movie_id)
);

CREATE TABLE movie_user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    CONSTRAINT prevent_duplicate UNIQUE (name, email)
);

CREATE TABLE wishlist (
    wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    movie_id INT,
    CONSTRAINT wishlist_fk_movie_id  
	    FOREIGN KEY (movie_id) 
	        REFERENCES movie(movie_id),
	CONSTRAINT wishlist_fk_user_id   
	    FOREIGN KEY (user_id) 
	        REFERENCES movie_user(user_id),
	CONSTRAINT prevent_duplicate UNIQUE (user_id, movie_id)
);

INSERT INTO movie (title, director, description, duration_min) VALUES ("Movie A", "Director A", "Description A", 90);
INSERT INTO movie (title, director, description, duration_min) VALUES ("Movie B", "Director B", "Description B", 90);
INSERT INTO movie (title, director, description, duration_min) VALUES ("Movie C", "Director C", "Description C", 90);
INSERT INTO movie (title, director, description, duration_min) VALUES ("Movie D", "Director D", "Description D", 90);

INSERT INTO cast (name, rolename, movie_id) VALUES ("Actor A", "Role A", 1);
INSERT INTO cast (name, rolename, movie_id) VALUES ("Actor B", "Role B", 2);
INSERT INTO cast (name, rolename, movie_id) VALUES ("Actor C", "Role C", 3);
INSERT INTO cast (name, rolename, movie_id) VALUES ("Actor D", "Role D", 4);

INSERT INTO movie_user (name, email, password) VALUES ("User A", "a@email.com", "$2a$10$b.jgk55uC190tqEkhCwSUOoy9zHI4RLqdNlJ1qcJMj4ANOmV1zeMe");
INSERT INTO movie_user (name, email, password) VALUES ("User B", "b@email.com", "$2a$10$b.jgk55uC190tqEkhCwSUOoy9zHI4RLqdNlJ1qcJMj4ANOmV1zeMe");

INSERT INTO wishlist (movie_id, user_id) VALUES (1, 2);
INSERT INTO wishlist (movie_id, user_id) VALUES (2, 2);
INSERT INTO wishlist (movie_id, user_id) VALUES (3, 1);
INSERT INTO wishlist (movie_id, user_id) VALUES (4, 1);
INSERT INTO wishlist (movie_id, user_id) VALUES (1, 1);
INSERT INTO wishlist (movie_id, user_id) VALUES (2, 1);