import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Layout } from "components/occasions";
import { Spinner } from "components";
import { occasionService, alertService } from "services";

export default Occasion;

function Occasion() {
  const router = useRouter();
  const [occasion, setOccasion] = useState(null);

  // recupere l id dans le query du chemin
  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    // fetch occasion and set default form values if in edit mode
    occasionService
      .getById(id)
      .then((x) => setOccasion(x))
      .catch(alertService.error);
  }, [router]);

  {
    /* remplacer le addeditoccasion et creer un composant l'occasion en plein pages */
  }
  {
    if (occasion) {
      return (
        <Layout>
          <>
            <h1>{occasion.marque} {occasion.modele}</h1>
            <h2>{occasion.prix} €</h2>
            <p>{occasion.kilometre} {occasion.place} {occasion.carburant} {occasion.annee}</p>
            <div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={`/img/${occasion.image1}`} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={`/img/${occasion.image2}`} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={`/img/${occasion.image3}`} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
          </>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <Spinner />
        </Layout>
      );
    }
  }
}