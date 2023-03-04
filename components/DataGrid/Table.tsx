import * as React from "react";
import { Grid, Button } from "@mui/material";

type Size = {
  xs: number;
};

type Butt = {
  size: Size;
  color: string;
  icon: any;
  fun: (id: string) => void;
};

type Column = {
  value: string;
  size: Size;
};

type Props = {
  columns: Column[];
  values: string[][];
  buttons: Butt[] | null;
  id: string[];
};

const Table = (props: Props) => {
  return (
    <Grid container spacing={2}>
      {props.columns.map((c, i) => (
        <React.Fragment key={`1-${i}`}>
          <Grid item {...c.size}>
            {c.value}
          </Grid>
        </React.Fragment>
      ))}

      {props.buttons?.map((item, i) => (
        <React.Fragment key={`2-${i}`}>
          <Grid item {...item.size}></Grid>
        </React.Fragment>
      ))}
      {props.values.map((value: string[], row: number) => (
        <React.Fragment key={`5-${row}`}>
          {value.map((v: string, i: number) => (
            <React.Fragment key={`3-${i}`}>
              <Grid item {...props.columns[i].size}>
                {v}
              </Grid>
            </React.Fragment>
          ))}
          {props.buttons?.map((item, i) => (
            <React.Fragment key={`4-${i}`}>
              <Grid item {...item.size}>
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
                  onClick={() => item.fun(props.id[row])}
                >
                  {<item.icon />}
                </Button>
              </Grid>
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default Table;
