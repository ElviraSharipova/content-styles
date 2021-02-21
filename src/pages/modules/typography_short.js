import React, { Component } from "react";
import "./typography_short.scss"

const MTxt= props => (
    <div className="txt txt__txt">
        {props.children}
    </div>
)

const MImg= props => (
    <>
    <div className="imcentered">
        <img
            src={props.img}
            width={props.width}
        />
    </div>
    <div className="txt txt__capt">
        {props.children}
    </div>
    </>
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
    <div className="txt txt__capt">
            {props.children}
    </div>
    </>
)

export {MTxt, MChap, MImg, MParg, MEq}
