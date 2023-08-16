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