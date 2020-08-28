import React from 'react';
import Lists from '../../components/lists/lists.component';
import Contents from '../../components/contents/contents.component';
import Settings from '../../components/settings/settings.component';
//react-redux
import { useSelector } from "react-redux";

//material-ui
import Grid from '@material-ui/core/Grid';


const AppPage = () => {
    const chooseRender = useSelector((state) => state.renderReducer.render);
    console.log('this is render in apppage = ' + chooseRender.contents);
    return (
        <Grid container>
            <Grid item xs={false} sm={2}></Grid>
            <Grid item xs={12} sm={8}>
                { chooseRender.lists ? <Lists/> : null }
                { chooseRender.contents ? <Contents/> : null }
                { chooseRender.settings ? <Settings/> : null }
            </Grid>
            <Grid item xs={false} sm={2}></Grid>
        </Grid>
        
    )
};

export default AppPage;