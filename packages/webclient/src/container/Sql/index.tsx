import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Box } from "@mui/material/";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Button from "@mui/material/Button";
import axios from "axios";
import { sanitizeInput } from "../../utils/common";

type User = {
  id: number;
  name: string;
  email: string;
};

type FormValues = {
  searchTerm: string;
};

//componente protetto tramite sanitizeInput
const UserSearch: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { register, handleSubmit, formState } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(
      "🚀 ~ file: index.tsx:26 ~ onSubmit ~ process.env.DEV_URL:",
      process.env
    );
    try {
      const response = await axios.get<User[]>(
        `http://localhost:9500/api/V1//sql/user?name=${sanitizeInput(
          data.searchTerm
        )}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "First name", width: 130 },
    { field: "email", headerName: "Last name", width: 130 },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id="searchTerm"
        label="Search Term"
        {...register("searchTerm", { required: true })}
        error={formState.errors.searchTerm !== undefined}
        helperText={formState.errors.searchTerm && "Search Term is required"}
      />
      <Button type="submit">Search</Button>
      <Box
        sx={{
          width: "100%",
          height: 400,
          marginTop: 5,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        {users.length >= 1 ? (
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        ) : null}
      </Box>
    </form>
  );
};

export default UserSearch;
