import { Grid, Container } from "@mui/material";
import { Inter } from "@next/font/google";
import AppMenu from "@/components/Menu/menu";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <AppMenu></AppMenu>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <div>
              <div className="rounded shadow-sm py-4 px-4">
                <div>
                  <div className="col-9">
                    <h5 className="mb-0">Nahuel Costamagna</h5>
                    <span className="small text-muted h5"></span>
                  </div>
                  <div className="col-3">data</div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div>
              <div className="rounded shadow-sm py-4 px-4">
                <div>
                  <div className="col-9">
                    <h5 className="mb-0">Nahuel Costamagna</h5>
                    <span className="small text-muted h5"></span>
                  </div>
                  <div className="col-3">data</div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div>
              <div className="rounded shadow-sm py-4 px-4">
                <div>
                  <div className="col-9">
                    <h5 className="mb-0">Nahuel Costamagna</h5>
                    <span className="small text-muted h5"></span>
                  </div>
                  <div className="col-3">data</div>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={3}>
            <div>
              <div className="rounded shadow-sm py-4 px-4">
                <div>
                  <div className="col-9">
                    <h5 className="mb-0">Nahuel Costamagna</h5>
                    <span className="small text-muted h5"></span>
                  </div>
                  <div className="col-3">data</div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
