let name1 = document.getElementById('name');
let email = document.getElementById('email');
let password = document.getElementById('password');
let occupation = document.getElementById('job');
let state = document.getElementById('state');
let submitbtn = document.getElementById('submit');
submitbtn.disabled = true;

let complete = false;
let nameComplete = false;
let emailComplete = false;
let passComplete = false;

// get data for selection
function get() {
    fetch('https://frontend-take-home.fetchrewards.com/form')
        .then(function (response) {
            // The API call was successful!
            return response.json();
        })
        .then(function (data) {
            // console.log(data); // occupations, states
            let jobSel = document.getElementById('job');
            for (let i = 0; i < data.occupations.length; i++) {
                let option = document.createElement('option');
                option.text = data.occupations[i];
                option.value = data.occupations[i];
                jobSel.add(option);
            }
            let statesSel = document.getElementById('state');
            for (let i = 0; i < data.states.length; i++) {
                let option = document.createElement('option');
                option.text = data.states[i].abbreviation;
                option.value = data.states[i].name;
                statesSel.add(option);
            }
        })
        .catch(function (err) {
            // There was an error
            console.warn('Error: ', err);
        });
}

function submit() {
    if (nameComplete && emailComplete && passComplete) {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            // Adding method type
            method: 'POST',
            // Adding body or contents to send
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value,
                occupation: occupation.value,
                state: state.value,
            }),
            // Adding headers to the request
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    } else {
        nameCheck();
        emailCheck();
        passwordCheck();
    }
}

function nameCheck() {
    if (name1.value === '') {
        name1.classList.add('is-danger');
        name1.placeholder = 'Please enter your full name';
        nameComplete = false;
        submitChecker();
    } else {
        name1.classList.remove('is-danger');
        name1.classList.add('is-success');
        nameComplete = true;
        submitChecker();
    }
}

function emailCheck() {
    if (email.value === '' || !email.value.includes('@')) {
        email.classList.add('is-danger');
        email.placeholder = 'Please enter a valid email';
        emailComplete = false;
        submitChecker();
    } else {
        email.classList.remove('is-danger');
        email.classList.add('is-success');
        emailComplete = true;
        submitChecker();
    }
}

function passwordCheck() {
    if (password.value === '') {
        password.classList.add('is-danger');
        password.placeholder = 'Please enter your password';
        passComplete = false;
        submitChecker();
    } else {
        password.classList.remove('is-danger');
        password.classList.add('is-success');
        passComplete = true;
        submitChecker();
    }
}

function submitChecker() {
    if (nameComplete && emailComplete && passComplete) {
        submitbtn.disabled = false;
    } else {
        submitbtn.disabled = true;
    }
}
