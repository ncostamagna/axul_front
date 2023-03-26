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

const columns = [
  { value: "Name", size: { xs: 5 } },
  { value: "Birthday", size: { xs: 3 } },
  { value: "Days", size: { xs: 2 } },
];

const Contact = () => {
  const [filters, setFilters] = useState({
    firstname: "",
    lastname: "",
    month: "",
  });
  const router = useRouter();
  const spinnerState = useSpinner((state) => state.spinner);
  const enableSpinner = useSpinner((state) => state.enableSpinner);
  const disableSpinner = useSpinner((state) => state.disableSpinner);
  const contStore = useContact((state) => state.contacts);
  let values: string[][] = [];
  let id: string[] = [];
  for (const c of contStore) {
    if (c == null) {
      continue;
    }
    values.push([
      `${c.firstname} ${c.lastname}`,
      getDate(c.birthday),
      `${c.days}`,
    ]);
    if (c.id != undefined) {
      id.push(c.id);
    }
  }

  const { t } = useTranslation("main");
  const [contacts, setContacts] = useState<{
    values: string[][];
    id: string[];
  }>({
    values: values,
    id: id,
  });

  const contactState = useContact((state) => state.contacts);
  const setContStore = useContact((state) => state.setContacts);
  const setSelected = useContact((state) => state.setSelected);
  const clearContacts = useContact((state) => state.clearContacts);

  const handleChangeMonth = (event: SelectChangeEvent) => {
    setFilters({ ...filters, month: event.target.value });
  };

  const handleSearch = async () => {
    enableSpinner();
    const fetchData = async () => {
      const users = await getAllContacts(
        window.localStorage.getItem("axul_token"),
        window.localStorage.getItem("axul_user_id"),
        filters.firstname,
        filters.lastname,
        filters.month
      );

      return users;
    };

    fetchData()
      .then((data) => {
        setContStore(data);
        let values: string[][] = [];
        let id: string[] = [];
        for (const c of data) {
          values.push([
            `${c.firstname} ${c.lastname}`,
            getDate(c.birthday),
            `${c.days}`,
          ]);
          if (c.id != undefined) {
            id.push(c.id);
          }
        }

        setContacts({
          values,
          id,
        });
      })
      .catch(() => {
        window.localStorage.removeItem("axul_user_id");
        window.localStorage.removeItem("axul_token");
        router.push(`/login`);
      })
      .finally(() => {
        disableSpinner();
      });
  };

  const handleContactEdit = (id: string) => {
    enableSpinner();
    setSelected(id);
    router.push(`/contacts/${id}`);
  };

  const handleContactDelete = async (id: string) => {
    let contactName;
    for (const v of contactState) {
      if (v.id === id) {
        contactName = `${v.firstname} ${v.lastname}?`;
      }
    }

    const r = await ConfirmDialog(t, `delete.confirm.message`, contactName);

    if (r) {
      enableSpinner();

      console.log("delete");
      const fetchData = async () => {
        const cont = await deleteContact(
          window.localStorage.getItem("axul_token"),
          window.localStorage.getItem("axul_user_id"),
          id
        );

        return cont;
      };
      fetchData()
        .then((data) => {
          const c = contactState.filter((x) => x.id !== id);
          setContStore(c);

          let values: string[][] = [];
          let ids: string[] = [];
          for (const con of c) {
            values.push([
              `${con.firstname} ${con.lastname}`,
              getDate(con.birthday),
              `${con.days}`,
            ]);
            if (con.id != undefined) {
              ids.push(con.id);
            }
          }

          setContacts({
            values,
            id: ids,
          });
        })
        .catch(() => {
          window.localStorage.removeItem("axul_user_id");
          window.localStorage.removeItem("axul_token");
          router.push(`/login`);
        })
        .finally(() => {
          disableSpinner();
        });
    }
    //enableSpinner();
    //setSelected(id);
    //router.push(`/contacts/${id}`);
  };

  const handleContactNew = () => {
    enableSpinner();
    router.push(`/contacts/new`);
  };

  const handleClear = () => {
    clearContacts();
    setContacts({
      values: [],
      id: [],
    });
  };
  const buttons = [
    {
      size: { xs: 1 },
      color: "primary",
      icon: Edit,
      fun: handleContactEdit,
    },
    {
      size: { xs: 1 },
      color: "error",
      icon: DeleteIcon,
      fun: handleContactDelete,
    },
  ];

  useEffect(() => {
    disableSpinner();
  }, []);

  return withSpinnerSync(
    spinnerState,
    <>
      <Head>
        <title>Contacts</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppMenu enableSpinner={enableSpinner}></AppMenu>
      <Container>
        <Grid container spacing={2} marginTop={5}>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="First name"
              variant="outlined"
              fullWidth
              value={filters.firstname}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFilters({ ...filters, firstname: event.target.value });
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Last name"
              variant="outlined"
              fullWidth
              value={filters.lastname}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFilters({ ...filters, lastname: event.target.value });
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filters.month}
                label="Month"
                onChange={handleChangeMonth}
              >
                {MONTHS.map((item, i) => (
                  <MenuItem key={`2-${i}`} value={item.key}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              startIcon={<Search />}
              fullWidth
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="warning"
              startIcon={<Backspace />}
              fullWidth
              onClick={handleClear}
            >
              Clear
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="success"
              startIcon={<Add />}
              fullWidth
              onClick={handleContactNew}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Table
              columns={columns}
              values={contacts.values}
              buttons={buttons}
              id={contacts.id}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export const getStaticProps = commonGetStaticProps;

export default withAuthSync(Contact);
