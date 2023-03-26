import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

type Props = {
  enableSpinner?: Function;
};

const AppMenu = (props: Props) => {
  const { t } = useTranslation("main");
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [language, setLanguage] = React.useState<string>(router.locale || "en");

  const pages = [
    {
      label: t("menu.contacts"),
      url: "/contacts",
    },
    { label: t("menu.events"), url: "/events" },
    { label: t("menu.templates"), url: "/templates" },
  ];

  const handleLocaleChange = (event: any) => {
    const value = event.target.value;

    setLanguage(value);
    router.push(router.route, router.asPath, {
      locale: value,
    });
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  const handleLogout = (): void => {
    window.localStorage.removeItem("axul_user_id");
    window.localStorage.removeItem("axul_token");
    router.push("/login");
    setAnchorElNav(null);
  };

  const settings = [
    { label: t("menu.profile"), click: handleCloseNavMenu },
    { label: t("menu.password"), click: handleCloseNavMenu },
    { label: t("menu.logout"), click: handleLogout },
  ];

  const handlerClick = (event: any, url: string) => {
    if (props.enableSpinner != undefined && router.pathname != url) {
      props.enableSpinner();
    }

    router.push(url);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            className="pointer"
            variant="h6"
            noWrap
            component="a"
            onClick={(e) => handlerClick(e, "/home")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "ubuntu",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={(e) => handlerClick(e, page.url)}
                  sx={{
                    fontFamily: "ubuntu",
                  }}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1, ml: 4 }} />
          <Typography
            className="pointer"
            variant="h5"
            noWrap
            component="a"
            onClick={(e) => handlerClick(e, "/home")}
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "ubuntu",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={(e) => handlerClick(e, page.url)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontFamily: "ubuntu",
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, mr: 1 }}>
            <FormControl fullWidth className="language-menu">
              <Select
                value={language}
                onChange={handleLocaleChange}
                variant="outlined"
              >
                <MenuItem value="es">🇪🇦</MenuItem>
                <MenuItem value="en">🏴󠁧󠁢󠁥󠁮󠁧󠁿</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.label}
                  onClick={setting.click}
                  sx={{
                    fontFamily: "ubuntu",
                  }}
                >
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppMenu;
