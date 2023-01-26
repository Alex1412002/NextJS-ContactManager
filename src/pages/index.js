import NewContactForm from "@/components/NewContactForm"
import Contact from "@/components/Contact"
import Routeur from 'next/router'
import EditContact from "@/components/EditContact";
import { use, useState } from "react";

import { PrismaClient, contact, Prisma } from '@prisma/client'; //Contact : schema de la bdd renseigné dans schema.prisma

const prisma = new PrismaClient();

export async function getStaticProps(){
  const ListeContact = await prisma.contact.findMany();
  await prisma.$disconnect();
  return {
    props : {
      contactBdd: ListeContact
    }
  }
}

async function addContact(newContact){
    
    const response = await fetch('/api/addContact', {
        method: 'POST',
        body: JSON.stringify(newContact)
      });
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return await response.json();
      
      
}
async function DeleteContact(user){
    const response = await fetch('/api/deleteContact', {
        method: 'DELETE',
        body: JSON.stringify(user)
      });
      if (!response.status === 204) {
        throw new Error(response.statusText)
      }
      try{
        return await response.json();
      }
      catch (err){}
}
async function editContact(user){
    const response = await fetch('/api/editContact', {
        method: 'PUT',
        body: JSON.stringify(user)
      });
      if (!response.status === 200) {
        throw new Error(response.statusText)
      }
      return await response.json();
}

export default function Home({contactBdd}) {
  const [contacts, setContacts] = useState(contactBdd);
  const [isOpen, setIsOpen] = useState(false);
  const [toEdit,setToEdit] = useState(0)
  const showEditor = () => {
    if (!isOpen){setIsOpen(!isOpen);console.log("ouvert")}
  }
  const hideEditor = () => {
    if(isOpen){setIsOpen(!isOpen);console.log("fermé")}
  }
  if (contacts) {
    return (  
        <>  
            <NewContactForm onSubmit={async (data,e) => {
                try{
                    console.log("TENTATIVE D'AJOUT")
                    const test = await addContact(data)
                    console.log("AJOUT BACKEND TERMINE")
                    console.log("RETURN")
                    console.log(test)
                    setContacts([...contacts, data]);
                    e.target.reset();
                    Routeur.reload('/') //TECHNIQUE DE GROS BOURRIN PAS OPTI !!!!
                } catch(err){
                    console.log(err)
                }
                
            }}/>
            <div className="ContactList">
                {
                    contacts.map(user => {
                        return (
                            <div key={user.id}>
                                <Contact user = {user} supprimer={async (data,e) =>{
                                    try{
                                        console.log("TENTATIVE DE SUPPRESSION")
                                        console.log("bug : getID d'un ajout")
                                        console.log(user.id)
                                        await DeleteContact(user)
                                        console.log("SUPPRESSION BACKEND TERMINE")
                                        const updatedContacts = contacts.filter(contact => contact.id !== user.id);
                                        // On met à jour la liste de contacts en utilisant la nouvelle liste filtrée
                                        setContacts(updatedContacts);
                                    } catch(err) {
                                        console.log(err)
                                    }
                                    
                                }} editer={
                                async (data,e) =>{
                                    console.log(user.id)
                                    showEditor();
                                    setToEdit(user)
                                }
                                }/>
                            </div>
                        )
                    })
                }
                {isOpen && <EditContact user={toEdit} onSubmit={
                    async (data,e) => {
                        hideEditor();
                        console.log("editId")
                        console.log(toEdit)
                        const user = {id:toEdit.id,nom:data.nom, prenom:data.prenom, portable:data.portable}
                        await editContact(user)
                        Routeur.reload('/') //TECHNIQUE DE GROS BOURRIN PAS OPTI !!!!
                        setContacts([...contacts])
                    }
                }/>}
            </div>
        </>
    );
}
return (  
    <>
        <p>une erreur est survenue</p>
    </>
);
}
