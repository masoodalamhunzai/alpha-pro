import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";


const useStyles = makeStyles({
    root: {
        fontSize: "1rem",
    },
    cancelBtn: {
        "&.MuiButton-root": {
            letterSpacing: 0,
            textTransform: 'capitalize',
            fontSize: "14px",
            borderRadius: "25px",
            padding: "2px 25px",
            backgroundColor: "gray",
            "&:hover": {
                backgroundColor: "black",
            },
        },
    },
    continueBtn: {
        "&.MuiButton-root": {
            letterSpacing: 0,
            textTransform: 'capitalize',
            fontSize: "14px", borderRadius: "25px", padding: "2px 25px"
        },
    }
});
const SelectUserSite = () => {
    const classes = useStyles();
    return (
        <div>
            <Box
                sx={{
                    "& .MuiCard-root": {
                        background: "transparent",
                        boxShadow: "none",
                        display: "flex",
                        alignItems: "self-start",
                        justifyContent: "center",
                    },
                    width: "100%",
                    "& .MuiFormControlLabel-label": {
                        margin: "10px auto",
                        height: "65px",
                    },
                }}
            >
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <Card
                            sx={{
                                minWidth: 300,
                                minHeight: 300,
                                height: "100%",
                                display: "flex",
                                alignItems: "start",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{ margin: "10px 5px", fontWeight: "bold" }}
                            >
                                Select site(s) the user will access*
                            </Typography>
                            <CardContent sx={{ width: "100%" }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label={
                                                <img
                                                    className="logo-icon w-full h-full"
                                                    src="assets/images/eAlpha_03.png"
                                                    alt="logo"
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label={
                                                <img
                                                    className="logo-icon w-full h-full mt-12"
                                                    src="assets/images/eAlpha_05.png"
                                                    alt="logo"
                                                />
                                            }
                                        />
                                    </FormGroup>
                                </Box>
                            </CardContent>
                            <div className="flex justify-between mt-10 w-7/12">
                                <Button
                                    variant="contained"
                                    size="medium"
                                    className={classes.continueBtn}
                                >
                                    Continue
                                </Button>
                                <Button
                                    className={classes.cancelBtn}

                                    variant="contained"
                                    size="medium"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
export default SelectUserSite;