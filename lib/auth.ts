/* ============================================
   EVOKITS — Mock Authentication Helper
   Uses localStorage for MVP demo purposes
   ============================================ */

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthResult {
  success: boolean;
  message: string;
  user?: User;
}

const STORAGE_KEY = "evokits_users";
const SESSION_KEY = "evokits_session";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

/* ---- Signup ---- */
export function signup(
  name: string,
  email: string,
  password: string
): AuthResult {
  const users = getUsers();
  const normalizedEmail = email.toLowerCase().trim();

  if (users.find((u) => u.email === normalizedEmail)) {
    return { success: false, message: "An account with this email already exists." };
  }

  const newUser: User = {
    id: generateId(),
    name: name.trim(),
    email: normalizedEmail,
    createdAt: new Date().toISOString(),
  };

  /* Store password hash placeholder — in real app use bcrypt */
  const passwords: Record<string, string> = JSON.parse(
    localStorage.getItem("evokits_passwords") || "{}"
  );
  passwords[normalizedEmail] = password; // plaintext for demo only
  localStorage.setItem("evokits_passwords", JSON.stringify(passwords));

  users.push(newUser);
  saveUsers(users);
  setSession(newUser);

  return { success: true, message: "Account created successfully!", user: newUser };
}

/* ---- Login ---- */
export function login(email: string, password: string): AuthResult {
  const users = getUsers();
  const normalizedEmail = email.toLowerCase().trim();
  const user = users.find((u) => u.email === normalizedEmail);

  if (!user) {
    return { success: false, message: "No account found with this email." };
  }

  const passwords: Record<string, string> = JSON.parse(
    localStorage.getItem("evokits_passwords") || "{}"
  );

  if (passwords[normalizedEmail] !== password) {
    return { success: false, message: "Incorrect password. Please try again." };
  }

  setSession(user);
  return { success: true, message: "Welcome back!", user };
}

/* ---- Session ---- */
export function setSession(user: User): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getSession(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn(): boolean {
  return getSession() !== null;
}
