const formatError = (isses) => {
    return isses.map( item => {
        const err = {};
        err[item.path[0]] = item.message;
        return err;
    })
}

export {
    formatError
}