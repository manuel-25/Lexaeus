CREATE DATABASE IF NOT EXISTS lexaeus_db;

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    name VARCHAR(255) NOT NULL
);

-- ------COLORS------
CREATE TABLE IF NOT EXISTS colors (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    name VARCHAR(255) NOT NULL,
    hex VARCHAR(10) NOT NULL
);

-- ------PRODUCTS------
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10,2),
    sizes VARCHAR(255),
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Categories(id),
    color_id INT NOT NULL,
    FOREIGN KEY (color_id) REFERENCES Colors(id),
    color2_id INT,
    FOREIGN KEY (color2_id) REFERENCES Colors(id),
    stock INT, 
    offert VARCHAR(5) DEFAULT 'false' NOT NULL,
    onList VARCHAR(5) DEFAULT 'false' NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------FILES------
CREATE TABLE IF NOT EXISTS files (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    url VARCHAR(255) DEFAULT 'default-img.jpg',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_file (
    id INT AUTO_INCREMENT,
    PRIMARY KEY(id),
    product_id INT NOT NULL,
    file_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(id),
    FOREIGN KEY (file_id) REFERENCES Files(id)
);

-- ------SIZES------
CREATE TABLE IF NOT EXISTS sizes (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    type VARCHAR(255) NOT NULL,
    size VARCHAR(255)
);

/*CREATE TABLE IF NOT EXISTS product_size (
    id INT AUTO_INCREMENT,
    PRIMARY KEY(id),
    product_id INT NOT NULL,
    size_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(id),
    FOREIGN KEY (size_id) REFERENCES Sizes(id)
);*/

-- ------PRODUCTCOLORS------
/*CREATE TABLE IF NOT EXISTS product_color (
    id INT AUTO_INCREMENT,
    PRIMARY KEY(id),
    product_id INT NOT NULL,
    color_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(id),
    FOREIGN KEY (color_id) REFERENCES Colors(id)
);*/

-- ------USERS------
CREATE TABLE IF NOT EXISTS image (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    url VARCHAR(255) DEFAULT 'default-img.jpg'
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    image_id INT,
    FOREIGN KEY (image_id) REFERENCES image(id),
    isAdmin VARCHAR(5) DEFAULT 'false',
    isActive VARCHAR(5) DEFAULT 'true',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------ORDERS------