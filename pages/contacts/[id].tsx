import * as React from "react";
import { useRouter } from "next/router";

import AppMenu from "@/components/Menu/menu";
import {
  Grid,
  Container,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";

export default function Contact() {
  const router = useRouter();
  const [startDate, setStartDate] = React.useState(new Date());

  const id = router.query.id;

  return (
    <>
      <AppMenu></AppMenu>
      <h1 className="text-3xl font-bold underline">Concats {id}</h1>
      <Container>
        <Grid container spacing={2} marginTop={5}>
          <Grid item xs={12} md={6}>
            <TextField label="First name" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField label="Last name" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Birthday"
              type="date"
              defaultValue="2019-05-24"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField label="Nickname" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField label="Phone" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button variant="contained" fullWidth>
              Search
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="contained" color="warning" fullWidth>
              Clear
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="contained" color="success" fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
