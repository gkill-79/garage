import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEditService } from 'components/services';
import { Spinner } from 'components';
import { serviceService, alertService } from 'services';

export default Edit;

function Edit() {
    const router = useRouter();
    const [service, setService] = useState(null);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch service and set default form values if in edit mode
        serviceService.getById(id)
            .then((x) => setService(x))
            .catch(alertService.error)
    }, [router]);

    return (
        <Layout>
            <h1>modifier service</h1>
            {service ? <AddEditService horaire={service} /> : <Spinner />}
        </Layout>
    );
}