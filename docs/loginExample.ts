// export async function login(username: string, password: string) {
//     const res = await fetch('/api/users', {
//       method: 'POST',
//       body: JSON.stringify({ username, password }),
//       headers: { 'Content-Type': 'application/json' },
//     })
  
//     const data = await res.json()
//     if (data.token) {
//       localStorage.setItem('token', data.token)
//     }
//     return data
//   }
  