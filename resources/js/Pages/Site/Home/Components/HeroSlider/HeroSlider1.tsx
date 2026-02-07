// import { useCallback, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SlideContent } from "./SliderContent";
import {cn} from "@/Pages/Site/lib/utils";
import BlockProps from "@/Interfaces/Site/BlockProps";

interface HeroSliderProps {
    slides: BlockProps [];
    autoplayDelay?: number;
}
const HeroSlider1: React.FC<HeroSliderProps> = ({
        slides,
        autoplayDelay = 5000,
    }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
    const fileURL = `/file/blocks`;

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            duration: 30,
        },
        [
            Autoplay({
                delay: autoplayDelay,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
            }),
        ]
    );

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                scrollPrev();
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                scrollNext();
            }
        },
        [scrollPrev, scrollNext]
    );

    return (
        <div
            className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Hero slider"
        >
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex h-[500px]">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.title}
                            className="flex-[0_0_100%] min-w-0 h-full relative"
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`Slide ${index + 1} of ${slides.length}`}
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700"
                                style={{ backgroundImage: `url(${fileURL}/${slide.images[0].url})` }}
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/50" />

                            {/* Content */}
                            <SlideContent
                                slide={slide}
                                isActive={selectedIndex === index}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 z-10",
                    "bg-white/20 hover:bg-white/30 backdrop-blur-sm",
                    "text-white p-3 rounded-full",
                    "transition-all duration-300",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "focus:outline-none focus:ring-2 focus:ring-white/50"
                )}
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>

            <button
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2 z-10",
                    "bg-white/20 hover:bg-white/30 backdrop-blur-sm",
                    "text-white p-3 rounded-full",
                    "transition-all duration-300",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "focus:outline-none focus:ring-2 focus:ring-white/50"
                )}
                aria-label="Next slide"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={cn(
                            "w-3 h-3 rounded-full transition-all duration-300",
                            "focus:outline-none focus:ring-2 focus:ring-white/50",
                            index === selectedIndex
                                ? "bg-white scale-110"
                                : "bg-white/50 hover:bg-white/70"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === selectedIndex ? "true" : undefined}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider1;
