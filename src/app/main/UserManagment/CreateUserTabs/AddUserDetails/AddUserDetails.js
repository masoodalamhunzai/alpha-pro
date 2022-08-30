import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
    LocalPhone as LocalPhoneIcon,
    AccountBalance as AccountBalanceIcon,
    Upload as UploadIcon,
    AccountCircle as AccountCircleIcon,
} from '@material-ui/icons';
import IconButton from '@mui/material/IconButton';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
    root: {
        fontSize: "1rem",
        "&.MuiContainer-root": {
            maxWidth: "55%",
            margin: 0,
        },
        "& .MuiInputBase-input": {
            backgroundColor: "#fff",
            textAlign: 'start'
        },
        "& .MuiButton-root": {
            fontWeight: "700",
            borderRadius: "1.6rem",
            margin: "2rem 0",
            padding: "1rem 2rem",
            fontSize: "1rem",
        },
        "& .MuiFormControlLabel-label": {
            fontSize: "1.2rem",
            margin: "1rem 0",
        },
        '& .MuiFormControl-root': {
            margin: '1rem 0',
            width: '90%',
        }
    },
    continueBtn: {
        "&.MuiButton-root": {
            backgroundColor: "#3287FB",
        },
    },
    cancelBtn: {
        "&.MuiButton-root": {
            backgroundColor: "#ACACAC",
        },
    },
    formInput: {
        '&.MuiBox-root': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'

        },
    }
});

function AddUserDetailsTab() {
    const [organization, setOrganization] = useState("");

    const handleChange = (event) => {
        setOrganization(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const classes = useStyles();
    return (
        <Container
            classes={{
                root: classes.root,
            }}
            component="main"
            maxWidth="xs"
            className="shadow-md rounded-md"
        >
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ my: 4, width: '100%' }}
                >
                    <Box className={classes.formInput}>
                        <Icon color="action" className="text-gray-600 mr-8">email</Icon>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                    </Box>
                    <Box className={classes.formInput}>
                        <Icon color="action" className="text-gray-600 mr-8">assignment</Icon>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="First name"
                            label="first Name"
                            type="text"
                            id="name"
                            autoComplete="current-password"
                        />
                    </Box>
                    <Box className={classes.formInput}>
                        <Icon color="action" className="text-gray-600 mr-8">assign</Icon>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Last name"
                            label="Last Name"
                            type="text"
                            id="name"
                            autoComplete="current-password"
                        />
                    </Box>
                    <Box className={classes.formInput}>
                        <LocalPhoneIcon className="text-gray-600 mr-8" />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Phone"
                            label="Phone"
                            type="number"
                            id="name"
                            autoComplete="current-password"
                        />
                    </Box>
                    <Box className={classes.formInput}>
                        <AccountBalanceIcon className="text-gray-600 mr-8" />
                        <FormControl fullWidth>
                            <InputLabel id="organization-dropdown">Organization</InputLabel>
                            <Select
                                labelId="organization-dropdown"
                                id="organizationDropdown"
                                value={organization}
                                label="organization"
                                onChange={handleChange}
                            >
                                <MenuItem value={"eAlpha1"}>eAlpha1</MenuItem>
                                <MenuItem value={"eAlpha2"}>eAlpha2</MenuItem>
                                <MenuItem value={"eAlpha3"}>eAlpha3</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "rgb(128 128 128)",
                            fontWeight: 700,
                            ml: 10,
                            mt: 4,
                            mb: 1,
                            textTransform: "capitalize",
                        }}
                    >
                        Photo upload
                    </Typography>
                    <Box className="flex items-center mb-24">
                        <AccountCircleIcon />
                        <Box sx={{ height: '7rem' }} className="border-slate-700 border-2 border-solid w-1/4 bg-white flex items-center justify-center ml-32">
                            <input hidden accept="image/*" type="file" />
                            <Icon color="action" className="text-gray-600 mr-8">upload</Icon>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            className={classes.continueBtn}
                        >
                            continue
                        </Button>
                        <Button
                            type="continue"
                            variant="contained"
                            className={classes.cancelBtn}
                        >
                            cancel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default AddUserDetailsTab;
