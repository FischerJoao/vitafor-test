import type { LoginPayload } from "../types/Login";
import type { RegisterPayload } from "../types/Register";
import type { SavedCharacter } from "../types/SavedCharacter";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function Login(payload: LoginPayload) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to login");
  }

  return data;
}

export async function Register(payload: RegisterPayload) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to register");
  }

  return data;
}

export async function Me() {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch authenticated user");
  }

  return data;
}

export async function Logout() {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to logout");
  }

  return data;
}

type SaveCharacterPayload = {
  name: string;
  species: string;
  image: string;
  url: string;
};

type UpdateSavedCharacterPayload = SaveCharacterPayload;

export async function saveCharacter(payload: SaveCharacterPayload) {
  const response = await fetch(`${API_URL}/characters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to save character");
  }

  return data;
}

export async function getSavedCharacters(): Promise<{
  characters: SavedCharacter[];
}> {
  const response = await fetch(`${API_URL}/characters`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch saved characters");
  }

  return data;
}

export async function updateSavedCharacter(
  id: number,
  payload: UpdateSavedCharacterPayload,
) {
  const response = await fetch(`${API_URL}/characters/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to update character");
  }

  return data;
}

export async function deleteSavedCharacter(id: number) {
  const response = await fetch(`${API_URL}/characters/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to delete character");
  }

  return data;
}

export async function getSavedCharacterById(id: number): Promise<{
  character: SavedCharacter;
}> {
  const response = await fetch(`${API_URL}/characters/${id}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch saved character");
  }

  return data;
}
