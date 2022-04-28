CREATE DATABASE IF NOT EXISTS lexaeus_db;

CREATE TABLE IF NOT EXISTS Category (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    name VARCHAR(255) NOT NULL
);

-- ------COLORS------
CREATE TABLE IF NOT EXISTS Colors (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    name VARCHAR(255) NOT NULL
);

-- ------PRODUCTS------
CREATE TABLE IF NOT EXISTS Products (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10,2),
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Category(id),
    color_id INT NOT NULL,
    FOREIGN KEY (color_id) REFERENCES Colors(id),
    stock INT,
    offert VARCHAR(5) DEFAULT 'false' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------FILES------
CREATE TABLE IF NOT EXISTS Files (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    url VARCHAR(255) DEFAULT 'default-img.jpg',
    createdAt DATETIME
);

CREATE TABLE IF NOT EXISTS ProductFiles (
    id INT AUTO_INCREMENT,
    PRIMARY KEY(id),
    product_id INT NOT NULL,
    files_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(id),
    FOREIGN KEY (files_id) REFERENCES Files(id)
);

-- ------SIZES------
CREATE TABLE IF NOT EXISTS Sizes (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    type VARCHAR(255) NOT NULL,
    size VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS ProductSizes (
    id INT AUTO_INCREMENT,
    PRIMARY KEY(id),
    product_id INT NOT NULL,
    sizes_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(id),
    FOREIGN KEY (sizes_id) REFERENCES Sizes(id)
);

-- ------PRODUCTCOLORS------
CREATE TABLE IF NOT EXISTS ProductColors (
    id INT AUTO_INCREMENT,
    PRIMARY KEY(id),
    product_id INT NOT NULL,
    colors_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(id),
    FOREIGN KEY (colors_id) REFERENCES Colors(id)
);

-- ------USERS------
CREATE TABLE IF NOT EXISTS img (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    url VARCHAR(255) DEFAULT 'default-img.jpg'
);

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    img_id INT NOT NULL,
    FOREIGN KEY (img_id) REFERENCES img(id),
    isAdmin VARCHAR(5) DEFAULT 'false',
    isActive VARCHAR(5) DEFAULT 'true',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------ORDERS------