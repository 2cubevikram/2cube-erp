import jwt_decode from "jwt-decode";


export const checkLogin = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user !== null ) {
        const decodedToken = jwt_decode(user.token);
        const interval = setInterval(() => {
            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedToken.exp < currentTime) {
                console.log('Token has expired.');
                localStorage.removeItem("user");
                clearInterval(interval);
                window.location.reload();
            }
        }, 1000);
    }
}

export const setCookie = (name, value, options = {}) => {
    const { expires, path = '/' } = options;

    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    console.log(expires)
    if (expires) {
        if (expires instanceof Date) {
            cookie += `; expires=${expires.toUTCString()}`;
        } else if (typeof expires === 'number') {
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + expires * 1000);
            cookie += `; expires=${expirationDate.toUTCString()}`;
        }
    }

    cookie += `; path=${path}`;

    document.cookie = cookie;
};
