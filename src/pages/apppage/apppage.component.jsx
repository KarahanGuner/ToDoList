import React from 'react';
import Lists from '../../components/lists/lists.component';
import Grid from '@material-ui/core/Grid';


const AppPage = () => {

    return (
        <Grid container>
            <Grid item xs={false} sm={2}></Grid>
            <Grid item xs={12} sm={8}>
                <Lists/>
            </Grid>
            <Grid item xs={false} sm={2}></Grid>
        </Grid>
        
    )
};

export default AppPage;