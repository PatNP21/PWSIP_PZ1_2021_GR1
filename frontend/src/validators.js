import validator from 'validator'

const requiredV = (value) => {
    if (!value.toString().trim().length) {
        return `To pole jest wymagane`
    }
}

const emailV = (value) => {
    if (!validator.isEmail(value)) {
        return "Adres E-mail nie jest poprawny."
    }
}

const minimumLengthV = (value, props) => {
    if (!value.toString().trim().length < props.minLength) {
        return <span className="errorOfValidation">Hasło jest za krótkie</span>
    }
}

const passwordV = (value, props, components) => {
    if (!value !== components['regInput'][0].value) {
        return <span className="errorOfValidation">Hasła nie są takie same.</span>
    }
}

export {
    requiredV,
    emailV,
    minimumLengthV,
    passwordV
}