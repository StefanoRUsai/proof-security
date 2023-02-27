import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { sanitizeText } from "../../utils/common";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface XSSinnerProps {
  text: string;
}

const XSSinner: React.FC<XSSinnerProps> = ({ text }) => {
  const sanitizedText = sanitizeText(text);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Item>{sanitizedText}</Item>
      </Grid>
    </Grid>
  );
};

export default React.memo(XSSinner);
