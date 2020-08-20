import React, {useState} from 'react';
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
    const styles = useStyles();    

    const [newList, setNewList] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        
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
                <IconButton className={styles.buttonStyles} color="primary"><AddIcon fontSize='large' className={styles.iconStyles}/></IconButton>
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