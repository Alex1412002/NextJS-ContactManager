import { userAgent } from 'next/server';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function editContact(req, res){
    const contact = JSON.parse(req.body);
    console.log(contact)
    try{
        const updatedContact = await prisma.contact.update({
          where: {id: contact.id
          },
          data: {
            nom: contact.nom,
            prenom: contact.prenom,
            portable: contact.portable
          }
        })
        console.log("editer")
        res.status(200).json(updatedContact)
      } catch (err){
          console.log(err)
          res.status(400).json({ message: 'Something went wrong' });
      } finally{
        await prisma.$disconnect()
      }
}

export default editContact