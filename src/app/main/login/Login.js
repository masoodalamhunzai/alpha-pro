import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import moment from "moment";
import { Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router';
import { useState } from 'react';
import JWTLoginTab from './tabs/JWTLoginTab';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `black`,
    color: theme.palette.primary.contrastText,
  },
  leftSection: {},
  rightSection: {
    backgroundImage: "url('assets/images/books.jpg')",

    background: `#01619b`,
    color: theme.palette.primary.contrastText,
  },
  logo: {
    // height: 40,
    width: 150,
  },
}));

function Login() {
  const history = useHistory();
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  return (
    <div
      className={clsx(
        classes.root,
        'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl shadow-2xl overflow-hidden"
      >
        <div
          className={clsx(
            classes.rightSection,
            'hidden md:flex flex-1 lg-col-6 md-col-6 items-center justify-end'
          )}
        >
          <div className="max-w-320">
            {/* <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <Typography
                variant="h3"
                color="inherit"
                className="font-semibold leading-tight"
              >
                Welcome <br />
                to the <br /> MEDIREMOTE
              </Typography>
            </motion.div> */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <Typography variant="subtitle1" color="inherit" className="mt-32">
                An all-in-one platform that lets content authors create, customize, preview and
                manage intractive assessment content with ease.
              </Typography>
            </motion.div>
          </div>
        </div>
        <Card
          className={clsx(
            classes.leftSection,
            'md:flex flex-1 flex flex-col w-full justify-start shadow-0'
          )}
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center mb-48">
                <img
                  className={classes.logo}
                  src="assets/images/logos/OBEASSES_logos_black.png"
                  alt="logo"
                />
              </div>
            </motion.div>

            <JWTLoginTab />
            {/* <div className="flex flex-col items-center justify-center pt-32 pb-24">
              <Link
                className="font-normal font-semibold text-14"
                to="/forgotPassword"
              >
                Forgot your password
              </Link>
            </div> */}
          </CardContent>

          <div className="flex items-center justify-start wrap flex-wrap pb-32 pl-20">
            <div>
              <span className="font-normal mr-8 pr-8 pb-8">Developer Reference</span>
            </div>

            <div>
              <span className="font-normal mr-8 pr-8 pb-8">Developer Demos</span>
            </div>

            <div>
              <span className="font-normal mr-8 pr-8 pb-8">Author Guide</span>
            </div>

            <div>
              <span className="font-normal mr-8 pr-8 pb-8">API Status</span>
            </div>

            <div>
              <span className="font-normal mr-8 pr-8 pb-8">
                Visit <Link href="https://www.ealpha.info/"> OBEASSES</Link>
              </span>
            </div>

            <div>
              <span className="font-normal mr-8 pr-8 pb-8">Privacy Policy</span>
            </div>

            <div>
              <span className="font-normal mr-8 pr-8 pb-8">Copyright © 2022 OBEASSES</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default Login;
