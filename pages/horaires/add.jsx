import { Layout, AddEditHoraire } from 'components/horaires';

export default Add;

function Add() {
    return (
        <Layout>
            <h1>ajouter un horaire</h1>
            <AddEditHoraire />
        </Layout>
    );
}