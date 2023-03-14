import * as React from "react";
import { useRouter } from "next/router";
import { Contact as ContactEntity, createContact } from "@/api/contact/api";
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

const ContactByID = () => {
  const router = useRouter();

  const contStore = useContact((state) => state.contacts);
  const setContStore = useContact((state) => state.setContacts);
  const selected = useContact((state) => state.selected);
  const setSelected = useContact((state) => state.setSelected);

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
    console.log(id);
  }, []);
  const handleSave = async () => {
    contact.birthday = ObjectToDate(birthday);
    contact.phone = contact.phone.replace(/[ +-,.]/g, "");
    if (contact.id == "") {
      console.log("new");
      const fetchData = async () => {
        const cont = await createContact(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZiOWIxMDE0LTA1YmUtNGQ1MS1hNjk1LTU5ZTJjYzVlYjJiZCIsInVzZXJuYW1lIjoibmNvc3RhbWFnbmEifQ.eejlImtdvVqGUrPTG4ZyTB7q65VypqbGKhVyepd10OU",
          "6b9b1014-05be-4d51-a695-59e2cc5eb2bd",
          contact
        );

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
        .catch(console.error)
        .finally(() => {});
    }

    console.log(contact);
  };

  const handleBack = async () => {
    setSelected(null);
    router.push(`/contacts`);
  };

  return (
    <>
      <AppMenu></AppMenu>
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
