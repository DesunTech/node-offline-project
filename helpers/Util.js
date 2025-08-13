const formatError = (isses) => {
    return isses.map( item => {
        const err = {};
        err[item.path[0]] = item.message;
        return err;
    })
}

function canAccess(action, user) {
    const currentUserActions = user.actions;
    return currentUserActions.includes(action);
}

export {
    formatError,
    canAccess
}