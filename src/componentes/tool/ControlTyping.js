import React, { useEffect, useState } from "react";

export default function ControlTyping(texto, delay) {
  const [textValor, setTextValor] = useState();

  useEffect(() => {
    const manejador = setTimeout(() => {
      setTextValor(texto);
    }, delay);

    return () => {
      clearTimeout(manejador);
    };
  }, [texto]);

  return textValor;
}
