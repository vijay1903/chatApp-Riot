// Initialize Firebase
var config = {
    apiKey: "AIzaSyBhF_TRln92yhRWzCGr_tUnC5ZV7XgoeIU",
    authDomain: "chatsapp-60ded.firebaseapp.com",
    databaseURL: "https://chatsapp-60ded.firebaseio.com",
    projectId: "chatsapp-60ded",
    storageBucket: "chatsapp-60ded.appspot.com",
    messagingSenderId: "884778330923"
};
var app = firebase.initializeApp(config);
const db = firebase.firestore(app);
const settings = {timestampsInSnapshots: true};
db.settings(settings);

const sessionRef = db.collection("sessions");
const userRef = db.collection("users");
const chatRef = db.collection("chats");
// const groupRef = db.collection("groups");


function setCookie(c_name, c_value, c_ex_hrs, c_path){
    var d = new Date();
    d.setTime(d.getTime() + (c_ex_hrs * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = c_name + "=" + c_value + ";" + expires + ";path="+c_path;
}

function deleteCookie(c_name){
    var d = new Date();
    d.setTime(d.getTime() - (1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = c_name + "='';" + expires + ";path=/";
}

function getCookie(c_name){
    var search = c_name+"=";
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(search) == 0) {
            return cookie.substring(name.length+search.length, cookie.length);
        }
    }
    return "";
}
function createSession(user){
    var user_name = user;
    sessionRef.add({
        username: user_name
    }).then((session)=>{
        console.log(session.id);
        // window.sessionStorage.setItem(user_name,session.id);
        setCookie("session_id",session.id,24,"/main");
        console.log('Session created');    
    }).catch((error)=>{
        console.log('Error creating session : ',error);
    })
}

function isAuthenticated(){
    var sessionId = getCookie('session_id');
    var res = false;
    sessionRef.doc(sessionId).get()
    .then((doc)=>{
        if(doc){
            res = true;
        } else {
            console.log(doc.length,' sessions active.');
        }
    }).catch((err)=>{
        console.log('Error getting session :',err);
    })
    // console.log(window.sessionStorage);
    return res;
}
function deleteSession(username){
    sessionRef.doc().where('username',"==",username).delete().then(()=>{
        
        deleteCookie('session_id');
        console.log('Session deleted.');
    }).catch((err)=>{
        console.log('Error deleting session: ',err);
    })
}

// hashing function
var hash = function(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}