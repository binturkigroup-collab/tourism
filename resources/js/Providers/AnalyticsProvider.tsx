import { useEffect } from "react";
import { router } from "@inertiajs/react";

interface AnalyticsProviderProps {
    measurementId: string;
    children: React.ReactNode;
}

export default function AnalyticsProvider({
                                              measurementId,
                                              children,
                                          }: AnalyticsProviderProps) {
    // Load GA script once
    useEffect(() => {
        if (!measurementId) return;

        // Insert GA script dynamically
        const script1 = document.createElement("script");
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

        const script2 = document.createElement("script");
        script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}', { send_page_view: false });
    `;

        document.head.appendChild(script1);
        document.head.appendChild(script2);

        // Cleanup
        return () => {
            document.head.removeChild(script1);
            document.head.removeChild(script2);
        };
    }, [measurementId]);

    // Listen to Inertia navigation and send GA page_view
    useEffect(() => {
        const unregister = router.on("finish", (event) => {
            if (!measurementId) return;

            const url = window.location.pathname + window.location.search;

            // Send GA page_view event
            if (typeof window.gtag !== "undefined") {
                window.gtag("event", "page_view", {
                    page_path: url,
                    page_location: window.location.href,
                    page_title: document.title,
                });
            }
        });

        return () => {
            unregister();
        };
    }, [measurementId]);

    return <>{children}</>;
}
