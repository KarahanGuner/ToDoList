import React from 'react';

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


const Contents = () => {
    const [newItem, setNewItem] = useState('');

    const styles = useStyles();  
    
    const handleSubmit = event => {
        event.preventDefault();
        console.log('reached handle submit');
        
    }

    const handleChange = event => {
        const newItemName = event.target.value;
        setNewItem(newItemName);
    }

    return (
        <div className='contents'>
            <form onSubmit={handleSubmit}>
                <TextField 
                    className={styles.inputStyles} 
                    id="outlined-basic" 
                    label="Add new item..." 
                    variant="outlined" 
                    size='small'
                    name='newList'
                    value={newList}
                    onChange={handleChange}
                />
                <IconButton type='submit' className={styles.buttonStyles} color="primary"><AddIcon fontSize='large' className={styles.iconStyles}/></IconButton>
            </form>
        </div>
    )
}

export default Contents;