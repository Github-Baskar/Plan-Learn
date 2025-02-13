export const profileName = (name: string) => {
    let result = "";
    let processedName = name ? name.split(" ") : "NA"
    processedName.length < 2 ?
        result = processedName[0].charAt(0) :
        result = processedName[0].charAt(0) + processedName[1].charAt(0);
    return result.toUpperCase();
};

export const formatLabel = (text: string) => {
    text = text.replace(/([a-z])([A-Z])/g, "$1 $2");
    text = text.replace(/[_-]/g, " ");
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

export const validateForm = (formData:{[key:string]:string}, field: string, value: string) => {
    switch (field) {
        case 'name':
            if (!/^[A-Za-z\s]+$/.test(value)) {
                return "Name must contain only letters."
            }
            break;
        case 'email':
            if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                return "Invalid email address."
            }
            break;
        case 'password':
            if (value.length < 6) {
                return "Password must be at least 6 characters."
            }
            break;
        case 'confirmPassword':
            if (value !== formData.password) {
                return "Passwords do not match."
            }
            break;
        default:
            break;
    }
}