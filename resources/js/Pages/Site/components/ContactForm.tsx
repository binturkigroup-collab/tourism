import React from 'react';
import {Button} from "@/Pages/Site/components/ui/button";
import {Card} from "@/Pages/Site/components/ui/card";

const ContactForm = () => {
    return (
        <Card className="p-8 bg-gradient-primary border-0 text-primary-foreground shadow-glow">
            <h3 className="text-2xl font-semibold mb-6">Project Inquiry</h3>

            <div className="space-y-4 mb-6">
                <p className="text-primary-foreground/90">
                    Looking for a developer who can handle both frontend and backend?
                    I'd love to discuss your project requirements.
                </p>

                <ul className="space-y-2 text-primary-foreground/80">
                    <li className="flex items-center">
                        <span className="mr-3">✓</span>
                        Full-stack development
                    </li>
                    <li className="flex items-center">
                        <span className="mr-3">✓</span>
                        API design & integration
                    </li>
                    <li className="flex items-center">
                        <span className="mr-3">✓</span>
                        CI/CD setup & optimization
                    </li>
                    <li className="flex items-center">
                        <span className="mr-3">✓</span>
                        Code review & consulting
                    </li>
                </ul>
            </div>

            <Button
                variant="secondary"
                className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
                Start a Conversation
            </Button>
        </Card>
    );
};

export default ContactForm;
