import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "../CSS/Infobox.css";

function Infobox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent className="infobox__card">
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        <h2 classname="infoBox__cases">{cases}</h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Infobox;
