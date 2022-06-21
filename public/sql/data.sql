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
INSERT INTO products(name, category_id, price, description, sizes, stock, onlist, color_id, color2_id) 
    VALUES('Camiseta Relaxed Fit', 1, 2400,'Camiseta en punto de algodón suave con motivo. Modelo de corte relajado con cuello redondo y mangas cortas.',
      'S M L XL XXL' , 20, 'true', 6, 1);

INSERT INTO products(name, category_id, price, description, sizes, stock, onlist, color_id, color2_id) 
    VALUES('Pantalón corto Regular Fit', 1, 1790, 'Pantalón corto en tejido sudadera de mezcla de algodón. Modelo con cintura elástica y cordón de ajuste, bolsillos al bies, un bolsillo trasero abierto y bajos enrollados sin rematar.',
     'S M L XL XXL' , 20, 'true', 5, 5);

INSERT INTO products(name, category_id, price, description, sizes, stock, onlist, color_id, color2_id) 
    VALUES('Chinos cortos de algodón Regular Fit', 1, 6400, 'Pantalón corto en sarga de algodón con elástico en la parte posterior de la pretina y cordón de ajuste oculto delante. Modelo de corte estándar con cierre de cremallera con botón, bolsillos al bies y bolsillos insertados detrás.',
     'XS S M L XL XXL' , 20, 'true', 12, 12);

INSERT INTO products(name, category_id, price, description, sizes, stock, onlist, color_id, color2_id) 
    VALUES('Camisa Slim Fit Easy-iron', 1, 14995, 'Camisa de tela con acabado de planchado fácil. Modelo de manga larga con perilla y botón, cuello inglés con tapeta clásica, puños ajustables con botón y bajo ligeramente redondeado. Pinzas y canesú en la espalda. Corte ajustado con hombros más estrechos y cintura entallada para una silueta depurada.',
     'XS S M L XL XXL' , 20, 'true', 1, 1);

INSERT INTO products(name, category_id, price, description, sizes, stock, onlist, color_id, color2_id) 
    VALUES('Bañador estampado', 1, 9500, 'Bañador estampado a la rodilla con elástico revestido y cordón de ajuste en la cintura, bolsillos laterales y bolsillo insertado con cierre autoadherente detrás. Pantaloncillo interior en malla suave.',
     'XS S M L XL XXL' , 20, 'true', 13, 14);

INSERT INTO products(name, category_id, price, description, sizes, stock, onlist, color_id, color2_id) 
    VALUES('Camiseta oversize de algodón', 1, 5400, 'Camiseta oversize en punto de algodón. Modelo de manga corta con hombros caídos y cuello redondo en punto de canalé.',
     'XS S M L XL XXL' , 20, 'true', 2, 2);

INSERT INTO products(name, category_id, price, description, sizes, stock, onlist, color_id, color2_id) 
    VALUES('Vaquero corto denim Regular', 1, 20400, 'Vaquero corto de cinco bolsillos en denim de algodón con detalles maxidesgastados. Modelo de cintura estándar con cierre de cremallera con botón y perneras hasta la rodilla con bajos sin rematar.',
     'XS S M L XL XXL' , 20, 'true', 3, 3);

INSERT INTO products(name, category_id, price, description, sizes, stock, onlist, color_id, color2_id) 
    VALUES('Joggers en mezcla de lino Relaxed Fit', 1, 9749, 'Joggers en mezcla de lino y algodón con cierre decorativo y elástico revestido con cordón de ajuste en la cintura. Modelo de corte relajado con bolsillos al bies y bolsillos abiertos detrás.',
     'XS S M L XL XXL' , 20, 'true', 1, 1);

INSERT INTO products(name, category_id, price, description, sizes, stock, onlist, color_id, color2_id) 
    VALUES('Bañador estampado RM', 1, 4000, 'Bañador estampado con cintura elástica y cordón de ajuste, bolsillos al bies y un bolsillo trasero con cierre autoadherente. Pantaloncillo interior de malla.',
     'XS S M L XL XXL' , 20, 'true', 2, 8);

INSERT INTO products(name, category_id, price, description, sizes, stock, onlist, color_id, color2_id) 
    VALUES('Camiseta Regular Fit Nirvana', 1, 8000, 'Camiseta en punto suave de algodón con cuello redondo y motivo estampado delante.',
     'XS S M L XL' , 20, 'true', 2, 3);



-- --------FILES--------
INSERT INTO files(url) VALUES('hmgoepprod (1).jpg');
INSERT INTO files(url) VALUES('hmgoepprod (2).jpg');
INSERT INTO files(url) VALUES('hmgoepprod.jpg');

