import { useEffect, useState } from "react";
import Head from "next/head";
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
import { ConfirmDialog } from "@/common/alert/alert";
import { Edit } from "@mui/icons-material";
import Table from "@/components/DataGrid/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import Search from "@mui/icons-material/Search";
import Add from "@mui/icons-material/Add";
import Backspace from "@mui/icons-material/Backspace";
import { MONTHS } from "@/model/contants";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { withAuthSync } from "@/common/auth/auth";
import { getAllContacts, deleteContact } from "@/api/apiContact";
import { getDate } from "@/common/format/date";
import { useRouter } from "next/router";
import { commonGetStaticProps } from "common/pages/CommonPage";
import useContact from "../hooks/useContact";
import useSpinner from "../hooks/useSpinner";
import { withSpinnerSync } from "@/common/spinner/spinner";
import { useTranslation } from "next-i18next";
import { getProfile, Login as LoginEntity, User } from "@/api/apiUser";

const Profile = () => {
  const router = useRouter();
  const spinnerState = useSpinner((state) => state.spinner);
  const enableSpinner = useSpinner((state) => state.enableSpinner);
  const disableSpinner = useSpinner((state) => state.disableSpinner);
  const [user, setUser] = useState<User>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const { t } = useTranslation("main");

  useEffect(() => {
    const fetchData = async () => {
      const cont = await getProfile(
        window.localStorage.getItem("axul_token"),
        window.localStorage.getItem("axul_user_id")
      );

      return cont;
    };

    enableSpinner();
    fetchData()
      .then((data: LoginEntity) => {
        console.log(data);
        setUser(data.user);
        disableSpinner();
      })
      .catch(() => {
        window.localStorage.removeItem("axul_user_id");
        window.localStorage.removeItem("axul_token");
        disableSpinner();
      })
      .finally(() => {});
  }, []);

  return withSpinnerSync(
    spinnerState,
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <AppMenu enableSpinner={enableSpinner}></AppMenu>
      <Container>
        <Grid container spacing={2} marginTop={5}>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              fullWidth
              value={user.username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUser({ ...user, username: event.target.value });
              }}
              disabled={true}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="language-selector-label">Language</InputLabel>
              <Select
                labelId="language-selector-label"
                id="language-selector"
                value="en"
                label="Language"
              >
                <MenuItem value="en"> English </MenuItem>
                <MenuItem value="es"> Spanish </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="First name"
              variant="outlined"
              fullWidth
              value={user.firstname}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUser({ ...user, firstname: event.target.value });
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Last name"
              variant="outlined"
              fullWidth
              value={user.lastname}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUser({ ...user, lastname: event.target.value });
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              value={user.email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUser({ ...user, email: event.target.value });
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              fullWidth
              value={user.phone}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUser({ ...user, phone: event.target.value });
              }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button variant="contained" startIcon={<Search />} fullWidth>
              Save
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export const getStaticProps = commonGetStaticProps;

export default withAuthSync(Profile);
