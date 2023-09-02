import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


import { occasionService, alertService } from 'services';
// composant AddEdit est utilisé à la fois pour ajouter et modifier des horaires, il contient un formulaire construit avec la bibliothèque React Hook Form et est utilisé par la page d'ajout d'utilisateur et la page de modification d'utilisateur .

export { AddEditOccasion };

function AddEditOccasion(props) {
    const occasion = props?.occasion;
    const router = useRouter();

    // Les règles de validation de formulaire sont définies avec la bibliothèque de validation de schéma Yup et transmises avec la fonction formOptionsReact Hook Form useForm()
    // form validation rules 
    const validationSchema = Yup.object().shape({
       marque: Yup.string()
        .required('Un contenu est requis'), 
        model: Yup.string()
        .required('Un contenu est requis'),
        prix: Yup.string()
        .required('Un contenu est requis'),
        kilometre: Yup.string()
        .required('Un contenu est requis'),
        place: Yup.string()
        .required('Un contenu est requis'),
        carburant: Yup.string()
        .required('Un contenu est requis'),
        annee: Yup.string()
        .required('Un contenu est requis'),
        image1: Yup.string()
        .required('Un contenu est requis'),
        image2: Yup.string()
        .required('Un contenu est requis'),
        image3: Yup.string()
        .required('Un contenu est requis'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (occasion) {
        formOptions.defaultValues = props.occasion;
    }

    // get functions to build form with useForm() hook
    // La useForm()fonction hook renvoie un objet avec des méthodes pour travailler avec un formulaire, notamment l'enregistrement des entrées, la gestion de la soumission du formulaire, la réinitialisation du formulaire, l'accès à l'état du formulaire, l'affichage des erreurs et plus encore
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    // La onSubmitfonction est appelée lorsque le formulaire est soumis et valide, et crée ou met à jour un utilisateur en fonction du mode dans lequel il se trouve.

    async function onSubmit(data) {
        alertService.clear();
        try {
            // create or update event based on event prop
            let message;
            if (occasion) {
                await occasionService.update(occasion.id, data);
                message = 'occasion modifiée';
            } else {
                await occasionService.register(data);
                message = 'occasion ajoutée';
            }

            // redirect to user list with success message
            router.push('/horaires');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">Jour</label>
                    <input name="jour" type="text" {...register('jour')} className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.jour?.message}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">Début matin</label>
                    <input
                    name="debut_am"
                    {...register("debut_am")}
                    className={`form-control ${errors.debut_am ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errors.debut_am?.message}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">Fin matin</label>
                    <input
                    name="fin_am"
                    {...register("fin_am")}
                    className={`form-control ${errors.fin_am ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errors.fin_am?.message}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">Fermeture matin</label>
                    <input
                    name="fermeture_am"
                    defaultValue={0}
                    {...register("fermeture_am")}
                    className={`form-control ${errors.fermeture_am ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errors.fermeture_am?.message}</div>
                </div>
            </div>
            <div className="row">
                
                <div className="mb-3 col">
                    <label className="form-label">Début aprés-midi</label>
                    <input
                    name="debut_pm"
                    {...register("debut_pm")}
                    className={`form-control ${errors.debut_pm ? "is-invalid" : ""}`}
                     />
                    <div className="invalid-feedback">{errors.debut_pm?.message}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">Fin aprés-midi</label>
                    <input
                    name="fin_pm"
                    {...register("fin_pm")}
                    className={`form-control ${errors.fin_pm ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errors.fin_pm?.message}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">Fermeture aprés-midi</label>
                    <input
                    name="fermeture_pm"
                     defaultValue={0}
                    {...register("fermeture_pm")}
                    className={`form-control ${errors.fermeture_pm ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errors.fermeture_pm?.message}</div>
                </div>
                <div className="mb-3">
                    <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Enregistrer
                    </button>
                    <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                    <Link href="/events" className="btn btn-link">Annuler</Link>
                </div>
            </div>    
        </form>
    );
}