export const parseRegisterError = messageObject => {
    return Object.keys(messageObject).map(key => messageObject[key]);
}