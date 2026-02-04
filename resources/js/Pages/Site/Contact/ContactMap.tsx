import React from 'react';
const ContactMap = () => {
    return (
        <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Location</h3>
            <div className="mt-4 rounded-lg overflow-hidden border border-border">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57773.50571307003!2d55.10326292167965!3d25.08024000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b3c6b0e3d0b%3A0x3e5f6b3c6b0e3d0b!2sDubai%20Marina%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Dubai Marina Location"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactMap;
