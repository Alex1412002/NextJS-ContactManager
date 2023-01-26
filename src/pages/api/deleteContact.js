const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function deleteContact(req, res){
    const contact = JSON.parse(req.body);
    console.log("DONNE INITIALE")
    console.log(contact)
    if (req.method == 'DELETE'){
        try{
        await prisma.contact.delete({ where: {id: Number(parseInt(contact.id))}});
        console.log("supprimer")
        res.status(204).end()
        } catch (err){
            console.log(err)
            res.status(400).json({ message: 'Something went wrong' });
        } finally{
            await prisma.$disconnect
        }
    }
}
export default deleteContact;