
// // logoowanie
// const res = await fetch('/api/users', {
//     method: 'POST',
//     body: JSON.stringify({
//       username: 'admin',
//       password: '1234',
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
  
//   const { token } = await res.json()
//   localStorage.setItem('token', token) // lub zapisz do cookie
  


// //    Wysyłanie żądań z tokenem


// const token = localStorage.getItem('token')

// const res = await fetch('/api/items', {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// })

// const data = await res.json()
