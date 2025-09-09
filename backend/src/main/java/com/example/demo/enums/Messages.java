package com.example.demo.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Messages {
    USER_NOT_FOUND("El usuario no existe."),
    USER_CREATED("Usuario creado con éxito!"),
    USER_ALREADY_INACTIVE("El usuario ya está inactivo."),
    EMAIL_IN_USE("El email ya está en uso."),
    USER_DELETED("Usuario borrado con éxito."),
    USER_UPDATED("Usuario modificado con éxito."),
    GOAL_CREATED("Meta creada con éxito.");

    private String texto;
}
