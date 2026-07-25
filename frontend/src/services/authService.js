// Frontend-only auth service. Persists users/sessions in localStorage so the
// app is fully usable while the backend JWT flow (roadmap step 5) is wired up.
// Swapping this out for real `api` calls later will not require touching
// AuthContext or any component that consumes it.

const USERS_KEY = "cryptoweb_users";
const SESSION_KEY = "cryptoweb_auth_user";

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function register({ name, email, password }) {
  const users = getUsers();

  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: "An account with this email already exists." };
  }

  const newUser = { id: Date.now().toString(), name, email, password };
  saveUsers([...users, newUser]);

  const session = { id: newUser.id, name: newUser.name, email: newUser.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return { success: true, user: session };
}

export function login({ email, password }) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return { success: false, message: "Invalid email or password." };
  }

  const session = { id: user.id, name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return { success: true, user: session };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
}
