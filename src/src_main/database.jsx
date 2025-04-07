import usersDatabase from '../../../database/database.json';


function addToDatabase(email, password) {

  if (!email || !password) {
    return { success: false, message: "Email and password are required" };
  }

  if (usersDatabase.some(user => user.email === email)) {
    return { success: false, message: "User already exists" };
  }

  const newUser = { email, password };
  usersDatabase.push(newUser);
  
  return { success: true, message: "User added successfully", user: newUser };
}

function removeFromDatabase(email) {
  const initialLength = usersDatabase.length;
  usersDatabase = usersDatabase.filter(user => user.email !== email);
  
  if (usersDatabase.length < initialLength) {
    return { success: true, message: "User removed successfully" };
  } else {
    return { success: false, message: "User not found" };
  }
}


function findUser(email) {
  return usersDatabase.find(user => user.email === email) || null;
}

function searchUsers(searchTerm) {
  if (!searchTerm) return [];
  
  const term = searchTerm.toLowerCase();
  return usersDatabase.filter(user => 
    user.email.toLowerCase().includes(term) || 
    user.password.toLowerCase().includes(term)
  );
}

module.exports = {
  addToDatabase,
  removeFromDatabase,
  findUser,
  searchUsers,
};