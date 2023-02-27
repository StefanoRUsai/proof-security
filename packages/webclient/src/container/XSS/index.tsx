import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import XSSinner from "../../component/XSSinner";
import BasicCard from "../../component/Card";
import { sanitizeText } from "../../utils/common";
import axios from "axios";
import AddPost from "../../component/AddPost";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),

  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function XSS() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "http://localhost:9500/api/V1/dataStore",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        setData(response);
      } catch (error: any) {
        console.error(error?.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Box>
      <AddPost />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {data ? (
          data.map((el: any) => (
            <BasicCard key={el.id} title={el.title} id={el.id} text={el.text} />
          ))
        ) : (
          <Box />
        )}
      </Grid>
    </Box>
  );
}
