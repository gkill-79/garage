import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEditOccasion } from 'components/occasions';
import { Spinner } from 'components';
import { occasionService, alertService } from 'services';

export default Edit;

function Edit() {
    const router = useRouter();
    const [occasion, setOccasion] = useState(null);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch occasion and set default form values if in edit mode
        occasionService.getById(id)
            .then((x) => setOccasion(x))
            .catch(alertService.error)
    }, [router]);

    return (
        <Layout>
            <h1>modifier occasion</h1>
            {occasion ? <AddEditOccasion occasion={occasion} /> : <Spinner />}
        </Layout>
    );
}