CREATE DATABASE Inventario;

USE Inventario;

CREATE TABLE Usuario(
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	nombre varchar(255) NOT NULL,
    correo varchar(255) NOT NULL,
    contrasenia varchar(255) NOT NULL,
	estado BOOLEAN NOT NULL DEFAULT 1,
	rol char(3) NOT NULL,

    CONSTRAINT PK_idUsuario PRIMARY KEY (id),
	CONSTRAINT UQ_Usuario_correo UNIQUE (correo)
	
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE Linea(
	id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
	nombre varchar (80) NOT NULL,
	
	CONSTRAINT PK_idLinea PRIMARY KEY (id)
	
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE SistemaOperativo(
	id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
	nombre varchar (70) NOT NULL,
	
	CONSTRAINT PK_idSistemaOperativo PRIMARY KEY (id)
	
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE TipoEquipo(
	id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
	nombre varchar (70) NOT NULL,
	
	CONSTRAINT PK_idTipoEquipo PRIMARY KEY (id)
	
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE Equipo(
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    codigoEquipo varchar(10) NULL,
    proveedor varchar(255) NULL,
    marca varchar(255) NULL,
    monitor varchar(255) NULL,
	ram varchar(255) NULL,
	discoDuro varchar(255) NULL,
	procesador varchar(255) NULL,
    ubicacion varchar(255) NULL,
    grafica varchar(255) NULL,
    fechaCompra DATE NULL,
    observaciones varchar(500) NULL,
	valorEquipo DECIMAL (7,2) NULL,
    idLinea TINYINT UNSIGNED NOT NULL,
	idTipoEquipo TINYINT UNSIGNED NOT NULL,
	idSistemaOperativo TINYINT UNSIGNED NOT NULL,
	
	CONSTRAINT PK_idEquipo PRIMARY KEY (id),
	CONSTRAINT FK_Linea_id FOREIGN KEY (idLinea) REFERENCES Linea(id),
	CONSTRAINT FK_TipoEquipo_id FOREIGN KEY (idTipoEquipo) REFERENCES TipoEquipo(id),
	CONSTRAINT FK_SistemaOperativo_id FOREIGN KEY (idSistemaOperativo) REFERENCES SistemaOperativo(id),
	CONSTRAINT UQ_Equipo_codigoEquipo UNIQUE (codigoEquipo)

	/*PONER LOS CHECKS DE QUE NO SE PUEDAN INTRODUCIR SISTEMAS OPERATIVOS EN FOTOCOPIADORAS*/
	
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE Mantenimiento(
	id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	idEquipo SMALLINT UNSIGNED NOT NULL,
	idUsuario SMALLINT UNSIGNED NOT NULL,
	fechaIncidencia DATE NOT NULL,
	descripcion varchar(500) NULL,
	fechaArreglo DATE NULL,
	nombreArregla varchar (100) NULL,
	solucion varchar (255) NULL,
	
	
	/*ON DELETE CASCADE DUDAS*/
	CONSTRAINT PK_idMantenimiento PRIMARY KEY (id),
	CONSTRAINT FK_Equipo_id FOREIGN KEY (idEquipo) REFERENCES Equipo(id),
	CONSTRAINT FK_Usuario_id FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
	
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO SistemaOperativo (nombre) 
VALUES ('Windows'),
        ('Linux'),
        ('Apple'),
		('Android');

INSERT INTO Linea (nombre) 
VALUES ('Línea 1'),
        ('Línea 2'),
        ('Línea 3'),
		('Línea 4'),
		('Línea 4 - Inf'),
		('Línea 5'),
		('Línea 6');
INSERT INTO TipoEquipo (nombre) 
VALUES ('PC'),
		('Router'),
		('Punto de acceso'),
		('Firewall');

