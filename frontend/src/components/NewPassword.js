import React, {useState} from 'react'
import SimpleReactValidator from 'simple-react-validator'
import './NewPassword.css'

function NewPassword() {

    const validator = new SimpleReactValidator()

    const [newpassword, setNewpassword] = useState('')

    return (
        <div className="newRetrievePlot">
            <h3 className="sentenceRetrieve">Ustal nowe hasło</h3>
            <div className="newPasswordFormGroup">
                <input className="retInput" type="password" placeholder="Enter new password" onChange={e => setNewpassword(e.target.value)}/><br/>
                {validator.message('newPassword', newpassword, 'required')}
            </div>
           <div className="newPasswordFormGroup">
                <input className="retInput" type="password" placeholder="Repeat new password"/><br/>
                {validator.message('newPassword', newpassword, 'required')}
           </div>
           
           <button className="inputRetSub">OK</button>
        </div>
    )
}

export default NewPassword
