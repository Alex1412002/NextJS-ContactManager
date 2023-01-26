const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addContact(req, res){
  const contact = JSON.parse(req.body);
  console.log("Donnee initiale")
  console.log(contact)
  if (req.method =='POST'){
    try {
      const savedContact = await prisma.contact.create({ data: contact });
      res.status(200).json(savedContact);
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    } finally{
        await prisma.$disconnect();
    }
  }
}

export default addContact