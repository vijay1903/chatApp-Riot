// Asssigning DOM elements to variable for effective utilization in the code.
var signUpForm = document.querySelector('login-signup signup #signup-form');
var loginForm = document.querySelector('login-signup login #login-form');
var forgotForm = document.querySelector('login-signup forgot #forgot-form');
var verifyButton = document.querySelector('login-signup forgot #verifyAccount');
if(getCookie('username')){
    window.open('/main.html','_self');
};


//console.log(hash("password"));
// Adding a user to the list
signUpForm.addEventListener('submit', function(event){
    event.preventDefault();
    // console.log(this);
    if(this.pass.value == this.pass2.value){
        var signupthis = this;
        userRef
        .where("username", "==", this.username.value)
        .get()
        .then(function(user) {
            if(user.docs.length == 0){
                userRef.doc(signupthis.username.value).set({
                    username: signupthis.username.value,
                    name: signupthis.name.value,
                    email: signupthis.email.value,
                    password : hash(signupthis.pass.value),
                    joinedOn : new Date(),
                    lastLogin : new Date(),
                    passwordUpdatedOn : new Date()
                }).then(()=>{
                    window.alert('Account Created Successfully. Please login to continue.');
                    window.open('/','_self');    
                }).catch((err)=>{
                    window.alert('Some error occured. Please try again or contact the administrator.');
                    console.log('Error creating account: ',err);
                })
                
            } else {
                window.alert('This username is already registered. Please use other username.');
                console.log("%d user(s) found with this username.",user.docs.length);
            }
        })
        .catch(function(error) {
            console.log("Error signing up user: ", error);
        });        
    } else {
        this.pass.value = '';
        this.pass2.value = '';
        window.alert('Password does not matched!');
    }
})

// Verfiying the user in the list to login
loginForm.addEventListener('submit', function(event){
    event.preventDefault();
    var loginformthis = this;
    userRef
    .where("username", "==", this.username.value)
    .get()
    .then(function(user) {
        if(user.docs.length == 1){
            userRef.doc(loginformthis.username.value).update({
                lastLogin: new Date()
            }).then(()=>{
                user.docs.forEach(doc => {
                    // console.log(doc.data().username);
                    setCookie("username",doc.data().username,24,"/");
                    setCookie("name",doc.data().name,24,"/");
                    setCookie("email",doc.data().email,24,"/");
                    if(doc.data().password === hash(loginformthis.pass.value)){
                        // createSession(loginformthis.username.value);
                        console.log('Login Successful.');
                        setTimeout(window.open('main.html','_self'),2000);
                    } else {
                        window.alert('Wrong Username or Password.');
                    }
                });
            })
            //document.getElementById("cookies").innerHTML = document.cookie;
        } else {
            window.alert('Incorrect username or password.');
            console.log(user.docs.length," users found with this username.");
        }
    })
    .catch(function(error) {
        console.log("Error logging user: ", error);
    });
})

// To reset the password, verify the account details and then update the password.
verifyButton.addEventListener('click', function(event){
    event.preventDefault();
    if(forgotForm.username.value == '' || forgotForm.email.value == ''){
        window.alert('Email and Username cannot be empty!!');
    } else {
        // console.log(forgotForm);
        userRef
        .where("username", "==", forgotForm.username.value)
        .where("email","==", forgotForm.email.value)
        .get()
        .then(function(user) {
            if(user.docs.length == 1){
                window.alert('Account verified.');
                forgotForm.addEventListener('submit', function(e){
                    e.preventDefault();
                    if(forgotForm.pass.value == forgotForm.pass2.value){
                        userRef.doc(forgotForm.username.value).update({
                            password : hash(forgotForm.pass.value),
                            passwordUpdatedOn: new Date()
                        })
                        .then(function(){
                            window.alert('Password updated');
                            forgotForm.username.value = '';
                            forgotForm.email.value = '';
                            forgotForm.pass.value = '';
                            forgotForm.pass2.value = '';
                        }).catch(function(err){
                            console.log('Error updating password: ', err);
                        })
                    } else {
                        forgotForm.pass.value = '';
                        forgotForm.pass2.value = '';
                        window.alert('Password does not matched!');
                    }
                })
            } else {
                window.alert("Invalid username and/or email !");
                console.log(user.docs.length," users found with this username and email.");
            }
        })
        .catch(function(error) {
            console.log("Error updating user password: ", error);
        }); 
    }       
})