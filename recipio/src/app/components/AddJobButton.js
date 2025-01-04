"use client";
import Job from '../../classes/Job'
import React, { useState } from 'react'

const baseImgPath = "/img/plus-sign-circle-icon.png";
const baseImgPathHover = "/img/plus-sign-circle-icon-hover.png";

export default function AddJobButton() {

    const [addJobImg, setAddJobImg] = useState(baseImgPath);

    return (

        <button
            title='Add Job'
            style={{ border: "none", backgroundColor: "transparent", cursor: "pointer", height: "100%", marginLeft: "8px" }}
            onMouseEnter={(e) => { setAddJobImg(baseImgPathHover); }}
            onMouseLeave={(e) => { setAddJobImg(baseImgPath); }}
        >
            <img src={addJobImg} alt="plus sign circle icon" width={32} height={32} />
        </button>

    )
}

