import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProfileData(props) {
    return (
        <div className="profileData">
            <div className="avatar">
                <img src={props.avatar} />
            </div>
            <div className="username_for_profile">
                <h4>{props.username}</h4>
            </div>
            <button onClick={props.click}>Edytuj profil</button>
        </div>
    )
}

export default ProfileData
