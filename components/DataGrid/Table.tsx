import * as React from "react";
import { Grid, Button } from "@mui/material";

type Size = {
  xs: number;
};

// same name that Object Button by Material, I'll fix this issue
type Button = {
  size: Size;
  color: string;
  icon: any;
};

type Column = {
  value: string;
  size: Size;
};

type Props = {
  columns: Column[];
  values: string[][];
  buttons: Button[] | null;
};

const Table = (props: Props) => {
  return (
    <Grid container spacing={2}>
      {props.columns.map((c, i) => (
        <Grid item {...c.size} key={`1-${i}`}>
          {c.value}
        </Grid>
      ))}

      {props.buttons?.map((item, i) => (
        <Grid item {...item.size} key={`2-${i}`}></Grid>
      ))}
      {props.values.map((value: string[], row: number) => (
        <>
          {value.map((v: string, i: number) => (
            <Grid item {...props.columns[i].size} key={`3-${i}`}>
              {v}
            </Grid>
          ))}
          {props.buttons?.map((item, i) => (
            <Grid item {...item.size} key={`4-${i}`}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  padding: 0,
                  width: "100%",
                  minWidth: "auto",
                }}
                fullWidth
              >
                {<item.icon />}
              </Button>
            </Grid>
          ))}
        </>
      ))}
    </Grid>
  );
};

export default Table;
