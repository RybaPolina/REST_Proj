import { NextApiRequest, NextApiResponse } from 'next';

let auctions = [
    { id: 1, title: 'Auction 1', description: 'Description 1' },
    { id: 2, title: 'Auction 2', description: 'Description 2' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            if (id) {
                const auction = auctions.find(a => a.id === parseInt(id as string));
                if (auction) {
                    res.status(200).json(auction);
                } else {
                    res.status(404).json({ message: 'Auction not found' });
                }
            } else {
                res.status(200).json(auctions);
            }
            break;
        case 'POST':
            const newAuction = req.body;
            newAuction.id = auctions.length + 1;
            auctions.push(newAuction);
            res.status(201).json(newAuction);
            break;
        case 'PUT':
            if (id) {
                const index = auctions.findIndex(a => a.id === parseInt(id as string));
                if (index !== -1) {
                    auctions[index] = { ...auctions[index], ...req.body };
                    res.status(200).json(auctions[index]);
                } else {
                    res.status(404).json({ message: 'Auction not found' });
                }
            } else {
                res.status(400).json({ message: 'ID is required' });
            }
            break;
        case 'DELETE':
            if (id) {
                const index = auctions.findIndex(a => a.id === parseInt(id as string));
                if (index !== -1) {
                    const deletedAuction = auctions.splice(index, 1);
                    res.status(200).json(deletedAuction);
                } else {
                    res.status(404).json({ message: 'Auction not found' });
                }
            } else {
                res.status(400).json({ message: 'ID is required' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}