function Contact({user,supprimer,editer}){
    return ( 
        <div className="contact">
            <div className="nom">
                <p>{user.nom}</p>
            </div>
            <div className="prenom">
                <p>{user.prenom}</p>
            </div>
            <div className="numero">
                <p>{user.portable}</p>
            </div>
            <div className="suppr">
                <button onClick={editer}>editer</button>
                <p></p>
                <button onClick={supprimer}>supprimer</button>
            </div>
        </div>
    );
}
export default Contact;