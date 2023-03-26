import { Grid, Container, Typography } from "@mui/material";
import { Inter } from "@next/font/google";
import AppMenu from "@/components/Menu/menu";
import { useState, useEffect } from "react";
import { getNextBirthday, Contact } from "@/api/apiContact";
import { getDate } from "@/common/format/date";
import style from "../styles/Home.module.css";
import { useTranslation } from "next-i18next";
import { commonGetStaticProps } from "common/pages/CommonPage";
import { useRouter } from "next/router";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import useSpinner from "../hooks/useSpinner";
import { withAuthSync } from "@/common/auth/auth";
import { withSpinnerSync } from "@/common/spinner/spinner";

const Home = () => {
  const { locale, locales, defaultLocale } = useRouter();
  console.log(locale, locales, defaultLocale);

  const { t } = useTranslation("main");
  const dates = [
    { label: t("dates.today"), days: 0 },
    { label: t("dates.tomorrow"), days: 1 },
    { label: t("dates.overmorrow"), days: 2 },
    { label: t("dates.afterOvermorrow"), days: 3 },
  ];

  const spinnerState = useSpinner((state) => state.spinner);
  const enableSpinner = useSpinner((state) => state.enableSpinner);
  const disableSpinner = useSpinner((state) => state.disableSpinner);

  const [users, setUsers] = useState(
    new Map<number, Contact[]>([
      [0, []],
      [1, []],
      [2, []],
      [3, []],
    ])
  );

  const getGridSize = (day: number): number => {
    if (day == 0) {
      return 10;
    }
    return 12;
  };

  const sendMessage = (name: string, phone: string): string => {
    return `whatsapp://send?text=${name}%20muuuy%20feliz%20cumple!!%0AEspero%20que%20lo%20disfrutes%20al%20maximo%20en%20tu%20dia!!%0ATe%20deseo%20lo%20mejor%20para%20este%20nuevo%20año!!%0AMuchos%20exitooos!!%20:)&phone=${phone}`;
  };
  useEffect(() => {
    enableSpinner();
    const fetchData = async () => {
      let userMap = new Map<number, Contact[]>([
        [0, []],
        [1, []],
        [2, []],
        [3, []],
      ]);
      const users = await getNextBirthday(
        4,
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZiOWIxMDE0LTA1YmUtNGQ1MS1hNjk1LTU5ZTJjYzVlYjJiZCIsInVzZXJuYW1lIjoibmNvc3RhbWFnbmEifQ.eejlImtdvVqGUrPTG4ZyTB7q65VypqbGKhVyepd10OU",
        "6b9b1014-05be-4d51-a695-59e2cc5eb2bd"
      );

      for (const user of users) {
        userMap.get(user.days)?.push(user);
        console.log(user);
      }
      console.log(userMap);
      setUsers(userMap);
      disableSpinner();
    };

    fetchData().catch(console.error);
  }, []);

  return withSpinnerSync(
    spinnerState,
    <>
      <AppMenu enableSpinner={enableSpinner}></AppMenu>
      <Container>
        <Grid container spacing={3}>
          {dates.map((date) => (
            <Grid
              item
              xs={12}
              md={3}
              key={date.label}
              marginBottom={{
                lg: 5,
                md: 1,
              }}
            >
              <Typography
                variant="h6"
                component="p"
                align="center"
                marginTop={2}
                className={style.headerTitle}
              >
                {date.label}
              </Typography>
              <Grid container className={style.headerSectin}>
                {users.get(date.days)?.map((user) => (
                  <Grid
                    item
                    key={`2-${user.id}`}
                    xs={12}
                    className={style.personBirtday}
                  >
                    <Grid container className={style.contentBirthday}>
                      {date.days == 0 && (
                        <Grid item xs={2} className={style.contentWhatsapp}>
                          <a href={sendMessage(user.nickname, user.phone)}>
                            <WhatsAppIcon />
                          </a>
                        </Grid>
                      )}

                      <Grid item xs={getGridSize(date.days)}>
                        <Typography
                          variant="subtitle1"
                          component="p"
                          sx={{
                            fontFamily: "ubuntu",
                          }}
                        >
                          {`${user.firstname} ${user.lastname}`}
                        </Typography>
                        <Typography
                          variant="body1"
                          component="p"
                          sx={{
                            fontFamily: "ubuntu",
                          }}
                        >
                          {getDate(user.birthday)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export const getStaticProps = commonGetStaticProps;

export default withAuthSync(Home);
