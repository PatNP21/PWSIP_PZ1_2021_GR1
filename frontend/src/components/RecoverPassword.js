import React, {useState, useEffect} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import Input from 'react-validation/build/input';
import validator from 'validator'
import './NewPassword.css'
import RegisterHandler from './RegisterHandler'

const registerHandler = new RegisterHandler()

function RecoverPassword() {

    //const validator = new SimpleReactValidator()
    const navigate = useNavigate()
    const [newpassword, setNewpassword] = useState('')
    const {code} = useParams()
    useEffect(() => {
        registerHandler.recoveryLink(code).then((res) => {
            console.log(res.data.state)
        })
    },[])

    const recover = () => {
        // walidacja
        registerHandler.passwordRecoveryChange(code,newpassword).then((res) => {
            let status = res.data.success
            if (status)
            {
                console.log("Jest gitara")
                navigate("/home")
            } 
            else
                console.log(res.data.errors)
        })
    }

    return (
        <div className="newRetrievePlot">
            <h3 className="sentenceRetrieve">Ustal nowe hasło</h3>
            <div className="newPasswordFormGroup">
                <input className="retInput" type="password" placeholder="Enter new password" onChange={e => setNewpassword(e.target.value)}/><br/>
            </div>
           <div className="newPasswordFormGroup">
                <input className="retInput" type="password" placeholder="Repeat new password"/><br/>
           </div>
           
           <button className="inputRetSub" onClick={recover}>OK</button>
        </div>
    )
}

export default RecoverPassword
