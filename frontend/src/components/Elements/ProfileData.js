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
            {props.myAccount 
                ? <button onClick={props.click}>Edytuj profil</button> 
                : (!props.friends.includes(props.username) ? <div>
                                                                <button onClick={props.addFriend}>Dodaj do znajomych</button>
                                                                {!props.blockedArray.includes(props.username) ? <button onClick={props.blockUser}>Blokuj użytkownika</button>
                                                                                                          : <button onClick={props.unblockUser}>Odblokuj użytkownika</button>}
                                                            </div>
                                                           : (<div>
                                                            <button onClick={props.removeFriend}>Usuń ze znajomych</button>
                                                            {!props.blockedArray.includes(props.username) ? <button onClick={props.blockUser}>Blokuj użytkownika</button>
                                                                                                          : <button onClick={props.unblockUser}>Odblokuj użytkownika</button>}
                                                            </div>))}
        </div>
    )
}

export default ProfileData
