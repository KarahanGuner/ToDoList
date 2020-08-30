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
        <div>
            
            { chooseRender.lists ? <Lists/> : null }
            { chooseRender.contents ? <Contents/> : null }
            { chooseRender.settings ? <Settings/> : null }
            
        </div>
    )
};

export default AppPage;