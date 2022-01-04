import React from 'react'
import ProfileData from './Elements/ProfileData'

export default function ChangeData(props) {
    return (
        <div className="profileData">
            <input type="text" placeholder="Change first name"/><br/>
            <input type="text" placeholder="Change last name" /><br/>
            <input type="date" placeholder="Change last name" /><br/>
            <button>Zapisz zmiany</button>
        </div>
    )
}
