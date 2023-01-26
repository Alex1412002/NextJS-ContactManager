import { useForm } from 'react-hook-form';

const NewContactForm = (props) => {
    const { register, handleSubmit, errors } = useForm();
    return (
        <>
            <div className="newcontact">
                <div className="form">
                    <h2>Nouveau Contact</h2>
                    <form onSubmit={handleSubmit(props.onSubmit)}>
                        <h3>Nom</h3>
                        <input {...register("nom",{required: true})}/>
                        <h3>Prenom</h3>
                        <input {...register("prenom",{required: true})}/>
                        <h3>Portable</h3>
                        <input {...register("portable",{required: true})}/>
                        <p></p>
                        <button type="submit">Enregistrer</button>
                    </form>
                </div>
            </div>
        </>
     );
}

export default NewContactForm ;