import React from 'react'
import './FriendName.css'
import {Link} from 'react-router-dom'
function FriendName(props) {
    return (
        <Link to = {"../profile/"+props.children}><div className="dispFriendName">
            {props.children}
        </div></Link>
    )
}

export default FriendName
