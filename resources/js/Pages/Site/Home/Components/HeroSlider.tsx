
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import BlockProps from "@/Interfaces/Site/BlockProps";
import {useTranslation} from "react-i18next";
import {Link, usePage} from "@inertiajs/react";

const HeroSlider: React.FC<{slides: BlockProps []}> = ({slides}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const fileURL = `/file/blocks`;
    const {t} = useTranslation();
    const {lang} = usePage().props;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    useEffect(() => {
        // Animate slide transition
        slideRefs.current.forEach((slide, index) => {
            if (slide) {
                gsap.to(slide, {
                    opacity: index === currentSlide ? 1 : 0,
                    duration: 1,
                    ease: "power2.inOut"
                });
            }
        });

        // Animate content
        const currentContent = contentRefs.current[currentSlide];
        if (currentContent) {
            const tl = gsap.timeline();
            const elements = currentContent.querySelectorAll('h1, h2, p, button');

            tl.fromTo(elements,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    delay: 0.3
                }
            );
        }
    }, [currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative h-[500px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    ref={(el) => (slideRefs.current[index] = el)}
                    className="absolute inset-0 opacity-0"
                >
                    <div
                        className="h-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${fileURL}/${slide.images[0].url})` }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <div className="relative h-full flex items-center justify-center">
                            <div
                                ref={(el) => (contentRefs.current[index] = el)}
                                className="text-center text-white max-w-4xl px-4"
                            >
                                <h1 className="text-4xl md:text-4xl font-bold mb-4 !leading-[1.5]">
                                    {slide.title}
                                </h1>
                                <h2 className="text-2xl md:text-3xl font-light mb-6" dangerouslySetInnerHTML={{ __html: slide.brief }} >
                                    {/*{slide.brief}*/}
                                </h2>
                                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: slide.description }} >
                                    {/*{slide.description}*/}
                                </p>
                                {/*<Link href={`/${lang}/block/about-d-s-h`}>*/}
                                {/*    <button*/}
                                {/*        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">*/}
                                {/*        {t('more')}*/}
                                {/*    </button>*/}
                                {/*</Link>*/}

                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Slide Indicators */}
            <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex ${lang === 'ar' ? "space-x-reverse" : ""}  space-x-3`}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide ? 'bg-white' : 'bg-white/50'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
