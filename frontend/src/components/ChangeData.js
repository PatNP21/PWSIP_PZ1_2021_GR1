import React from 'react'
import ProfileData from './Elements/ProfileData'
import './ChangeData.css'

export default function ChangeData(props) {
    return (
        <div className="edit_profile">
            <input type="text" placeholder="Change first name"/><br/>
            <input type="text" placeholder="Change last name" /><br/>
            <input type="date" placeholder="Change last name" /><br/>
            <button onClick={props.click}>Zapisz zmiany</button>
        </div>
    )
}
