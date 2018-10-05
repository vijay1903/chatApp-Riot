const nameOfUser = getCookie('name');
const usernameOfUser = getCookie('username');
const emailOfUser = getCookie('email');
const chatForm = document.querySelector('main #chat-form');
// TODO 
// 1. Create session
window.addEventListener('load', function(){
    if(usernameOfUser != ''){
        document.querySelector('#usernameBtn').innerHTML = nameOfUser +" "+document.querySelector('#usernameBtn').innerHTML;
    } else {
        deleteCookie('username');
        deleteCookie('name');
        deleteCookie('email');
        window.open('/','_self');
    }
})


// var watched_groups = [];
// chatRef.get().then((groups)=>{
//     groups.forEach(group => {
//         if(group.data().members.indexOf(usernameOfUser) != -1){
//             watched_groups.push(group.id);
//         }
//     });
// })

var watchFriend = function(friend){
    chatRef
    .where('members','array-contains',usernameOfUser)
    // .where('members','array-contains',friend)
    .onSnapshot((groups)=>{
        
        groups.docs.forEach(group => {
            if(group.data().members.indexOf(friend) != -1){
                console.log('watching:',group.id);
                getChats(group.id);
            }
        });
    })
}

// userRef.get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//         document.getElementById("firestore").innerHTML += doc.id+ " => " + doc.data().Name+"<br>";
//     });
// }).catch(function(error){
//     console.log(error);
// });

var getAllUsers = function(){
    userRef
    .get()
    .then(function(querySnapshot) {   
        querySnapshot.forEach(function(doc) {
            if(doc.data().name != getCookie('name')){
                var friend = doc.data().username;
                document.getElementById('user_list').innerHTML += '<li><button onclick="createGroup(\''+friend+'\')" >'+doc.data().name+'</button></li>';
            }
        });
    })
    .catch(function(error){
        console.log("Error getting users: ", error);
    });
}

var groupId = '';
var createGroup = function(friend){
    var groupFound = false;
    chatRef
    .where('members','array-contains',usernameOfUser)
    .get()
    .then((groups)=>{
        groups.forEach((group) => {
            // console.log(group.data().members);
            if(group.data().members.indexOf(friend) != -1){
                console.log('Group found with these members :', group.data().members);
                groupId = group.id;
                // console.log(groupId);
                groupFound = true;
                // getChats(group.id);
            }
        });
        if(!groupFound){
            chatRef.add({
                members: [usernameOfUser,friend]
            }).then(function(group){
                console.log("New group created with id :",group.id);
                groupId = group.id;
                // getChats(group.id);
            }).catch((err)=>{
                console.log("Error creating group : ", err);
            })
        }
    })
    watchFriend(friend);
}

function removeUser(id){
    userRef
    .where("id", "==", id)
    .delete()
    .then(function(user) {
        console.log("User Deleted");
    })
    .catch(function(error) {
        console.log("Error deleting user: ", error);
    });
}

function updateUser(id, field, value){
    userRef
    .where("id", "==", id)
    .get()
    .then(function(user) {
        return user;
    })
    .catch(function(error) {
        console.log("Error getting user: ", error);
    });
}

function getChats(group_id) {
    chatRef
    .doc(group_id)
    .get()
    .then(function(group) {
        if(group.data().messages){
            console.log('Messages for group: ', group.data().members);
            document.getElementById('chats').innerHTML = '';
            group.data().messages.forEach(element => {
                if(element.sender == usernameOfUser)
                    document.getElementById('chats').innerHTML += '<li class=\"chat-list-item chat-sent\">'+element.text+'<br><sub>'+new Date(element.sentAt.seconds)+'</sub></li>';
                    else
                    document.getElementById('chats').innerHTML += '<li class=\"chat-list-item chat-received\">'+element.text+'<br><sub>'+new Date(element.sentAt.seconds)+'</sub></li>';
            });
        } else {
            // window.alert("No message for this group.");
            document.getElementById('chats').innerHTML = 'No Messages';
            console.log("No message for this group.");
        }
    })
    .catch(function(error) {
        console.log("Error getting chats: ", error);
    });
}

function sendChat(group_id, sender, text) {
    chatRef.doc(group_id)
    .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
            sender:sender,
            text:text,
            sentAt: new Date()
        })
    })
    .then(function(docRef) {
        console.log("Sent message to group with ID: ", group_id);
    })
    .catch(function(error) {
        console.error("Error sending message: ", error);
    });
}

getAllUsers();

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    // console.log(chatForm.text.value);
    if(groupId){
        sendChat(groupId,usernameOfUser,chatForm.text.value);
        chatForm.text.value = '';
    } else {
        window.alert('Please select a friend.');
    }
})

var logOut = function(){
    deleteCookie('username');
    deleteCookie('name');
    deleteCookie('email');
    // deleteSession(usernameOfUser);
    window.open('/','_self');
}