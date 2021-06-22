import React from 'react';
import {Card, CardContent,Typography} from '@material-ui/core'
import './InfoBox.css'
function InfoBox({title, isRed, isYellow, cases, active, total, ...props}) {
    return (
        <Card  onClick={props.onClick} 
        className={`infoBox ${active && "infoBox--selected"} ${
            isRed && "infoBox--red"} ${isYellow && "infoBox--yellow"}`}
        >
            <CardContent className="infoBoxContent">
                <Typography className="infoBox__title" color="textsecondary">
                    {title}
                </Typography>
                <h2 className="infoBox__cases">{cases}</h2>
                <Typography className="infoBox__total" >
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
