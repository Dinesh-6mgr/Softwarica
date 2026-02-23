
const login = async (req, res) => {
    try {
        return res.status(200).json({ message: "Login endpoint working" });
    } catch (error) {
        console.error('login error', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export {
    login
};