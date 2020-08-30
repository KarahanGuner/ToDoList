import React, {useEffect, useState} from 'react';
//react redux
import { useDispatch, useSelector } from "react-redux"
import {setRender} from '../../redux/render/render.slice';
//firebase utils
import {getListDataFromId, getMembersNameFromMembersId, addNewMemberToList, deleteMemberFromList, leaveTheList} from '../../firebase/firebase.utils';
//material ui
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from "react-window";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

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
    leaveButton: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    }
}));

const Settings = () => {
    //hooks
    const [newMember, setNewMember] = useState(''); //for handleChange
    const [membersId, setMembersId] = useState([]);
    const [membersName, setMembersName] = useState([]);
    const [listName, setListName] = useState('');
    const [owner, setOwner] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [forceEffect, toggleForceEffect] = useState(true); //can force useEffect by toggle'ing forceEffect variable
    //redux
    const dispatch = useDispatch();
    const listId = useSelector(state => state.renderReducer.render.settings);
    const userId = useSelector(state => state.userReducer.user.id);

    const styles = useStyles();
    useEffect(() => {
        console.log('use effect in SETTINGS component fired');
        const getListData = async () => {
            const {members, listName, owner} = await getListDataFromId(listId);
            setMembersId(members);
            setListName(listName  + ' -');
            setOwner(owner);
            //this part checks if you are the user
            if(userId == owner){
                setIsOwner(true);
            }
            const memberNames = await getMembersNameFromMembersId(members);
            setMembersName(memberNames);

        };
        getListData();
        
        
    }, [forceEffect, listId, userId]);
    
    const handleSubmit = async event => {
        event.preventDefault();
        console.log('reached handle submit in settings');
        await addNewMemberToList(newMember, listId);
        setNewMember('');
        toggleForceEffect(!forceEffect);
    };

    const handleChange = (event) => {
        const newMemberName = event.target.value;
        setNewMember(newMemberName);
    };

    const handleDeleteMember = async (index) => {
        const memberId = membersId[index];
        await deleteMemberFromList(memberId, listId);
        toggleForceEffect(!forceEffect);
    };
    
    const handleLeaveTheList = async () => {
        await leaveTheList(userId, listId);
        dispatch(setRender({lists: true, contents: '', settings: ''}));
    }


    const renderRow =(props) => {
        const { index, style } = props;

        return (
          <ListItem button style={style} key={index}>
            <ListItemText id={index} primary={membersName[index]}/>
            {
                isOwner && index!=0 ? <IconButton onClick={async () => {await handleDeleteMember(index)}} edge="end" aria-label="list item">
                            <CloseIcon />
                        </IconButton> : null
            }
            
          </ListItem>
        );
    };

    return (
        <div>
            <AppBar color='inherit'  position="static" elevation={0}>
                <Toolbar variant="dense" >
                    <IconButton onClick={() => {dispatch(setRender({lists: false, contents: listId, settings: ''}))}} edge="start" color="inherit" aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6">
                        {listName} List Settings
                    </Typography>
                </Toolbar>
            </AppBar>
            <form onSubmit={handleSubmit}>
                <TextField 
                    className={styles.inputStyles} 
                    id="outlined-basic" 
                    label="Add new member with their email..." 
                    variant="outlined" 
                    size='small'
                    name='newMember'
                    value={newMember}
                    onChange={handleChange}
                    required
                />
                <IconButton type='submit' className={styles.buttonStyles} color="primary"><AddIcon fontSize='large' className={styles.iconStyles}/></IconButton>
            </form>
            <FixedSizeList height={window.innerHeight- 150} itemSize={44} itemCount={membersName.length}>
                {renderRow}
            </FixedSizeList>
            <div className={styles.leaveButton}>
                <Button variant="contained" color="primary" size="large" onClick={async () => {handleLeaveTheList();}}>
                    LEAVE THE LIST
                </Button>
            </div>
        </div>
        
    )
}

export default Settings;