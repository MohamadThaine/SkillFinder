export const checkUniqueEmail = async (email) => {
    const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/checkUniqueEmail/${email}`);
    const data = await response.json();
    return data.unique;
}

export const checkUniquePhone = async (phone) => {
    const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/checkUniquePhone/${phone}`);
    const data = await response.json();
    return data.unique;
}