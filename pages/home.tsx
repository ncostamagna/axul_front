import { Grid, Container, Typography } from "@mui/material";
import { Inter } from "@next/font/google";
import AppMenu from "@/components/Menu/menu";
import { useState, useEffect } from "react";
import { getNextBirthday, User } from "@/api/contact/api";
const inter = Inter({ subsets: ["latin"] });

const dates = [
  { label: "Today", days: 0 },
  { label: "Tomorrow", days: 1 },
  { label: "Overmorrow", days: 2 },
  { label: "After Overmorrow", days: 3 },
];

export default function Home() {
  const [users, setUsers] = useState(
    new Map<number, User[]>([
      [0, []],
      [1, []],
      [2, []],
      [3, []],
    ])
  );
  useEffect(() => {
    const fetchData = async () => {
      let userMap = new Map<number, User[]>([
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
        userMap.get(user.days).push(user);
        console.log(user);
      }
      console.log(userMap);
      setUsers(userMap);
    };

    fetchData().catch(console.error);
  }, []);

  console.log(users);
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
                {users.get(date.days).map((user) => (
                  <Grid item key={user.id}>
                    <Typography variant="subtitle1" component="p">
                      {`${user.firstname} ${user.lastname}`}
                    </Typography>
                    <Typography variant="body1" component="p">
                      11/10
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
