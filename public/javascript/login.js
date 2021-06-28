
const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to log in.');
        }
    }
};

document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);


  
  
// async function signUpFormHandler(event) {
//     event.preventDefault();

//     const user_login = document.querySelector('#user-login-signup').value.trim();
//     const email = document.querySelector('#email-signup').value.trim();
//     const display_name = document.querySelector('#display-name-signup').value.trim();
//     const password = document.querySelector('#password-signup').value.trim();

//     if (user_login && email && display_name && password) {
//         const res = await fetch('/api/users', {
//             method: 'post',
//             body: JSON.stringify({
//                 user_login,
//                 email,
//                 display_name,
//                 password
//             }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         if (res.ok) {
//             console.log('success');
//         } else {
//             alert(res.statusText);
//         }
//     }
// };


// document.querySelector('.signup-form').addEventListener('submit', signUpFormHandler);

