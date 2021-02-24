import React from "react";
import { Grid, Fab} from "@material-ui/core";
import Iframe from 'react-iframe';
import {MTxt, MChap, MImg, MParg, MEq} from "./typography_short"
import CodePopper from './components/CodePopper';

import Icon from '@mdi/react'
import useStyles from "./styles";

import {
    mdiSettings as SettingsIcon,
    mdiChartLine as TimelineIcon,
    mdiKeyboard as KeyboardIcon
} from '@mdi/js'
import img1 from "../../images/modules/2_2_pic1.jpg";
import img2 from "../../images/modules/2_2_pic2.jpg";

const fabStyle = {
    right: "3%",
    position: 'fixed',
    zIndex: 100
};

const Mod2_2_check = () => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'add-section-popover' : undefined;
    const handleClick = event => {
        setAnchorEl(open ? null : event.currentTarget)
    };

    return(
    <>
        <Fab
            color="primary"
            aria-label="settings"
            onClick={e => handleClick(e)}
            className={classes.changeThemeFab}
            style={fabStyle}
        >
            <Icon  path={KeyboardIcon} size={1} color="#fff" />
        </Fab>
        <CodePopper
            id={id}
            open={open}
            anchorEl={anchorEl}
        />

        <MChap>
            2.2. Виртуальная среда.
        </MChap>
        <MParg>
            Задача:
        </MParg>
        <MTxt>
            Добраться до красного кристалла, расположенного в тоннеле, затем, вернуться в исходную позицию.
        </MTxt>
        <MParg>
            Управление:
        </MParg>

        <Grid container spacing={1}>
            <Grid item xs={5} md={5}>
                <MTxt>
                    <p>
                    1) Управление с клавиатуры:<br/>
                    </p>
                    W - идти вперед		<br/>
                    A - поворот налево на 90°<br/>	
                    D - поворот направо на 90°	<br/>	
                    Space - вернуться в исходное положение	<br/>
                </MTxt>
            </Grid>
            <Grid item xs={5} md={5}>
                <MTxt>
                    <p>
                    2) Управление через редактор кода:	<br/>
                    </p>
                        Преамбула:	<br/> 
                        from robot.robot import Robot	<br/> 
                        robot = Robot("1")	<br/> 	<br/> 
                    <p>
                        Доступные команды:	<br/> 
                        robot.move() - идти вперед	<br/> 
                        robot.rotate_left() - поворот налево на 90°	<br/> 
                        robot.rotate_right() - поворот направо на 90°	<br/> 
                        robot.reset() - возвращает робота на исходную позицию	<br/> 
                    </p>
                </MTxt>
            </Grid>
        </Grid>
        <MParg>
            Пример готового кода
        </MParg>
        <MTxt>
            Пример кода, который позволит роботу повернуть налево, пройти 3 шага, повернуть направо и пройти еще 2 шага.<br/>
            <div style={{background: " #f0f0f0",  overflow: "auto", width: "auto", border: "solid gray", borderWidth: ".1em .1em .1em .8em", padding: ".2em .6em"}}>
                <pre style={{margin: " 0",  lineHeight: " 125%"}}>
                    <span style={{color: " #007020",  fontWeight: " bold"}}>from </span> 
                    <span style={{color: " #0e84b5",  fontWeight: " bold"}}>robot.robot </span> 
                    <span style={{color: " #007020",  fontWeight: " bold"}}>import </span> Robot <br/>

                    robot <span style={{color: "#666666"}}>=</span> Robot(<span style={{color: "#4070a0"}}>"1"</span>)<br/>
                    robot<span style={{color: "#666666"}}>.</span>reset()<br/>
                    robot<span style={{color: "#666666"}}>.</span>rotate_left()<br/>
                    robot<span style={{color: " #666666"}}>.</span>move()<br/>
                    robot<span style={{color: " #666666"}}>.</span>move()<br/>
                    robot<span style={{color: " #666666"}}>.</span>move()<br/>
                    robot<span style={{color: " #666666"}}>.</span>rotate_right()<br/>
                    robot<span style={{color: " #666666"}}>.</span>move()<br/>
                    robot<span style={{color: " #666666"}}>.</span>move()<br/>
                </pre>
            </div>
        </MTxt>
        <Iframe url="http://79.143.25.41/venv"
        frameBorder="0"
        width="100%"
        height="700px"
        id="myId"
        className={classes.virtualEnv}
        display="initial"
        position="relative"/>
    </>
);
}

export default Mod2_2_check
