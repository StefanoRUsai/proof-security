import { Button, CardContent, Grid, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import uuid from "react-uuid";
import Paper from "@mui/material/Paper";

import { useForm, SubmitHandler } from "react-hook-form";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { sanitizeText } from "../../utils/common";

type FormValues = {
  text: string;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 10,
  margin: 5,
  justifyContent: "center",
  alignItems: "center",
}));

// <img src="nonexistent.png" onerror="alert('Codice malevole che paura');" />

export default function AddPost() {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await axios.put(
        "http://localhost:9500/api/V1/dataStore/dataPut",
        { id: uuid(), title: `sample-name-${uuid()}`, text: data.text }
      );
    } catch (e: any) {
      console.log("XXXX Error onSubmit", e.response);
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      justifySelf="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <Item>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              {...register("text")}
            />
            <Button variant="contained" type="submit">
              Add Post
            </Button>
          </form>
        </Item>
      </Grid>
    </Grid>
  );
}
