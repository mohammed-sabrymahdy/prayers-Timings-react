import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard({ name, time, image }) {
  return (
    <Card
      sx={{
        width: "18vw",
        backgroundColor: "#f5f5f5",

        height: 250,
        margin: "auto",
      }}
    >
      <CardMedia sx={{ height: 140 }} image={image} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {name}
        </Typography>

        <Typography sx={{ color: "black" }} variant="h5">
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
