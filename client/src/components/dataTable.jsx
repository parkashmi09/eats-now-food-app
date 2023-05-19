import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

export default function DataTable({ columns, title, data, actions }) {
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        actions={actions}
      />
    </ThemeProvider>
  );
}
