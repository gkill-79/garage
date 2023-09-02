import { useRouter } from 'next/router'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useState, useEffect } from 'react'

import { serviceService, userService, alertService } from 'services'
// composant AddEdit est utilisé à la fois pour ajouter et modifier des utilisateurs, il contient un formulaire construit avec la bibliothèque React Hook Form et est utilisé par la page d'ajout d'utilisateur et la page de modification d'utilisateur .

export { AddEditService }

function AddEditService(props) {
    const service = props?.service
    const router = useRouter()

    const [user, setUser] = useState(null)

    useEffect(() => {
        const subscription = userService.user.subscribe((x) => setUser(x))
        return () => subscription.unsubscribe()
    }, [])

    // Les règles de validation de formulaire sont définies avec la bibliothèque de validation de schéma Yup et transmises avec la fonction formOptionsReact Hook Form useForm()
    // form validation rules
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Le titre est requis'),
        description: Yup.string().required('Un contenu est requis'),
        price: Yup.string().required('Un prix est requis'),
        image: Yup.string().required('Une image est requise'),
    })
    const formOptions = { resolver: yupResolver(validationSchema) }

    // set default form values if in edit mode
    if (service) {
        formOptions.defaultValues = props.service
    }

    // get functions to build form with useForm() hook
    // La useForm()fonction hook renvoie un objet avec des méthodes pour travailler avec un formulaire, notamment l'enregistrement des entrées, la gestion de la soumission du formulaire, la réinitialisation du formulaire, l'accès à l'état du formulaire, l'affichage des erreurs et plus encore
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState

    // La onSubmitfonction est appelée lorsque le formulaire est soumis et valide, et crée ou met à jour un utilisateur en fonction du mode dans lequel il se trouve.

    async function onSubmit(data) {
        alertService.clear()
        try {
            // create or update service based on service prop
            let message
            if (service) {
                await serviceService.update(service.id, data)
                message = 'service modifié'
            } else {
                await serviceService.register(data)
                message = 'service ajouté'
            }

            // redirect to user list with success message
            router.push('/services')
            alertService.success(message, true)
        } catch (error) {
            alertService.error(error)
            console.error(error)
        }
    }

    if (user) {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="mb-3 col">
                        <label className="form-label">Titre</label>
                        <input
                            name="title"
                            type="text"
                            {...register('title')}
                            className={`form-control ${
                                errors.title ? 'is-invalid' : ''
                            }`}
                        />
                        <div className="invalid-feedback">
                            {errors.title?.message}
                        </div>
                    </div>
                    <div className="mb-3 col">
                        <label className="form-label">Description</label>
                        <textarea
                            name="description"
                            {...register('description')}
                            className={`form-control ${
                                errors.description ? 'is-invalid' : ''
                            }`}
                        ></textarea>
                        <div className="invalid-feedback">
                            {errors.description?.message}
                        </div>
                    </div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">Prix</label>
                    <input
                        name="price"
                        type="text"
                        {...register('price')}
                        className={`form-control ${
                            errors.price ? 'is-invalid' : ''
                        }`}
                    />
                    <div className="invalid-feedback">
                        {errors.price?.message}
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col">
                        <label className="form-label">Image</label>
                        <input
                            name="image"
                            type="text"
                            {...register('image')}
                            className={`form-control ${
                                errors.image ? 'is-invalid' : ''
                            }`}
                        />
                        <div className="invalid-feedback">
                            {errors.image?.message}
                        </div>
                    </div>
                </div>
                <input
                    name="userId"
                    type="hidden"
                    value={user.id}
                    {...register('userId')}
                />
                <div className="mb-3">
                    <button
                        type="submit"
                        disabled={formState.isSubmitting}
                        className="btn btn-primary me-2"
                    >
                        {formState.isSubmitting && (
                            <span className="spinner-border spinner-border-sm me-1"></span>
                        )}
                        Enregistrer
                    </button>
                    <button
                        onClick={() => reset(formOptions.defaultValues)}
                        type="button"
                        disabled={formState.isSubmitting}
                        className="btn btn-secondary"
                    >
                        Reset
                    </button>
                    <Link href="/services" className="btn btn-link">
                        Annuler
                    </Link>
                </div>
            </form>
        )
    }
}