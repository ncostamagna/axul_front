import { Grid, Container, Typography } from "@mui/material";
import { Inter } from "@next/font/google";
import AppMenu from "@/components/Menu/menu";
const inter = Inter({ subsets: ["latin"] });

const dates = [
  { label: "Today", days: 0 },
  { label: "Tomorrow", days: 1 },
  { label: "Overmorrow", days: 2 },
  { label: "After Overmorrow", days: 3 },
];

export default function Home() {
  return (
    <>
      <AppMenu></AppMenu>
      <Container>
        <Grid container spacing={3}>
          {dates.map((date) => (
            <Grid item xs={12} md={3} key={date.label}>
              <Typography
                variant="h6"
                component="p"
                align="center"
                marginTop={2}
                marginBottom={{
                  lg: 5,
                  md: 1,
                }}
              >
                {date.label}
              </Typography>
              <Grid container>
                <Grid item>
                  <Typography variant="subtitle1" component="p">
                    Nahuel Costamagna
                  </Typography>
                  <Typography variant="body1" component="p">
                    11/10
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
