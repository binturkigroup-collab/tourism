import React from 'react';
import BlockProps from "@/Interfaces/Site/BlockProps";

const StorySection: React.FC<{story: BlockProps}> = ({story}) => {
    console.log("StorySection", story);
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6 text-foreground">{story.title}</h2>
                        <p
                            className="text-xl text-muted-foreground mb-6 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: story.description }}
                        >

                        </p>
                    </div>
                    <div>
                        <img
                            // src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            src={`/file/blocks/${story.images[0].url}`}
                            alt="Our Story"
                            className="rounded-lg w-full h-105 object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StorySection;
