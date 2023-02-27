import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

interface BasicCardProps {
  title: string;
  id: number;
  text: string;
}

const BasicCard: React.FC<BasicCardProps> = ({ title, id, text }) => {
  return (
    <Card
      sx={{
        width: "450px",
        height: "350px",
        borderRadius: 10,
        textOverflow: "ellipsis",
        overflow: "hidden",
        margin: 2,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Post {id}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        ></Typography>
      </CardContent>
      <CardActions>
        <Button size="small">ADD</Button>
      </CardActions>
    </Card>
  );
};

export default React.memo(BasicCard);
