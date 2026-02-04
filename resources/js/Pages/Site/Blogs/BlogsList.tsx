import React from 'react';
import HeaderLayout from "@/Layouts/Site/HeaderLayout";
import {Head, Link, usePage} from "@inertiajs/react";
import BlockProps from "@/Interfaces/Site/BlockProps";
import {Card, CardContent} from "@/Pages/Site/components/ui/card";
import {Container} from "typedi";
import "reflect-metadata";
import BlockService from "@/Services/BlockService/BlockService";
import {useTranslation} from "react-i18next";

const BlogsList: React.FC<{blogs: BlockProps []}> = ({blogs}) => {
    const blockService = Container.get(BlockService);
    const {t} = useTranslation();
    const {lang} = usePage().props;
    const strippedHTML = (html: string) => {
        return html.replace(/<[^>]+>/g, '');
    }
    return (
        <HeaderLayout>
            <Head title={'Blogs'} />
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-foreground mb-8">{t('latest-blogs')}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <Link key={blog.id} href={`/${lang}/blog/${blog.slug}`}>
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                                {blog.images.length > 0 && <div className="aspect-video overflow-hidden">
                                    <img
                                        src={blockService.getImageUrl(blog.images[0].url)}
                                        alt={blog.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>}
                                <CardContent className="p-4">
                                    <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                                        {blog.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground mb-6 font-bold">
                                        {blog.startDate}
                                    </p>

                                    <div
                                        className="text-muted-foreground text-sm line-clamp-3 overflow-hidden"
                                        dangerouslySetInnerHTML={{__html: blog.description}}
                                    ></div>
                                    {/*<p*/}

                                    {/*>*/}


                                    {/*    /!*{strippedHTML(blog.description)}*!/*/}
                                    {/*</p>*/}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </HeaderLayout>
    );
};

export default BlogsList;
