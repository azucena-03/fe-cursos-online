import React from "react";
import { useStateValue } from "../../contexto/store";
import { Route, Redirect } from "react-router-dom";

export function RutaSegura({ component: Component, ...rest }) {
  const [{ sesionUsuario }, dispatch] = useStateValue();

  return (
    <Route
      {...rest}
      render={(props) =>
        sesionUsuario ? (
          sesionUsuario.autenticado == true ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect to="/auth/login" />
          )
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}
