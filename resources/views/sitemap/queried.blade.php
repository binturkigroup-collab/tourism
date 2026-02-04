<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml">
    @foreach($items as $key => $item)
        @php $item @endphp
        <url>
            <loc>{{ $item['urls'][0]['url'] }}</loc>
            <lastmod>{{ $item['lastmod'] }}</lastmod>

            @foreach($item['urls'] as $alt)
                <xhtml:link rel="alternate" hreflang="{{ $alt['lang'] }}" href="{{ $alt['url'] }}"/>
            @endforeach
        </url>
    @endforeach
</urlset>
