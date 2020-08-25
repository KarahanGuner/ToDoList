import React, {useState, useEffect} from 'react';
//react redux
import { useDispatch, useSelector } from "react-redux"
import {setRender} from '../../redux/render/render.slice';
//firebase utils
import {getListNameAndListContentFromId, addNewItemToList, deleteItemFromList} from '../../firebase/firebase.utils';
//material ui
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from "react-window";
import Checkbox from "@material-ui/core/Checkbox";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    inputStyles: {
        width: '94%',
        borderRadius: 0
         
    },
    buttonStyles: {
        width: '6%',
        height: '39px',
        margin: 0,
        padding: 0,
        borderRadius: 0
    },
    iconStyles: {
        padding: 0
    },
    settings: {
        paddingRight: 0
    },
    title: {
        flexGrow: 1,
      },
}));



const Contents = () => {
    //hooks
    const [newItem, setNewItem] = useState('');
    const [listName, setListName] = useState('');
    const [content, setContent] = useState([]);
    const [forceEffect, toggleForceEffect] = useState(true); //can force useEffect by toggle'ing forceEffect variable
    //redux
    const dispatch = useDispatch(); 
    const listId = useSelector(state => state.renderReducer.render.contents);

    const styles = useStyles(); 

    useEffect(() => {
        console.log('use effect in CONTENTS component fired');
        const getListData = async () => {
            const {content, listName} = await getListNameAndListContentFromId(listId);
            setListName(listName);
            setContent(content);
        };
        getListData();
    }, [forceEffect, listId]); //put listId just beacuse of the warning it doesnt do anything here.
    
    const handleSubmit = async event => {
        event.preventDefault();
        console.log('reached handle submit');
        await addNewItemToList(listId, newItem);
        setNewItem('');
        toggleForceEffect(!forceEffect);
    }

    const handleChange = event => {
        const newItemName = event.target.value;
        setNewItem(newItemName);
    }

    const renderRow =(props) => {
        const { index, style } = props;
        return (
          <ListItem button style={style} key={index}>
            {/* <Checkbox
              edge="start"
              checked={false}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": index }}
            /> */}
            <ListItemText id={index} primary={content[index]}/>
            <IconButton onClick={async () => {await deleteItemFromList(listId, index); toggleForceEffect(!forceEffect);}} edge="end" aria-label="list item">
                <CloseIcon />
            </IconButton>
          </ListItem>
        );
    };
      
    return (
        <div className='contents'>
            <AppBar color='inherit'  position="static" elevation={0}>
                <Toolbar variant="dense" >
                    <IconButton onClick={() => {dispatch(setRender({lists: true, contents: '', settings: ''}))}} edge="start" color="inherit" aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" className={styles.title}>
                        {listName}
                    </Typography>
                    <IconButton  color="inherit" aria-label="settings">
                        <SettingsIcon/>
                    </IconButton>
                    
                </Toolbar>
            </AppBar>
            {/* <div>{listName}</div> */}
            <FixedSizeList height={400} itemSize={44} itemCount={content.length}>
                {renderRow}
            </FixedSizeList>


            
            <form onSubmit={handleSubmit}>
                <TextField 
                    className={styles.inputStyles} 
                    id="outlined-basic" 
                    label="Add new item..." 
                    variant="outlined" 
                    size='small'
                    name='newItem'
                    value={newItem}
                    onChange={handleChange}
                />
                <IconButton type='submit' className={styles.buttonStyles} color="primary"><AddIcon fontSize='large' className={styles.iconStyles}/></IconButton>
            </form>
        </div>
    )
}

export default Contents;