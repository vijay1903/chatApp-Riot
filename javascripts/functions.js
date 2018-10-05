
// // const userRef = firestore.collection("users");
// // const chatRef = firestore.collection("chats");
// // const groupRef = firestore.collection("groups");
// // userRef.get().then(function(querySnapshot) {
// //     querySnapshot.forEach(function(doc) {
// //         // doc.data() is never undefined for query doc snapshots
// //         console.log(doc.id, " => ", doc.data());
// //         document.getElementById("firestore").innerHTML += doc.id+ " => " + doc.data().Name+"<br>";
// //     });
// // }).catch(function(error){
// //     console.log(error);
// // });


// function addUser(name, email, password){
//     userRef
//     .add({
//         Name: name,
//         Email: email,
//         Password : password,
//         JoinedOn : new Date(),
//         LastLogin : new Date()
//     })
//     .then(function(docRef) {
//         console.log("User added with ID: ", docRef.id);
//     })
//     .catch(function(error) {
//         console.error("Error adding user: ", error);
//     });

// }

// function removeUser(id){
//     userRef
//     .where("id", "==", id)
//     .delete()
//     .then(function(user) {
//         console.log("User Deleted");
//     })
//     .catch(function(error) {
//         console.log("Error deleting user: ", error);
//     });
// }

// function getAllUsers() {
//     userRef
//     .get()
//     .then(function(users){
//         return users;
//     })
//     .catch(function(error){
//         console.log("Error getting users: ", error);
//     });
// }

// function getUser(id) {
//     userRef
//     .where("id", "==", id)
//     .get()
//     .then(function(user) {
//         return user;
//     })
//     .catch(function(error) {
//         console.log("Error getting user: ", error);
//     });
// }

// function updateUser(id, field, value){
//     userRef
//     .where("id", "==", id)
//     .get()
//     .then(function(user) {
//         return user;
//     })
//     .catch(function(error) {
//         console.log("Error getting user: ", error);
//     });
// }

// function getChats(user_id) {
//     chatRef
//     .where("sender", "==", user_id)
//     .get()
//     .orderBy("sentAt", "desc")
//     .then(function(chats) {
//         return chats;
//     })
//     .catch(function(error) {
//         console.log("Error getting chats: ", error);
//     });
// }

// function sendChat(text, sender, receiver) {
//     chatRef
//     .add({
//         text: text,
//         sender: sender,
//         receiver : receiver,
//         sentAt : new Date(),
//         ReadAt : null
//     })
//     .then(function(docRef) {
//         console.log("Sent message with ID: ", docRef.id);
//     })
//     .catch(function(error) {
//         console.error("Error sending message: ", error);
//     });
// }

// function createGroup(creator, members) {

// }