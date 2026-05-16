const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  const contentType = response.headers.get('content-type') ?? ''
  const payload = contentType.includes('application/json') ? await response.json() : await response.text()

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? payload.message
        : typeof payload === 'string' && payload.trim()
          ? payload
          : `Error HTTP ${response.status}`
    throw new Error(message)
  }

  return payload
}

export const backendApi = {
  findAllUsers: () => request('/user/findAll'),
  createUser: (user) =>
    request('/user/create', {
      method: 'POST',
      body: JSON.stringify(user),
    }),
  deleteUser: (id) =>
    request(`/user/delete?id=${encodeURIComponent(id)}`, {
      method: 'PUT',
    }),
  findGoalsByUser: (id) => request(`/goal/findByUser?id=${encodeURIComponent(id)}`),
  createGoal: (goal) =>
    request('/goal/create', {
      method: 'POST',
      body: JSON.stringify(goal),
    }),
}

export default backendApi
