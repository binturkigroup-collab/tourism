import {Award, Clock, Shield} from 'lucide-react';
import React from 'react';
import {useTranslation} from "react-i18next";

const Features = () => {
    const {t} = useTranslation();
    return (
        <section className="py-24 bg-secondary">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Shield,
                            title: t('support'),
                            description: t('supp-desc'),
                        },
                        {
                            icon: Award,
                            title: t('award'),
                            description: t('award-desc'),
                        },
                        {
                            icon: Clock,
                            title: "24/7 " + t('support'),
                            description: t('safety-desc'),
                        },
                    ].map((feature) => (
                        <div
                            key={feature.title}
                            className="text-center p-8 rounded-2xl bg-secondary-foreground/5 backdrop-blur-sm hover:bg-secondary-foreground/10 transition-all duration-300"
                        >
                            <div
                                className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                                <feature.icon className="w-8 h-8 text-primary"/>
                            </div>
                            <h3 className="font-heading text-xl font-semibold text-secondary-foreground mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-secondary-foreground/70">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
