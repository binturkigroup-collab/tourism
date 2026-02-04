import React from 'react';
import {usePage} from "@inertiajs/react";

const WhatsAppButton = () => {
    const {contactLinks} = usePage().props.links;

    function normalizePhone(phone: string) {
        return phone.replace(/\D/g, ""); // keep digits only
    }

    const phone = normalizePhone(
        contactLinks.find(cnt => cnt.name.toLowerCase() === 'phone')?.url
        || ''
    );

    const message = encodeURIComponent(
        "Hello, I’m interested in..."
    );

    return (
        <a
            href={`https://wa.me/${phone}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
                bg-[#e9f7f0] text-[#28b16d]
                w-40 h-14
                flex items-center justify-center
                rounded-2xl shadow-xl
                hover:scale-110 transition-transform
                cursor-pointer
                z-50
                p-4
            "
        >
            <p className="text-lg font-semibold me-auto">WhatsApp</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="32"
                height="32"
                fill="currentColor"
            >
                <path d="M16.001 3.2c-7.064 0-12.8 5.736-12.8 12.8 0 2.256.592 4.448 1.696 6.4L3.2 28.8l6.592-1.664c1.856.992 3.968 1.536 6.208 1.536 7.056 0 12.8-5.736 12.8-12.8s-5.744-12.672-12.8-12.672zm0 23.136c-1.92 0-3.776-.48-5.44-1.408l-.384-.224-3.92.992 1.056-3.824-.256-.4c-1.024-1.68-1.568-3.6-1.568-5.6 0-5.856 4.768-10.624 10.624-10.624s10.624 4.768 10.624 10.624-4.768 10.464-10.624 10.464zm5.856-7.808c-.32-.16-1.92-.96-2.208-1.072-.288-.128-.496-.16-.704.16-.208.32-.8 1.072-.992 1.28-.192.224-.384.256-.704.096-.32-.16-1.344-.496-2.56-1.6-.96-.864-1.6-1.92-1.792-2.24-.192-.32-.016-.496.144-.656.144-.144.32-.384.48-.576.16-.192.208-.32.32-.544.096-.224.048-.416-.016-.576-.064-.16-.704-1.696-.96-2.304-.256-.608-.512-.528-.704-.528-.192 0-.416-.032-.64-.032-.224 0-.576.08-.88.416-.304.32-1.152 1.12-1.152 2.72s1.184 3.168 1.344 3.392c.16.224 2.32 3.552 5.632 4.992.784.336 1.392.544 1.856.704.784.256 1.504.224 2.064.144.64-.096 1.92-.784 2.192-1.536.272-.736.272-1.376.192-1.536-.08-.16-.288-.256-.608-.416z"/>
            </svg>
        </a>
    );
};

export default WhatsAppButton;
