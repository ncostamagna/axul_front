import * as React from "react";
import { useRouter } from "next/router";
import {
  Contact as ContactEntity,
  createContact,
  updateContact,
} from "@/api/apiContact";
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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DAYS, MONTHS, YEARS } from "@/model/contants";
import useContact from "../../hooks/useContact";
import { Date, dateToObject, ObjectToDate } from "@/common/format/date";
import { withAuthSync } from "@/common/auth/auth";
import {
  commonGetStaticProps,
  commonGetStaticPaths,
} from "common/pages/CommonPage";
import { Error } from "@/common/alert/alert";
import { useTranslation } from "next-i18next";
import useSpinner from "@/hooks/useSpinner";
import { withSpinnerSync } from "@/common/spinner/spinner";

const ContactByID = () => {
  const router = useRouter();
  const { t } = useTranslation("main");
  const contStore = useContact((state) => state.contacts);
  const setContStore = useContact((state) => state.setContacts);
  const selected = useContact((state) => state.selected);
  const setSelected = useContact((state) => state.setSelected);

  const spinnerState = useSpinner((state) => state.spinner);
  const enableSpinner = useSpinner((state) => state.enableSpinner);
  const disableSpinner = useSpinner((state) => state.disableSpinner);

  const [contact, setContact] = React.useState<ContactEntity>(
    selected == null
      ? {
          id: "",
          firstname: "",
          lastname: "",
          nickname: "",
          birthday: "",
          phone: "",
          days: 0,
        }
      : contStore[selected]
  );

  const [birthday, setBirthday] = React.useState<Date>(
    dateToObject(contact.birthday)
  );

  const id = router.query.id;

  React.useEffect(() => {
    disableSpinner();
  }, []);

  const handleSave = async () => {
    if (contact.firstname == "") {
      Error(t, "validation.contact.firstname");
      return;
    }

    if (contact.lastname == "") {
      Error(t, "validation.contact.lastname");
      return;
    }

    if (contact.nickname == "") {
      Error(t, "validation.contact.nickname");
      return;
    }

    if (birthday.year == "" || birthday.month == "" || birthday.day == "") {
      Error(t, "validation.contact.birthday");
      return;
    }

    const userID = window.localStorage.getItem("axul_user_id");
    const token = window.localStorage.getItem("axul_token");

    contact.birthday = ObjectToDate(birthday);
    contact.phone = contact.phone.replace(/[ +\-,.]/g, "");
    let fetchData;
    enableSpinner();
    if (contact.id == "") {
      console.log("new");
      fetchData = async () => {
        const cont = await createContact(token, userID, contact);

        return cont;
      };

      fetchData()
        .then((data) => {
          console.log(data);
          let c = contStore;
          c.push(data);
          setContStore(c);
          setSelected(null);

          router.push(`/contacts`);
        })
        .catch(() => {
          disableSpinner();
        })
        .finally(() => {});
    } else {
      const id = contact.id;
      console.log("update");
      fetchData = async () => {
        const cont = await updateContact(token, userID, contact);

        return cont;
      };
      //disableSpinner();
      fetchData()
        .then((data) => {
          if (selected != null) {
            let c = contStore;
            console.log(contact);
            console.log(selected);
            console.log(c[selected]);
            contact.id = id;
            c[selected] = contact;
            setContStore(c);
            setSelected(null);
          }

          router.push(`/contacts`);
        })
        .catch(() => {
          window.localStorage.removeItem("axul_user_id");
          window.localStorage.removeItem("axul_token");
          disableSpinner();
        })
        .finally(() => {});
    }

    console.log(contact);
  };

  const handleBack = async () => {
    enableSpinner();
    setSelected(null);
    router.push(`/contacts`);
  };

  return withSpinnerSync(
    spinnerState,
    <>
      <AppMenu enableSpinner={enableSpinner}></AppMenu>
      <Container>
        <Grid container spacing={2} marginTop={5}>
          <Grid item xs={12} md={6}>
            <TextField
              label="First name"
              variant="outlined"
              fullWidth
              value={contact.firstname}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setContact({ ...contact, firstname: event.target.value });
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Last name"
              variant="outlined"
              fullWidth
              value={contact.lastname}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setContact({ ...contact, lastname: event.target.value });
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="day-label">Day</InputLabel>
              <Select
                labelId="day-label"
                value={birthday.day}
                label="Day"
                onChange={(event: SelectChangeEvent) => {
                  setBirthday({ ...birthday, day: event.target.value });
                }}
              >
                {DAYS.map((item, i) => (
                  <MenuItem key={`1-${i}`} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="month-label">Month</InputLabel>
              <Select
                labelId="month-label"
                value={birthday.month}
                label="Month"
                onChange={(event: SelectChangeEvent) => {
                  setBirthday({ ...birthday, month: event.target.value });
                }}
              >
                {MONTHS.map((item, i) => (
                  <MenuItem key={`2-${i}`} value={item.key}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="year-label">Year</InputLabel>
              <Select
                labelId="year-label"
                value={birthday.year}
                label="Year"
                onChange={(event: SelectChangeEvent) => {
                  setBirthday({ ...birthday, year: event.target.value });
                }}
              >
                {YEARS.map((item, i) => (
                  <MenuItem key={`3-${i}`} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Nickname"
              variant="outlined"
              fullWidth
              value={contact.nickname}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setContact({ ...contact, nickname: event.target.value });
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              value={contact.phone}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setContact({ ...contact, phone: event.target.value });
              }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button variant="contained" fullWidth onClick={handleSave}>
              Save
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleBack}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export const getStaticProps = commonGetStaticProps;

export const getStaticPaths = commonGetStaticPaths;

export default withAuthSync(ContactByID);

/*
<TextField
              label="Birthday"
              type="date"
              fullWidth
              value={contact.birthday}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setContact({ ...contact, birthday: event.target.value });
              }}
            />*/
