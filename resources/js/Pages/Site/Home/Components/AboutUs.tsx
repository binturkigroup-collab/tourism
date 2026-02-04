import React from 'react';
import BlockProps from "@/Interfaces/Site/BlockProps";
import {gsap} from "gsap";

const AboutUs: React.FC<{aboutUs: BlockProps}> = ({aboutUs}) => {

    const aboutSectionRef = React.useRef<HTMLElement>(null);
    const aboutTextRef = React.useRef<HTMLDivElement>(null);
    const aboutImageRef = React.useRef<HTMLDivElement>(null);
    const aboutBadgeRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const ctx = gsap.context(() => {
            // About section animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: aboutSectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.fromTo(aboutSectionRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
            )
                .fromTo(aboutTextRef.current,
                    { opacity: 0, x: -50 },
                    { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
                    "-=0.4"
                )
                .fromTo(aboutImageRef.current,
                    { opacity: 0, x: 50 },
                    { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
                    "-=0.3"
                )
                .fromTo(aboutBadgeRef.current,
                    { opacity: 0, scale: 0 },
                    { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
                    "-=0.2"
                );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={aboutSectionRef}
            className="py-20"
        >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div ref={aboutTextRef}>
                        <h2 className="text-4xl font-bold mb-6 text-foreground">{aboutUs.title}</h2>
                        <p
                            className="text-xl text-muted-foreground mb-6 leading-relaxed"
                            dangerouslySetInnerHTML={{__html: aboutUs.description}}
                        >
                        </p>
                        {/*<p className="text-lg text-muted-foreground mb-8 leading-relaxed">*/}
                        {/*    Our team of experienced professionals combines traditional craftsmanship with*/}
                        {/*    cutting-edge technology to create structures that stand the test of time while*/}
                        {/*    meeting the evolving needs of our clients and communities.*/}
                        {/*</p>*/}
                        {/*<Link*/}
                        {/*    to="/about"*/}
                        {/*    className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 font-semibold hover:scale-105"*/}
                        {/*>*/}
                        {/*    Learn More About Us*/}
                        {/*    <ArrowRight className="ml-2 h-5 w-5"/>*/}
                        {/*</Link>*/}
                    </div>
                    <div ref={aboutImageRef} className="relative">
                        <img
                            // src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            src={`/file/blocks/${aboutUs.images[0].url}`}
                            alt="About Us"
                            className="rounded-lg w-full h-100 object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {/*<div ref={aboutBadgeRef}*/}
                        {/*     className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl">*/}
                        {/*    /!*<div className="text-3xl font-bold">25+</div>*!/*/}
                        {/*    /!*<div className="text-sm">Years of Excellence</div>*!/*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
