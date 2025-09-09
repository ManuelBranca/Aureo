package com.example.demo.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Messages {
    USUARIO_INEXISTENTE("El usuario no existe."),
    CREADO_USUARIO("Usuario creado con éxito!"),
    USUARIO_YA_INACTIVO("El usuario ya está inactivo."),
    EMAIL_EN_USO("El email ya está en uso."),
    USUARIO_BORRADO("Usuario borrado con éxito."),
    USUARIO_MODIFICADO("Usuario modificado con éxito."),
    META_CREADA("Meta creada con éxito.");

    private String texto;
}
