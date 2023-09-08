import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Layout, AddEditPrestation } from "components/prestations";
import { Spinner } from "components";
import { prestationService, alertService } from "services";

export default Edit;

function Edit() {
  const router = useRouter();
  const [prestation, setPrestation] = useState(null);

  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    // fetch prestation and set default form values if in edit mode
    prestationService
      .getById(id)
      .then((x) => setPrestation(x))
      .catch(alertService.error);
  }, [router]);

  return (
    <Layout>
      <h1>modifier prestation</h1>
      {prestation ? <AddEditPrestation prestation={prestation} /> : <Spinner />}
    </Layout>
  );
}
