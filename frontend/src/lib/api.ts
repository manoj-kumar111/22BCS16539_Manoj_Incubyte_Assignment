const BASE_URL = "/api";

const jsonHeaders = (token?: string) => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const handleResponse = async (res: Response) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || `Request failed with ${res.status}`);
  }
  return data;
};

export type AuthResult = { token: string; user: { _id: string; email: string; role: "USER" | "ADMIN" } };

export const api = {
  async register(email: string, password: string) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res) as Promise<{ user: { _id: string; email: string; role: "USER" | "ADMIN" } }>;
  },
  async registerAdmin(email: string, password: string) {
    const res = await fetch(`${BASE_URL}/auth/register-admin`, {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res) as Promise<{ user: { _id: string; email: string; role: "USER" | "ADMIN" } }>;
  },

  async login(email: string, password: string) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res) as Promise<AuthResult>;
  },

  async getSweets(token: string) {
    const res = await fetch(`${BASE_URL}/sweets`, {
      headers: jsonHeaders(token),
    });
    return handleResponse(res) as Promise<Array<{ _id: string; name: string; category: string; price: number; quantity: number; }>>;
  },

  async searchSweets(token: string, params: { name?: string; maxPrice?: number }) {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== undefined && v !== null).map(([k, v]) => [k, String(v)]))
    );
    const res = await fetch(`${BASE_URL}/sweets/search?${query.toString()}`, {
      headers: jsonHeaders(token),
    });
    return handleResponse(res) as Promise<Array<{ _id: string; name: string; category: string; price: number; quantity: number; }>>;
  },

  async createSweet(token: string, sweet: { name: string; category: string; price: number; quantity: number }) {
    const res = await fetch(`${BASE_URL}/sweets`, {
      method: "POST",
      headers: jsonHeaders(token),
      body: JSON.stringify(sweet),
    });
    return handleResponse(res) as Promise<{ sweet: { _id: string; name: string; category: string; price: number; quantity: number } }>;
  },

  async updateSweet(token: string, id: string, patch: Partial<{ name: string; category: string; price: number; quantity: number }>) {
    const res = await fetch(`${BASE_URL}/sweets/${id}`, {
      method: "PUT",
      headers: jsonHeaders(token),
      body: JSON.stringify(patch),
    });
    return handleResponse(res) as Promise<{ sweet: { _id: string; name: string; category: string; price: number; quantity: number } }>;
  },

  async deleteSweet(token: string, id: string) {
    const res = await fetch(`${BASE_URL}/sweets/${id}`, {
      method: "DELETE",
      headers: jsonHeaders(token),
    });
    return handleResponse(res) as Promise<{ message: string }>;
  },

  async purchase(token: string, id: string) {
    const res = await fetch(`${BASE_URL}/sweets/${id}/purchase`, {
      method: "POST",
      headers: jsonHeaders(token),
    });
    return handleResponse(res) as Promise<{ message: string }>;
  },

  async restock(token: string, id: string, quantity: number) {
    const res = await fetch(`${BASE_URL}/sweets/${id}/restock`, {
      method: "POST",
      headers: jsonHeaders(token),
      body: JSON.stringify({ quantity }),
    });
    return handleResponse(res) as Promise<{ message: string }>;
  },
};

