<!DOCTYPE html>
<html
    lang="{{ str_replace('_', '-', app()->getLocale()) }}"
{{--    dir="{{app()->getLocale() === 'ar' ? 'ltr' : 'rtl'}}"--}}
>
    <head>
        @inertiaHead
        @stack('seo')
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

{{--        @php dd($page) @endphp--}}



{{--        <title inertia>{{ config('app.name', 'Prestige Palace') }}</title>--}}
{{--        <title>Prestige Palace | Premium Real Estate in Dubai, UAE</title>--}}
{{--        <meta name="description" content="Discover luxury real estate in Dubai with top developers like Emaar, Damac, and Nakheel. Browse premium properties, off-plan projects, and investment opportunities." />--}}
        @if(!empty($page['props']['seo']))
            @push('seo')
            <title>{{ $page['props']['seo']['title'] . " | " . config('app.name', 'Prestige Property - PPP Real Estate Agency') ?? config('app.name', 'Prestige Property - PPP Real Estate Agency') }}</title>

            <meta name="description" content="{{ $page['props']['seo']['description'] ?? '' }}">
            @if(!empty($page['props']['seo']['schema']))
                <script type="application/ld+json">
                    {!!$page['props']['seo']['schema'] !!}
                </script>
            @endif
            @endpush
        @else
            <title inertia>{{ config('app.name', 'Prestige Property - PPP Real Estate Agency') }}</title>
        @endif

        <meta name="keywords" content="Prestige, Prestige Palace, Prestige Palace Property,
        Dubai real estate, luxury properties Dubai, Prestige Property - PPP Real Estate Agency,
        Luxury Real Estate owner, Prestige Properties
        off-plan projects, Dubai apartments, Dubai villas, investment properties UAE" />
        <meta name="author" content="Prestige Palace" />

        <meta property="og:title" content="Prestige Property - PPP Real Estate Agency | Prestige Palace | Premium Real Estate in Dubai, UAE" />
        <meta property="og:description" content="Discover luxury real estate in Dubai with top developers like Emaar, Damac, and Nakheel. Browse premium properties and investment opportunities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prestigepropertydxb.com/" />
        <meta property="og:image" content="https://prestigepropertydxb.com/og-image.png" />
        <meta property="og:site_name" content="Prestige Property - PPP Real Estate Agency" />
        <meta property="og:locale" content="en_AE" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PrestigePalace" />
        <meta name="twitter:title" content="Prestige Property - PPP Real Estate Agency" />
        <meta name="twitter:description" content="Discover luxury real estate in Dubai with top developers like Emaar, Damac, and Nakheel." />
        <meta name="twitter:image" content="https://prestigepropertydxb.com/og-image.png" />


        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="{{asset('favicon.ico')}}" />



        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5K7N6DNN');</script>
        <!-- End Google Tag Manager -->

        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ED6EPVXVLC"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ED6EPVXVLC');
        </script>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])


        <!-- Structured Data - Organization -->
{{--        @verbatim--}}
{{--        <script type="application/ld+json">--}}
{{--            {--}}
{{--              "@context": "https://schema.org",--}}
{{--              "@type": "RealEstateAgent",--}}
{{--              "name": "Prestige Palace",--}}
{{--              "description": "Premium real estate agency specializing in luxury properties in Dubai, UAE",--}}
{{--              "url": "https://prestigepropertydxb.com",--}}
{{--              "logo": "https://prestigepropertydxb.com/logo.png",--}}
{{--              "address": {--}}
{{--                "@type": "PostalAddress",--}}
{{--                "addressLocality": "Dubai",--}}
{{--                "addressCountry": "AE"--}}
{{--              },--}}
{{--              "contactPoint": {--}}
{{--                "@type": "ContactPoint",--}}
{{--                "telephone": "+971-4-123-4567",--}}
{{--                "contactType": "sales",--}}
{{--                "email": "info@prestigepropertydxb.com"--}}
{{--              },--}}
{{--              "sameAs": []--}}
{{--            }--}}
{{--        </script>--}}
{{--        @endverbatim--}}
    </head>
    <body class="font-sans antialiased">
        @inertia
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5K7N6DNN"
                          height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
        @if($page['component'] === 'Site/Properties/Properties')
            <div style="display:none; visibility:hidden;">
                @foreach ($page['props']['properties'] as $property)
                    <a href="{{ url('/' . app()->getLocale() . '/properties/' . $property['slug']) }}">{{ $property['title'] }}</a>
                @endforeach
            </div>
        @endif

        @if($page['component'] === 'Site/Projects/Projects')
            <div style="display:none; visibility:hidden;">
                @foreach ($page['props']['projects'] as $project)
                    <a href="{{ url('/' . app()->getLocale() . '/projects/' . $project['slug']) }}">{{ $project['title'] }}</a>
                @endforeach
            </div>
        @endif

        @if($page['component'] === 'Site/Developers/Developers')
            <div style="display:none; visibility:hidden;">
                @foreach ($page['props']['developers'] as $developer)
                    <a href="{{ url('/' . app()->getLocale() . '/projects?developerSlug=' . $developer['slug']) }}">{{ $developer['title'] }}</a>
                @endforeach
            </div>
        @endif

        @if($page['component'] === 'Site/Communities/Communities')
            <div style="display:none; visibility:hidden;">
                @foreach ($page['props']['communities'] as $community)
                    <a href="{{ url('/' . app()->getLocale() . '/properties?communitySlug=' . $community['slug']) }}">{{ $community['title'] }}</a>
                @endforeach
            </div>
        @endif
    </body>
</html>
