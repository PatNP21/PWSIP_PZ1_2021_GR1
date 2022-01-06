import React from 'react'
import './FriendName.css'

function FriendName(props) {
    return (
        <div className="dispFriendName">
            {props.children}
        </div>
    )
}

export default FriendName
