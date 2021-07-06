async function signUpFormHandler(event) {
    event.preventDefault();

    const user_login = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const display_name = document.querySelector('#display-name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const lang_spk = document.querySelector('#lang-spk-signup').value.trim();
    const lang_lrn = document.querySelector('#lang-lrn-signup').value.trim();

    if (user_login && email && display_name && password) {
        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                user_login,
                email,
                display_name,
                password,
                lang_spk,
                lang_lrn
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            document.location.replace('/user-dash');
        } else {
            alert(res.statusText);
        }
    }
};
document
    .querySelector('#signup-form')
    .addEventListener('submit', signUpFormHandler);