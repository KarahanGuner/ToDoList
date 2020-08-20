import React, {useState} from 'react';
//react redux
import { useSelector } from "react-redux"
//firebase utils
import {createListDocumentAndAddIdToOwner} from '../../firebase/firebase.utils';
//material ui
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


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
    }
  }));

const Lists = () => {
    const user = useSelector((state) => state.userReducer.user);
    const styles = useStyles();    

    const [newList, setNewList] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        createListDocumentAndAddIdToOwner(newList, user);
    }

    const handleChange = event => {
        const newListName = event.target.value;
        setNewList(newListName);
    }

    return (
        <div className='lists'>
            <form onSubmit={handleSubmit}>
                <TextField 
                    className={styles.inputStyles} 
                    id="outlined-basic" 
                    label="Create a new list..." 
                    variant="outlined" 
                    size='small'
                    name='newList'
                    value={newList}
                    onChange={handleChange}
                />
                <button>+</button>
            </form>
        <List component="nav" aria-label="secondary mailbox folder">
            <ListItem button>
                <ListItemText primary="Trash" />
            </ListItem>
        </List>
        
        </div>
        
        
    );
};

export default Lists;