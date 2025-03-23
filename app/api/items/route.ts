import { NextApiRequest, NextApiResponse } from 'next';

let items: { id: number, name: string }[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            res.status(200).json(items);
            break;
        case 'POST':
            const newItem = { id: Date.now(), name: req.body.name };
            items.push(newItem);
            res.status(201).json(newItem);
            break;
        case 'PUT':
            const { id, name } = req.body;
            const itemIndex = items.findIndex(item => item.id === id);
            if (itemIndex > -1) {
                items[itemIndex].name = name;
                res.status(200).json(items[itemIndex]);
            } else {
                res.status(404).json({ message: 'Item not found' });
            }
            break;
        case 'DELETE':
            const { id: deleteId } = req.body;
            items = items.filter(item => item.id !== deleteId);
            res.status(204).end();
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}