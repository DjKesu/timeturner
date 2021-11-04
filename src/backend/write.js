import { getDatabase, ref, set, get } from "@firebase/database";

//get method
const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

//Write function
function writeUserData(userid, name, email){
    set(ref(dbRef, "users/"+userid),{
        name: name,
        email:email
    });
}