const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navBar__menu');
const signup = document.querySelector('#signup');
const closeBtn = document.querySelector('.closeBtn')
const popUp = document.querySelector('.pop-up');

const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active')
}

menu.addEventListener('click', mobileMenu);



signup.addEventListener('click', () => {  
    popUp.style.display = 'block';
})


closeBtn.addEventListener('click', () => {
    popUp.style.display = "none"
})


const firebaseConfig = {
    apiKey: "AIzaSyB_TfpP17tOW38ivzhlyvsoFYNtpRyoKLk",
    authDomain: "sign-up-form-with-firebase.firebaseapp.com",
    projectId: "sign-up-form-with-firebase",
    storageBucket: "sign-up-form-with-firebase.appspot.com",
    messagingSenderId: "628517265241",
    appId: "1:628517265241:web:ba55c02798f8b277207648",
    measurementId: "G-W7T7EDWN2K"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
  const auth = firebase.auth();
  const database = firebase.database();


  function register() {
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;
  
    if(validateFields(name) == false || validateFields(surname) == false) {
        alert('Please, fill all the fields!!!');
        return;
    }

    if(validateEmail(email) == false) {
        alert('Email is not valid!!!');
        return;
    } 
    if(validatePassword(password) == false) {
        alert('Password must conatin at least 6 charachters');
        return
    } else if(password !== confirmPassword) {
        alert('Passwords not match');
        return;
    }

    //Create user

    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        var user = auth.currentUser;

        var database_ref = database.ref();

        var userData = {
            email,
            name,
            surname,
        }

        database_ref.child('users/' + user.uid).set(userData);

        alert("user created")

    })
    .catch(function(error) {
        var error_code = error.code;
        var error_message = error.message;
        alert(error_message);
    })


  }




  function validateEmail(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if(expression.test(email) == true) {
        return true
    } else {
        return false
    }
  }

  function validatePassword(password) {
    if(password.length < 6) {
        return false
    } else {
        return true
    }
  }

  function validateFields(field) {
    if(field == null || field.length<=0) return false;
    return true;
  }


  function loginPopUp() {
    let name = document.getElementById('name');
    let surname = document.getElementById('surname');
    let confirmPassword = document.getElementById('confirm-password');
    let hide = document.getElementsByClassName('hide');
    let loginBtn = document.querySelector('#loginBtn');


    for (var i=0;i<hide.length;i++){
            hide[i].style.display = 'none';
    }

    name.style.display = 'none';
    surname.style.display = 'none';
    confirmPassword.style.display = 'none';

    loginBtn.style.display = 'block'

}

function login() {
    alert('login')
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    //validation 

    // if(validateEmail(email) == false) {
    //     alert('Email is not valid!!!');
    //     return;
    // } 
    // if(validatePassword(password) == false) {
    //     alert('Password must conatin at least 6 charachters');
    //     return

    // }
    
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
        var user = auth.currentUser;

        var database_ref = database.ref();


        alert("Logged In!!!")

    }).catch(function(error) {
        var error_code = error.code;
        var error_message = error.message;
        alert(error_message);
    })

}


  