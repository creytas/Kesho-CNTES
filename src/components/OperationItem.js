import React from "react";

export default function OperationItem({
  id_operation,
  date_operation,
  matiere,
  type_operation,
  quantite,
  commentaire,
}) {
  return (
    <div
      style={{
        width: `100%`,
        padding: `15px`,
        display: `flex`,
        justifyContent: `space-around`,
        alignItems: `center`,
        borderTop: `1px solid #f6f7f9`,
        borderBottom: `1px solid #f6f7f9`,
      }}
    >
      <div style={{ width: `25%`, padding: `0px 40px` }}>{id_operation}</div>
      <div>{date_operation}</div>
      <div>{matiere}</div>
      <div>{type_operation}</div>
      <div>{quantite}</div>
      <div>{commentaire}</div>
    </div>
  );
}
