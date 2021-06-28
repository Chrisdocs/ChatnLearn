

async function loginFormHandler(event) {
    event.preventDefault();

    const user_login = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (user_login && password) {
        const res = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                user_login,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            document.location.replace('/');
        } else {
            alert(res.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

