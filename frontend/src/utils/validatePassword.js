const isValidPassword = (password) => {
    const hasNumber = /\d/; // Checks for at least one digit
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Checks for at least one special character
    const hasAlphabet = /[a-zA-Z]/; // Checks for at least one alphabet

    return hasNumber.test(password) && hasSpecialChar.test(password) && hasAlphabet.test(password);
}

export default isValidPassword;