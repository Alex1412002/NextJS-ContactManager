import { useForm } from 'react-hook-form';
const EditContact = (props) => {
    const { register, handleSubmit, errors } = useForm();
    return (
        <>
            <div className="popup">
                <div className="editor">
                    <div className='editForm'>
                    <h2>Modifier Contact</h2>
                    <form onSubmit={handleSubmit(props.onSubmit)}>
                        <h3>Nom</h3>
                        <input type ='text'{...register("nom",{required: true})} defaultValue={props.user.nom}/>
                        <h3>Prenom</h3>
                        <input {...register("prenom",{required: true})} defaultValue={props.user.prenom}/>
                        <h3>Portable</h3>
                        <input {...register("portable",{required: true})} defaultValue={props.user.portable}/>
                        <p></p>
                        <button type="submit">Enregistrer</button>
                    </form>
                    </div>
                </div>
            </div>
        </>
      );
}
 
export default EditContact;