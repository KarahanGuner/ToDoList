import React, {useState, useEffect} from 'react';
//react redux
import { useDispatch } from "react-redux"
import {setRender} from '../../redux/render/render.slice';
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
        width: '92%',
        borderRadius: 0
         
    },
    buttonStyles: {
        width: '8%',
        height: '39px',
        margin: 0,
        padding: 0,
        borderRadius: 0
    },
    iconStyles: {
        padding: 0
    },
    formPositionStyles: {
        marginTop: '5px',
    }

}));



const Lists = () => {
    const dispatch = useDispatch();

    const styles = useStyles();    
    console.log('lists component rerendered');
    const [newList, setNewList] = useState('');
    const [listNames, setListNames] = useState([]);
    const [listIds, setListIds] = useState([]);
    const [forceEffect, toggleForceEffect] = useState(true); //can force useEffect by toggle'ing forceEffect variable

    const renderRow = (props) => {
        const { index, style } = props;
      
        return (
          <ListItem button style={style} key={index}>
            <ListItemText onClick={() => {dispatch(setRender({lists: false, contents: listIds[index], settings: ''}))}} primary={listNames[index]} />
          </ListItem>
        );
    }

    useEffect(() => {
        console.log('use effect in LISTS component fired');
        const getMembersOf = async () => {
            const {membersOf} = await getEnrolledLists();
            setListIds(membersOf);  
            const listNames = await getListNamesFromListIds(membersOf);
            setListNames(listNames);
        }
        getMembersOf();
    }, [forceEffect]);

    const handleSubmit = async event => {
        event.preventDefault();
        console.log('reached handle submit');
        await createListDocumentAndAddIdToOwner(newList);
        await setNewList('');
        await toggleForceEffect(value => !value);
    }

    const handleChange = event => {
        const newListName = event.target.value;
        setNewList(newListName);
    }

    return (
        <div className='lists'>
            <div className={styles.formPositionStyles}>
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
                        required
                    />
                    <IconButton type='submit' className={styles.buttonStyles} color="primary"><AddIcon fontSize='large' className={styles.iconStyles}/></IconButton>
                </form>
            </div>
            <div >
                <FixedSizeList  height={400} itemSize={44} itemCount={listNames.length}>
                    {renderRow}
                </FixedSizeList>
            </div >
        </div>
        
        
    );
};

export default Lists;