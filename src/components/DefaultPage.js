import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink, Navigate, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Icon } from "@iconify/react";

export default function DefaultPage({ image, component }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px 50px",
      }}
    >
      <div>
        <img src={image} alt="doctor's task" />
      </div>
      <div
        style={{
          padding: "0px 50px",
          fontSize: "24px",
          textAlign: "center",
        }}
      >
        <p>Les informations que vous cherchez sont indisponibles</p>
        {component ? (
          <Button
            variant="contained"
            component={RouterLink}
            to={component}
            startIcon={<Icon icon={plusFill} />}
          >
            ajouter
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
