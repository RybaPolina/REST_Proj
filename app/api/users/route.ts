import { NextApiRequest, NextApiResponse } from 'next';

let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            res.status(200).json(users);
            break;
        case 'POST':
            const newUser = { id: Date.now(), ...req.body };
            users.push(newUser);
            res.status(201).json(newUser);
            break;
        case 'PUT':
            const { id, ...updatedUser } = req.body;
            users = users.map(user => (user.id === id ? { ...user, ...updatedUser } : user));
            res.status(200).json({ message: 'User updated successfully' });
            break;
        case 'DELETE':
            const { id: deleteId } = req.body;
            users = users.filter(user => user.id !== deleteId);
            res.status(200).json({ message: 'User deleted successfully' });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}