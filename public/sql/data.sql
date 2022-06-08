-- --------CATEGORY--------
INSERT INTO categories VALUES(1, 'Hombre');
INSERT INTO categories VALUES(2, 'Mujer');
INSERT INTO categories VALUES(3, 'Accesorios');
INSERT INTO categories VALUES(4, 'Calzado');
INSERT INTO categories VALUES(5, 'Otros');

-- --------SIZES--------
INSERT INTO sizes VALUES(1, 'Ropa', 'S');
INSERT INTO sizes VALUES(2, 'Ropa', 'M');
INSERT INTO sizes VALUES(3, 'Ropa', 'L');
INSERT INTO sizes VALUES(4, 'Ropa', 'XL');
INSERT INTO sizes VALUES(5, 'Ropa', 'XXL');
INSERT INTO sizes VALUES(6, 'Calzado', '36');
INSERT INTO sizes VALUES(7, 'Calzado', '37');
INSERT INTO sizes VALUES(8, 'Calzado', '38');
INSERT INTO sizes VALUES(9, 'Calzado', '39');
INSERT INTO sizes VALUES(10, 'Calzado', '40');
INSERT INTO sizes VALUES(11, 'Calzado', '41');
INSERT INTO sizes VALUES(12, 'Calzado', '42');
INSERT INTO sizes VALUES(13, 'Calzado', '43');
INSERT INTO sizes VALUES(14, 'Calzado', '44');
INSERT INTO sizes VALUES(15, 'Calzado', '45');
INSERT INTO sizes VALUES(16, 'Otros', 'Unico');

-- --------COLORS--------
INSERT INTO colors VALUES(1, 'Blanco', 'F9F6EE');
INSERT INTO colors VALUES(2, 'Negro', '353839');
INSERT INTO colors VALUES(3, 'Azul', '34568B');
INSERT INTO colors VALUES(4, 'Marrón', '964B00');
INSERT INTO colors VALUES(5, 'Gris', '808080');
INSERT INTO colors VALUES(6, 'Verde', '88B04B');
INSERT INTO colors VALUES(7, 'Naranja', 'FF6F61');
INSERT INTO colors VALUES(8, 'Rosa', 'F7CAC9');
INSERT INTO colors VALUES(9, 'Purpura', '6B5B95');
INSERT INTO colors VALUES(10, 'Rojo', 'BC243C');
INSERT INTO colors VALUES(11, 'Amarillo', 'EFC050');
INSERT INTO colors VALUES(12, 'Beige', 'F5F5DC');
INSERT INTO colors VALUES(13, 'Turquoise', '45B8AC');
INSERT INTO colors VALUES(14, 'Celeste', '7FCDCD');

-- --------PRODUCTS--------
INSERT INTO products(name, category_id, price, description, sizes, stock, color_id) 
    VALUES('Camisa micro print', 1, 3390, 'Camisa micro print', 'S M' , 10, 3);

INSERT INTO products(name, category_id, price, description, sizes, stock, color_id) 
    VALUES('Malla print', 1, 2790, 'Traje de baño print', 'S M L XL', 7, 1);

INSERT INTO products(name, category_id, price, description, sizes, stock, color_id) 
    VALUES('Camisa print', 1, 4890.9, 'Camisa Print de Verano', 'S', 10, 3);

INSERT INTO products(name, category_id, price, description, sizes, stock, color_id) 
    VALUES('Babucha Leopard Velavet', 2, 12000, 
    'Pantalon confeccionado en velvet de estampa, de calce confortable y ajuste con elástico en la cintura y los puños. Un ítem personal y canchero, para sumar comodidad y máximo estilo a tus outfits',
     'S M L', 2, 5);

INSERT INTO products(name, category_id, price, description, sizes, stock, color_id) 
    VALUES('Buzo Kamala', 2, 34000, 
    'Buzo mangas 3/4 confeccionado en velvet, con cuello redondo pronunciado y diseños de bordados en lentejuelas a contratono, que protagonizan la prenda y suman brillo y aires boho. Matcheá con una bijou a tono con las lentejuelas para sumar impacto', 
     'S M L', 5, 1);

INSERT INTO products(name, category_id, price, description, sizes, stock, color_id) 
    VALUES('Vestido Oni Print Pink!', 2, 16500, 
    'Vestido largo midi, confeccionado en viscosa estampada con detalles de lúrex. El escote en V tiene detalle de volados, que se repite en la terminación de las mangas 3/4 y en el ruedo. Lleva viso y lazo para ajustar la cintura en la misma tela',
     'S L', 6, 8);

INSERT INTO products(name, category_id, price, description, sizes, stock, color_id) 
    VALUES('Saco Tanzania Otis Short', 2, 9900.90,
     'Saco corto confeccionado en viscosa con detalles de lúrex y velvet bordado con lentejuelas. Las mangas, largas y amplias, ajustan en los puños generando efecto baloon. Cierra con cordón a tono terminado en tassels. Una prenda hit de la temporada, que suma funk y personalidad a cualquier outfit.',
     ' M L XL XXL', 20, 12);

INSERT INTO products(name, category_id, price, description, sizes, stock, color_id) 
    VALUES('Saco Wonder', 2, 18699.90,
     'Saco largo a la rodilla confeccionado en satén, full bordado. Abierto adelante, su diseño bordado con canutillos y mostacillas en el frente, ruedo y mangas suman personalidad y aires folk a esta prenda protagonista de cualquier look. Podés combinarlo con jeans y diferentes estampas, en un estilismo de esencia bohemia e inspiración setentera',
     'S M L XL', 19, 11);


-- --------FILES--------
INSERT INTO files(url) VALUES('hombre1.jfif');
INSERT INTO files(url) VALUES('hombre3.jfif');
INSERT INTO files(url) VALUES('hombre2.jfif');
INSERT INTO files(url) VALUES('ropa-mujer2.jpg');
INSERT INTO files(url) VALUES('ropa-mujer4.jpg');
INSERT INTO files(url) VALUES('ropa-mujer5.jpg');
INSERT INTO files(url) VALUES('ropa-mujer6.jpg');
INSERT INTO files(url) VALUES('ropa-mujer7.jpg');


-- --------PRODUCT FILE--------
INSERT INTO product_file(product_id, file_id) VALUES(1, 1);
INSERT INTO product_file(product_id, file_id) VALUES(2, 2);
INSERT INTO product_file(product_id, file_id) VALUES(3, 3);
INSERT INTO product_file(product_id, file_id) VALUES(4, 4);
INSERT INTO product_file(product_id, file_id) VALUES(5, 5);
INSERT INTO product_file(product_id, file_id) VALUES(6, 6);
INSERT INTO product_file(product_id, file_id) VALUES(7, 7);
INSERT INTO product_file(product_id, file_id) VALUES(8, 8);


-- --------Images--------
INSERT INTO image VALUES(1, '1649721449937_imgavatars.jfif');

-- --------USERS--------
INSERT INTO users(firstName, lastName, email, password, image_id, isAdmin, isActive) 
    VALUES('usuario', 'prueba', 'usuario@prueba.com', "$2a$10$fO39Ybhdb/HgXV30h3T.Wum/areExDc65TWPv64Q1Mo88A43F4Jhy", 1, 'true', 'true');