INSERT INTO files(url) VALUES('Pantalón corto Regular Fit.jpg');
INSERT INTO files(url) VALUES('Pantalón corto Regular Fit2.jpg');
INSERT INTO files(url) VALUES('Pantalón corto Regular Fit3.jpg');

INSERT INTO files(url) VALUES('Chinos cortos de algodón Regular Fit.jpg');
INSERT INTO files(url) VALUES('Chinos cortos de algodón Regular Fit2.jpg');
INSERT INTO files(url) VALUES('Chinos cortos de algodón Regular Fit3.jpg');

INSERT INTO files(url) VALUES('Camisa Slim Fit Easy-iron.jpg');
INSERT INTO files(url) VALUES('Camisa Slim Fit Easy-iron2.jpg');
INSERT INTO files(url) VALUES('Camisa Slim Fit Easy-iron3.jpg');

INSERT INTO files(url) VALUES('Bañador estampado.jpg');
INSERT INTO files(url) VALUES('Bañador estampado2.jpg');
INSERT INTO files(url) VALUES('Bañador estampado3.jpg');

INSERT INTO files(url) VALUES('Camiseta oversize de algodón.jpg');
INSERT INTO files(url) VALUES('Camiseta oversize de algodón2.jpg');
INSERT INTO files(url) VALUES('Camiseta oversize de algodón3.jpg');

INSERT INTO files(url) VALUES('Vaquero corto denim Regular.jpg');
INSERT INTO files(url) VALUES('Vaquero corto denim Regular2.jpg');
INSERT INTO files(url) VALUES('Vaquero corto denim Regular3.jpg');

INSERT INTO files(url) VALUES('Joggers en mezcla de lino Relaxed Fit.jpg');
INSERT INTO files(url) VALUES('Joggers en mezcla de lino Relaxed Fit3.jpg');

INSERT INTO files(url) VALUES('Bañador estampadoRM.jpg');
INSERT INTO files(url) VALUES('Bañador estampadoRM2.jpg');
INSERT INTO files(url) VALUES('Bañador estampadoRM3.jpg');

INSERT INTO files(url) VALUES('Camiseta Regular Fit Nirvana.jpg');
INSERT INTO files(url) VALUES('Camiseta Regular Fit Nirvana2.jpg');
INSERT INTO files(url) VALUES('Camiseta Regular Fit Nirvana3.jpg');



-- --------PRODUCT FILE--------
INSERT INTO product_file(product_id, file_id) VALUES(1, 1);
INSERT INTO product_file(product_id, file_id) VALUES(1, 2);
INSERT INTO product_file(product_id, file_id) VALUES(1, 3);

INSERT INTO product_file(product_id, file_id) VALUES(2, 4);
INSERT INTO product_file(product_id, file_id) VALUES(2, 5);
INSERT INTO product_file(product_id, file_id) VALUES(2, 6);

INSERT INTO product_file(product_id, file_id) VALUES(3, 7);
INSERT INTO product_file(product_id, file_id) VALUES(3, 8);
INSERT INTO product_file(product_id, file_id) VALUES(3, 9);

INSERT INTO product_file(product_id, file_id) VALUES(4, 10);
INSERT INTO product_file(product_id, file_id) VALUES(4, 11);
INSERT INTO product_file(product_id, file_id) VALUES(4, 12);

INSERT INTO product_file(product_id, file_id) VALUES(5, 13);
INSERT INTO product_file(product_id, file_id) VALUES(5, 14);
INSERT INTO product_file(product_id, file_id) VALUES(5, 15);

INSERT INTO product_file(product_id, file_id) VALUES(6, 16);
INSERT INTO product_file(product_id, file_id) VALUES(6, 17);
INSERT INTO product_file(product_id, file_id) VALUES(6, 18);

INSERT INTO product_file(product_id, file_id) VALUES(7, 19);
INSERT INTO product_file(product_id, file_id) VALUES(7, 20);
INSERT INTO product_file(product_id, file_id) VALUES(7, 21);

INSERT INTO product_file(product_id, file_id) VALUES(8, 22);
INSERT INTO product_file(product_id, file_id) VALUES(8, 23);

INSERT INTO product_file(product_id, file_id) VALUES(9, 24);
INSERT INTO product_file(product_id, file_id) VALUES(9, 25);
INSERT INTO product_file(product_id, file_id) VALUES(9, 26);

INSERT INTO product_file(product_id, file_id) VALUES(10, 26);
INSERT INTO product_file(product_id, file_id) VALUES(10, 27);
INSERT INTO product_file(product_id, file_id) VALUES(10, 28);