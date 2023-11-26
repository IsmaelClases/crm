const EMAIL = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
const CIF_NIE_NIF_REGEXP = /^(X(-|\.)?0?\d{7}(-|\.)?([A-Z]|[a-z])|([A-Z]|[a-z])(-|\.)?\d{7}(-|\.)?[0-9A-Z]|\d{8}(-|\.)?([A-Z]|[a-z]))$/;
const TELEFONO = /^(\+|\d)[0-9]{7,16}$/;
const URL_REGEXP = /^(http|https):\/\//;
const CP = /^(?:0?[1-9]|[1-4]\d|5[0-2])\d{3}$/;

export const validador = {
  email: EMAIL,
  dni: CIF_NIE_NIF_REGEXP,
  telefono: TELEFONO,
  url: URL_REGEXP,
  cp: CP
};
