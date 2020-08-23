import React, {useState, useEffect} from 'react';
//react redux
//import { useSelector } from "react-redux"
//firebase utils
import {createListDocumentAndAddIdToOwner, getEnrolledLists, getListNamesFromListIds} from '../../firebase/firebase.utils';
//material ui
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
//react-window
import { FixedSizeList } from 'react-window';



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
    //const user = useSelector((state) => state.userReducer.user);
    const styles = useStyles();    

    const [newList, setNewList] = useState('');
    const [listNames, setListNames] = useState([]);

    

    const renderRow = (props) => {
        const { index, style } = props;
        console.log(style);
      
        return (
          <ListItem button style={style} key={index}>
            <ListItemText primary={listNames[index]} />
          </ListItem>
        );
    }

    useEffect(() => {
        const getMembersOf = async () => {
            const {membersOf} = await getEnrolledLists();
            const listNames = await getListNamesFromListIds(membersOf);
            await setListNames(listNames);
        }
        getMembersOf();
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        console.log('reached handle submit');
        createListDocumentAndAddIdToOwner(newList);
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
                <IconButton type='submit' className={styles.buttonStyles} color="primary"><AddIcon fontSize='large' className={styles.iconStyles}/></IconButton>
            </form>
            <div >
                <FixedSizeList  height={400} itemSize={44} itemCount={listNames.length}>
                    {renderRow}
                </FixedSizeList>
            </div>
        </div>
        
        
    );
};

export default Lists;