import React from 'react';
import BlockProps from "@/Interfaces/Site/BlockProps";

const MissionVisionSection: React.FC<{mission: BlockProps, vision: BlockProps}> = ({mission, vision}) => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="border border-border rounded-lg p-8">
                        <h2 className="text-3xl font-bold mb-6 text-secondary">{mission.title}</h2>
                        <p
                            className="text-lg text-muted-foreground/80 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: mission.description }}
                        >
                        </p>
                    </div>
                    <div className=" border border-border rounded-lg p-8">
                        <h2 className="text-3xl font-bold mb-6 text-secondary">{vision.title}</h2>
                        <p className="text-lg text-muted-foreground/80 leading-relaxed"
                           dangerouslySetInnerHTML={{ __html: vision.description }}
                        >
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionVisionSection;
