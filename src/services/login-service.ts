const loginService = {
    /**
     *
     * @param {*} userName
     * @param {*} pass
     */
    login: async (userName: string, pass: string) => {
        if (userName === 'tuyetau' && pass === '123456') {
            return (userName = 'tuyetau')
        } else return null
    },
}

export default loginService
