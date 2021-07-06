function userName(value) {
    let userName;
    // check if user is logged in
    if (req.session.loggedIn = true) {
        // if user is logged in, set userName to the name of th elogged in user
        userName = req.session.display_name
        console.log('userName is currently equal to:', userName)
    } else {
        // if not, set userName equal to "guest" with a random 5 digit number
        userName = 'Guest';
        console.log('userName is currently equal to:', userName)
    }
}

module.exports = userName;