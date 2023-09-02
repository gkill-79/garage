import { Layout, AddEditService } from 'components/services';

export default Add;

function Add() {
    return (
        <Layout>
            <h1>ajouter un service</h1>
            <AddEditService />
        </Layout>
    );
}