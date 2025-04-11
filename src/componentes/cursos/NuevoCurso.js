import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import style from "../tool/Style";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ImageUpload from "react-images-upload";
import { v4 as uuidv4 } from "uuid";
import { obtenerDataImagen } from "../../actions/ImagenAction";
import { guardarCurso } from "../../actions/CursoAction";
import { useStateValue } from "../../contexto/store";

export default function NuevoCurso() {
  const [{ sesionUsuario }, distpach] = useStateValue();
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [imagenCurso, setImagenCurso] = useState(null);
  const [curso, setCurso] = useState({
    titulo: "",
    descripcion: "",
    precio: 0.0,
    promocion: 0.0,
  });

  const resetearForm = () => {
    setFechaSeleccionada(new Date());
    setImagenCurso(null);
    setCurso({
      titulo: "",
      descripcion: "",
      precio: 0.0,
      promocion: 0.0,
    });
  };

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;

    setCurso((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const fromKey = uuidv4();

  const subirFoto = (imagenes) => {
    const foto = imagenes[0];
    obtenerDataImagen(foto).then((respuesta) => {
      setImagenCurso(respuesta);
    });
  };

  const guardarCursoBoton = (e) => {
    e.preventDefault();

    const cursoId = uuidv4();

    const objetoCurso = {
      titulo: curso.titulo,
      descripcion: curso.descripcion,
      promocion: parseFloat(curso.promocion || 0.0),
      precio: parseFloat(curso.precio || 0.0),
      fechaPublicacion: fechaSeleccionada,
      cursoId: cursoId,
    };

    let objetoImagen = null;

    if (imagenCurso) {
      objetoImagen = {
        nombre: imagenCurso.nombre,
        data: imagenCurso.data,
        extension: imagenCurso.extension,
        objetoReferencia: cursoId,
      };
    }

    guardarCurso(objetoCurso, objetoImagen).then((respuestas) => {
      const responseCurso = respuestas[0];
      const responseImagen = respuestas[1];
      let mensaje = "";

      if (responseCurso.status === 200) {
        mensaje += "se guardo existosamente el curso";
        resetearForm();
      } else {
        mensaje += "Errores: " + Object.keys(responseCurso.data.errors);
      }

      if (responseImagen) {
        if (responseImagen.status === 200) {
          mensaje += "se guardo ña imagen exitosamente";
        } else {
          mensaje +=
            "Errores en imagen: " + Object.keys(responseImagen.data.errors);
        }
      }

      distpach({
        type: "OPEN_SNACKBAR",
        openMensaje: {
          open: true,
          mensaje: mensaje,
        },
      });
    });
  };

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Typography componente="h1" variant="h5">
          Registro de nuevo curso
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                name="titulo"
                value={curso.titulo}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese el titulo"
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                name="descripcion"
                value={curso.descripcion}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese descripcion"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="precio"
                value={curso.precio}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese el precio normal"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="promocion"
                value={curso.promocion}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese el precio promocion"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  value={fechaSeleccionada}
                  onChange={setFechaSeleccionada}
                  margin="normal"
                  id="fecha-publicacion-id"
                  label="Seleccione fecha de publicacion"
                  format="dd/MM/yyyy"
                  fullWidth
                  KeyboardButtonProps={{ "aria-label": "chamge data" }}
                ></KeyboardDatePicker>
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <ImageUpload
                withIcon={false}
                key={fromKey}
                singleImage={true}
                buttonText="Seleccione la imagen"
                onChange={subirFoto}
                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                maxFileSize={5242880}
              ></ImageUpload>
            </Grid>
          </Grid>

          <Grid container justify="center">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              style={style.submit}
              onClick={guardarCursoBoton}
            >
              Guardar Curso
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
