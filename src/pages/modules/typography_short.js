import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./typography_short.scss"

const MTxt= props => (
    <div className="txt txt__txt">
        {props.children}
    </div>
)

function MSub(props){
    if ( (typeof(props.txt) !== 'undefined') && ( props.txt!= null ) )
        return(
            <>
                <div className="txt txt__capt">
                    {props.txt}
                </div>
            </>
        )
    else
       return(null)
}

const MImg= props => (
    <>
    <div className="imcentered">
        <img 
            style={{height: props.height, width: props.width}}
            src={props.img}
        />
    </div>
    <MSub txt={props.children}/>
    </>
)

MImg.defaultProps = {
    height: "auto",
    width: "50%"
}


const MNav = props => (
    <li><NavLink to={props.to} className="nav__link" activeClassName="nav__link_active"> {props.children} </NavLink></li>
)

const MChap = props => (
    <div className="txt txt__chap">
            {props.children}
    </div>
)

const MParg= props => (
    <div className="txt txt__parg">
            {props.children}
    </div>
)

const MEq= props => (
    <>
    <div className="txt txt__eq">
        {props.eq}
    </div>
    <MSub txt={props.children}/>
    </>
)

const MRadio= props => (
    <li>
        <input type="radio" class="mradio" name={props.name} id={props.id} />
        <label for={props.id}>{props.children}</label>
    </li>
)

const MVid= props => (
    <>
    <p align="center">
        <iframe align="absmiddle" width="560" height="315" src={props.src} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </p>
    <MSub txt={props.children}/>
    </>
)
export {MTxt, MChap, MImg, MParg, MEq, MRadio, MVid, MNav}
