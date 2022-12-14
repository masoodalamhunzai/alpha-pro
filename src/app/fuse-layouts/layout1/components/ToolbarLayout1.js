import { ThemeProvider, makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import FuseShortcuts from "@fuse/core/FuseShortcuts";
import Hidden from "@material-ui/core/Hidden";
import NavbarToggleButton from "app/fuse-layouts/shared-components/NavbarToggleButton";
import Toolbar from "@material-ui/core/Toolbar";
import UserMenu from "app/fuse-layouts/shared-components/UserMenu";
import clsx from "clsx";
import { memo } from "react";
import { selectToolbarTheme } from "app/store/fuse/settingsSlice";
import { useSelector } from "react-redux";
import EnvSwitch from "../../shared-components/EnvSwitch";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function ToolbarLayout1(props) {
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
  const navbar = useSelector(({ fuse }) => fuse.navbar);
  const toolbarTheme = useSelector(selectToolbarTheme);

  const classes = useStyles(props);

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx(
          classes.root,
          "flex relative z-20 shadow-md",
          props.className
        )}
        color="default"
        style={{ backgroundColor: toolbarTheme.palette.background.paper }}
        position="static"
      >
        <Toolbar className="p-0 min-h-48 md:min-h-64">
          <div className="flex flex-1 px-16">
            {config.navbar.display && config.navbar.position === "left" && (
              <>
                <Hidden mdDown>
                  {(config.navbar.style === "style-3" ||
                    config.navbar.style === "style-3-dense") && (
                    <NavbarToggleButton className="w-40 h-40 p-0 mx-0 menu-icon-rotate-180" />
                  )}

                  {config.navbar.style === "style-1" && !navbar.open && (
                    <NavbarToggleButton className="w-40 h-40 p-0 mx-0 menu-icon-rotate-180" />
                  )}
                </Hidden>

                <Hidden lgUp>
                  <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8 menu-icon-rotate-180" />
                </Hidden>
              </>
            )}

            <Hidden mdDown>
              <FuseShortcuts />
            </Hidden>
          </div>

          <div className="flex items-center px-8 h-full overflow-x-auto">
            {/* <LanguageSwitcher /> */}

            {/* <PublishingEnviromentSwitch /> */}

            {/* <AdjustFontSize /> */}

            {/* <FullScreenToggle /> */}
            <EnvSwitch />
            {/* <FuseSearch />
            <Messages />
            <Inbox /> * /}
    < Notifications />
    {/* <QuickPanelToggleButton /> */}

            <UserMenu />
          </div>

          {config.navbar.display && config.navbar.position === "right" && (
            <>
              <Hidden mdDown>
                {!navbar.open && (
                  <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
                )}
              </Hidden>

              <Hidden lgUp>
                <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
              </Hidden>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout1);
