import React from 'react';
import Contact from "@/models/Contact/Contact";
import {Head} from "@inertiajs/react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import ContactsContainer from "@/Components/Lists/ContactList/ContactsContainer";

const ContactList: React.FC<{contacts: Contact [], count: number}> = ({contacts, count}) => {
    return (
        <AdminLayout>
            <Head title={'Contacts'}></Head>
            <ContactsContainer contacts={contacts} count={count}></ContactsContainer>
        </AdminLayout>
    );
};

export default ContactList;
