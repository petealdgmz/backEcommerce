
use `ecommerce`;
create table usuarios(
	id int auto_increment primary key,
    nombre varchar(100),
    correo varchar(100),
    pass varchar(50)
);
create table productos(
	id int auto_increment primary key,
    nombre varchar(100),
    descripcion text,
    precio decimal(10, 2),
    img varchar(255),
    categoria varchar(100)
);
create table compras(
	id int auto_increment primary key,
    usuario_id int,
    producto_id int,
    fecha_compra int,
    cantidad int,
    foreign key(usuario_id) references usuarios(id),
    foreign key(producto_id) references productos(id)
);