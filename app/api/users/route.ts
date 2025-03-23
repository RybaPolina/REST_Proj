import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { signJwt, verifyJwt } from '@/app/api/lib/jwt'

let users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('test1234', 10),
  },
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, url } = req

  // Endpoint logowania: /api/users/login
  if (method === 'POST' && url?.includes('/login')) {
    const { email, password } = req.body
    const user = users.find(u => u.email === email)

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = signJwt({ sub: user.id, email: user.email })
    return res.status(200).json({ token })
  }

  switch (method) {
    case 'GET':
      // Pokaż użytkowników (bez hasła)
      const safeUsers = users.map(({ password, ...rest }) => rest)
      res.status(200).json(safeUsers)
      break

    case 'POST':
      // Rejestracja nowego użytkownika
      const { name, email, password } = req.body

      const existing = users.find(u => u.email === email)
      if (existing) {
        return res.status(400).json({ message: 'User already exists' })
      }

      const hashed = await bcrypt.hash(password, 10)
      const newUser = {
        id: Date.now(),
        name,
        email,
        password: hashed,
      }
      users.push(newUser)

      res.status(201).json({ id: newUser.id, name, email }) // bez hasła
      break

    case 'PUT':
    case 'DELETE':
      // Autoryzacja przez JWT
      const authHeader = req.headers.authorization
      const token = authHeader?.split(' ')[1]
      const payload = token ? verifyJwt(token) : null

      if (!payload) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      if (method === 'PUT') {
        const { id, ...updatedUser } = req.body
        users = users.map(u => (u.id === id ? { ...u, ...updatedUser } : u))
        return res.status(200).json({ message: 'User updated' })
      }

      if (method === 'DELETE') {
        const { id } = req.body
        users = users.filter(u => u.id !== id)
        return res.status(200).json({ message: 'User deleted' })
      }

      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
