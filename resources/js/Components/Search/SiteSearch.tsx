import React from "react";
import styles from "./styles.module.scss";

import {
    Box,
    FormControl,
    InputLabel,
    Input,
    TextField,
    InputAdornment,
} from "@mui/material"
import {AccountCircle} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';


const SiteSearch: React.FC<{customColor?: boolean}> = ({customColor = false}) => {
    return(
        <Box sx={{ '& > :not(style)': { m: 1, marginLeft: 2, marginRight: 2 } }} dir={document.dir}>
            <FormControl>
                {/*<InputLabel htmlFor="search-icon" color="secondary">*/}
                {/*    Search*/}
                {/*</InputLabel>*/}
                <Input
                    id="search-icon"
                    color="secondary"
                    className={customColor? styles.inputStyle : ''}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon className={customColor? styles.iconColor : ''}/>
                        </InputAdornment>
                    }
                />
            </FormControl>
            {/*<TextField*/}
            {/*    id="search-icon"*/}
            {/*    size="small"*/}
            {/*    margin="dense"*/}

            {/*    // label="TextField"*/}
            {/*    InputProps={{*/}
            {/*        color: "secondary",*/}
            {/*        sx: {borderRadius: '999px'},*/}
            {/*        startAdornment: (*/}
            {/*            <InputAdornment position="start">*/}
            {/*                <SearchIcon />*/}
            {/*            </InputAdornment>*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*    variant="outlined"*/}
            {/*/>*/}
            {/*<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>*/}
            {/*    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />*/}
            {/*    <TextField id="input-with-sx" label="With sx" variant="standard" />*/}
            {/*</Box>*/}
        </Box>
    );
}

export default SiteSearch;
