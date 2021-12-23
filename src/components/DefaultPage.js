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
        padding: "1px 0px",
       // border: "1px solid #000",
      }}
    >
      <div>
        <img src={image} alt="doctor's task" />
      </div>
      <div
        style={{
          padding: "1px 0px",
          fontSize: "24px",
          textAlign: "center",
        }}
      >
        {console.log(component.length)}
        <p>Les informations que vous cherchez sont indisponibles</p>
        {component.length > 0 ? (
          <Button
            variant="contained"
            component={RouterLink}
            to={component}
            startIcon={<Icon icon={plusFill} />}
            style={{ margin: "25px 0px" }}
          >
            nouvel enregistrement
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
