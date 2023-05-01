CREATE TABLE user(
    id int PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250),
    contactNumber varchar(20),
    email VARCHAR(50),
    password VARCHAR(250),
    status VARCHAR(20),
    role VARCHAR(20),
    UNIQUE (email)
);

INSERT INTO user(name,contactNumber,email,password,status,role) VALUES ('Admin','0760774082','admin@gmail.com','admin','true','admin');

CREATE TABLE Subjects(
    id int not NULL AUTO_INCREMENT,
    name VARCHAR(255) not null,
    PRIMARY key(id)
);

CREATE TABLE teachers(
    id int not null AUTO_INCREMENT,
    name VARCHAR(255) not NULL,
    subjectId int not NULL,
    DESCRIPTION VARCHAR(255),
    fee int,
    status VARCHAR(20),
    PRIMARY KEY(id)
);

CREATE TABLE bill(
    id int not NULL AUTO_INCREMENT,
    uuid VARCHAR(200) not NULL,
    name VARCHAR(255) not NULL,
    email VARCHAR(255) not NULL,
    contactNumber VARCHAR(20) not NULL,
    paymentMethod VARCHAR(50) not NULL,
    total int not NULL,
    productDetails JSON DEFAULT NULL,
    createdBy VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

