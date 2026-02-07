import React, { useEffect, useRef } from "react";
import BlockProps from "@/Interfaces/Site/BlockProps";
import {cn} from "@/Pages/Site/lib/utils";

interface SlideContentProps {
    slide: BlockProps;
    isActive: boolean;
}

export const SlideContent: React.FC<SlideContentProps> = ({ slide, isActive }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        const elements = contentRef.current.querySelectorAll("[data-animate]");

        elements.forEach((el, index) => {
            const htmlEl = el as HTMLElement;
            if (isActive) {
                htmlEl.style.opacity = "1";
                htmlEl.style.transform = "translateY(0)";
                htmlEl.style.transitionDelay = `${index * 150 + 300}ms`;
            } else {
                htmlEl.style.opacity = "0";
                htmlEl.style.transform = "translateY(30px)";
                htmlEl.style.transitionDelay = "0ms";
            }
        });
    }, [isActive]);

    return (
        <div className="relative h-full flex items-center justify-center">
            <div
                ref={contentRef}
                className="text-center text-white max-w-4xl px-4 md:px-8"
            >
                <h1
                    data-animate
                    className={cn(
                        "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight",
                        "transition-all duration-700 ease-out",
                        !isActive && "opacity-0 translate-y-8"
                    )}
                >
                    {slide.title}
                </h1>

                <h2
                    data-animate
                    className={cn(
                        "text-xl md:text-2xl lg:text-3xl font-light mb-6",
                        "transition-all duration-700 ease-out",
                        !isActive && "opacity-0 translate-y-8"
                    )}
                    dangerouslySetInnerHTML={{ __html: slide.brief }}
                />

                <p
                    data-animate
                    className={cn(
                        "text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto",
                        "text-white/90",
                        "transition-all duration-700 ease-out",
                        !isActive && "opacity-0 translate-y-8"
                    )}
                    dangerouslySetInnerHTML={{ __html: slide.description }}
                />
            </div>
        </div>
    );
};
