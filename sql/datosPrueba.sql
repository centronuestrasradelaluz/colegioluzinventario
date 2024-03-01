USE Inventario;
--Con HASS
INSERT INTO `Usuario` (`nombre`, `correo`, `contrasenia`, `estado`, `rol`) VALUES ('Sergio Rivera Salgado', 'email1@gmail.com', '$2y$15$.LtfOiAtM44kRXnPP3AbQODd00CdEWL0/dwcZwmj890ebBFXo0LG6', 1, 'adm');

INSERT INTO `Usuario` (`nombre`, `correo`, `contrasenia`, `estado`, `rol`) VALUES ('JuanJo Pizarro Pérez', 'email2@gmail.com', '$2y$15$.LtfOiAtM44kRXnPP3AbQODd00CdEWL0/dwcZwmj890ebBFXo0LG6', 0, 'pro');

--Sin HASS
INSERT INTO `Usuario` (`nombre`, `correo`, `contrasenia`, `estado`, `rol`) VALUES ('Sergio Rivera Salgado', 'email1@gmail.com', '123456789', 1, 'adm');

INSERT INTO `Usuario` (`nombre`, `correo`, `contrasenia`, `estado`, `rol`) VALUES ('JuanJo Pizarro Pérez', 'email2@gmail.com', '123456789', 0, 'pro');