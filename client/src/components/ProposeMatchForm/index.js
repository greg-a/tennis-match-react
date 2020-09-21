import React from "react";
import { TextField, Button, Grid } from '@material-ui/core';

function ProposeMatchForm(props) {
    return (
        <Grid item xs={12}>
            <Grid item xs={12} style={{textAlign: "center"}}>
            <h3>Search Date For Players</h3>
            </Grid>
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label="Date"
                            id="newDate"
                            name="newDate"
                            type="date"
                            value={props.newDate}
                            onChange={props.handleInputChange}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{shrink: true}}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={props.handleFormSubmit}>
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid item xs={12} style={{textAlign: "center"}}>
                <p>{props.instructions}</p>
            </Grid>
        </Grid>
        
    )
}

export default ProposeMatchForm;