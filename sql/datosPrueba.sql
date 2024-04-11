USE Inventario;
--Con HASS
INSERT INTO `Usuario` (`nombre`, `correo`, `contrasenia`, `estado`, `rol`) VALUES ('Sergio Rivera Salgado', 'email1@gmail.com', '$2y$15$.LtfOiAtM44kRXnPP3AbQODd00CdEWL0/dwcZwmj890ebBFXo0LG6', 1, 'adm');

INSERT INTO `Usuario` (`nombre`, `correo`, `contrasenia`, `estado`, `rol`) VALUES ('JuanJo Pizarro Pérez', 'email2@gmail.com', '$2y$15$.LtfOiAtM44kRXnPP3AbQODd00CdEWL0/dwcZwmj890ebBFXo0LG6', 0, 'pro');

--Sin HASS
INSERT INTO `Usuario` (`nombre`, `correo`, `contrasenia`, `estado`, `rol`) VALUES ('Sergio Rivera Salgado', 'email1@gmail.com', '123456789', 1, 'adm');

INSERT INTO `Usuario` (`nombre`, `correo`, `contrasenia`, `estado`, `rol`) VALUES ('JuanJo Pizarro Pérez', 'email2@gmail.com', '123456789', 0, 'pro');

INSERT INTO `Equipo` (`id`, `codigoEquipo`, `proveedor`, `marca`, `ram`, `discoDuro`, `procesador`, `ubicacion`, `grafica`, `fechaCompra`, `observaciones`,`valorEquipo`, `idLinea`, `idTipoEquipo`, `idSistemaOperativo`) 
VALUES(1000, 'N7-09', 'nosesabe', 'nosesabe', 'nosesabe', 'nosesabe', 'nosesabe', 'nosesabe', 'nosesabe', 'fecha','observaciones', 200, 1, 1, 1);


INSERT INTO `Mantenimiento` (idEquipo, nombreCreador, idAsunto, fechaIncidencia) VALUES (1000, 'Sergio Rivera Salgado', 1, '2024-03-05');
INSERT INTO `Mantenimiento` (idEquipo, nombreCreador, idAsunto, fechaIncidencia) VALUES (1000, 'Sergio Rivera Salgado', 1, '2024-02-05');

--https://www.youtube.com/watch?v=n0bLPcR0JAc
