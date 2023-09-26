import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";
import { occasionService, alertService, userService } from "services";
// composant AddEdit est utilisé à la fois pour ajouter et modifier des horaires, il contient un formulaire construit avec la bibliothèque React Hook Form et est utilisé par la page d'ajout d'utilisateur et la page de modification d'utilisateur .

export { AddEditOccasion };

function AddEditOccasion(props) {
  const occasion = props?.occasion;
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  const handleUpload = async () => {
    try {
      if (selectedFiles.length < 3) return;
      for (let i = 0; i < 3; i++) {
        const formData = new FormData();
        formData.append("image", selectedFiles[i]);
        const { data } = await axios.post("/api/fileupload", formData);
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // Les règles de validation de formulaire sont définies avec la bibliothèque de validation de schéma Yup et transmises avec la fonction formOptionsReact Hook Form useForm()
  // form validation rules
  const validationSchema = Yup.object().shape({
    marque: Yup.string().required("Un contenu est requis"),
    model: Yup.string().required("Un contenu est requis"),
    prix: Yup.string().required("Un contenu est requis"),
    kilometre: Yup.string().required("Un contenu est requis"),
    place: Yup.string().required("Un contenu est requis"),
    carburant: Yup.string().required("Un contenu est requis"),
    annee: Yup.string().required("Un contenu est requis"),
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
    data.image1 = selectedFiles[0].name;
    data.image2 = selectedFiles[1].name;
    data.image3 = selectedFiles[2].name;
    alertService.clear();
    try {
      // create or update event based on event prop
      let message;
      if (occasion) {
        await occasionService.update(occasion.id, data);
        message = "occasion modifiée";
      } else {
        await occasionService.register(data);
        message = "occasion ajoutée";
      }

      // redirect to user list with success message
      router.push("/occasions");
      alertService.success(message, true);
    } catch (error) {
      alertService.error(error);
      console.error(error);
    }
  }
  if (user) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="mb-3 col">
            <label className="form-label">Marque</label>
            <input
              name="marque"
              type="text"
              {...register("marque")}
              className={`form-control ${errors.marque ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.marque?.message}</div>
          </div>
          <div className="mb-3 col">
            <label className="form-label">Modéle</label>
            <input
              name="model"
              type="text"
              {...register("model")}
              className={`form-control ${errors.model ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.model?.message}</div>
          </div>
          <div className="mb-3 col">
            <label className="form-label">Prix</label>
            <input
              name="prix"
              type="number"
              {...register("prix")}
              className={`form-control ${errors.prix ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.prix?.message}</div>
          </div>
          <div className="mb-3 col">
            <label className="form-label">Kilométres</label>
            <input
              name="kilometre"
              type="number"
              {...register("kilometre")}
              className={`form-control ${errors.kilometre ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.kilometre?.message}</div>
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col">
            <label className="form-label">Places</label>
            <input
              name="place"
              type="number"
              {...register("place")}
              className={`form-control ${errors.place ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.place?.message}</div>
          </div>
          <div className="mb-3 col">
            <label className="form-label">Carburant</label>
            <input
              name="carburant"
              type="text"
              {...register("carburant")}
              className={`form-control ${errors.carburant ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.carburant?.message}</div>
          </div>
          <div className="mb-3 col">
            <label className="form-label">Année</label>
            <input
              name="annee"
              type="number"
              {...register("annee")}
              className={`form-control ${errors.annee ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.annee?.message}</div>
          </div>
          <input
            name="userId"
            type="hidden"
            value={user?.id}
            {...register("userId")}
          />
          <div className="row">
            <div className="mb-3 col">
              <div className="max-w-4xl mx-auto p-20 space-y-6">
                <label>
                  <input
                    type="file"
                    hidden
                    onChange={({ target }) => {
                      if (target.files) {
                        const file = target.files[0];
                        setSelectedImages((selectedImages) => [
                          ...selectedImages,
                          URL.createObjectURL(file),
                        ]);
                        setSelectedFiles((selectedFiles) => [
                          ...selectedFiles,
                          file,
                        ]);
                      }
                    }}
                  />
                  <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                    {selectedImages[0] ? (
                      <img src={selectedImages[0]} alt="" />
                    ) : (
                      <span className="btn btn-primary me-2">
                        Choisir Image 1
                      </span>
                    )}
                  </div>
                </label>
              </div>
            </div>
            <div className="mb-3 col">
              <div className="max-w-4xl mx-auto p-20 space-y-6">
                <label>
                  <input
                    type="file"
                    hidden
                    onChange={({ target }) => {
                      if (target.files) {
                        const file = target.files[0];
                        setSelectedImages((selectedImages) => [
                          ...selectedImages,
                          URL.createObjectURL(file),
                        ]);
                        setSelectedFiles((selectedFiles) => [
                          ...selectedFiles,
                          file,
                        ]);
                      }
                    }}
                  />
                  <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                    {selectedImages[1] ? (
                      <img src={selectedImages[1]} alt="" />
                    ) : (
                      <span className="btn btn-primary me-2">
                        Choisir Image 2
                      </span>
                    )}
                  </div>
                </label>
              </div>
            </div>
            <div className="mb-3 col">
              <div className="max-w-4xl mx-auto p-20 space-y-6">
                <label>
                  <input
                    type="file"
                    hidden
                    onChange={({ target }) => {
                      if (target.files) {
                        const file = target.files[0];
                        setSelectedImages((selectedImages) => [
                          ...selectedImages,
                          URL.createObjectURL(file),
                        ]);
                        setSelectedFiles((selectedFiles) => [
                          ...selectedFiles,
                          file,
                        ]);
                      }
                    }}
                  />
                  <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                    {selectedImages[2] ? (
                      <img src={selectedImages[2]} alt="" />
                    ) : (
                      <span className="btn btn-primary me-2">
                        Choisir Image 3
                      </span>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              disabled={
                formState.isSubmitting || Object.keys(selectedFiles).length < 3
              }
              onClick={handleUpload}
              className="btn btn-primary me-2"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm me-1"></span>
              )}
              {selectedFiles.length < 3 && (
                <span className="me-1">Sélectionnez les 3 images avant d'</span>
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
            <Link href="/events" className="btn btn-link">
              Annuler
            </Link>
          </div>
        </div>
      </form>
    );
  }
}