import React from 'react';
import BlockProps from "@/Interfaces/Site/BlockProps";
import {Head, Link, usePage} from "@inertiajs/react";
import HeaderLayout from "@/Layouts/Site/HeaderLayout";
import {Container} from "typedi";
import BlockService from "@/Services/BlockService/BlockService";
import "reflect-metadata";
import {Button} from "@/Pages/Site/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {useTranslation} from "react-i18next";

const BlogDetails: React.FC<{blog: BlockProps}> = ({blog}) => {
    const blockService = Container.get(BlockService);
    const {t} = useTranslation();
    const {lang} = usePage().props;
    return (
        <HeaderLayout>
            <Head title={blog.title} />

            <div className="container mx-auto px-4 py-12">
                <Button variant="ghost" asChild className="mb-6">
                    <Link href={`/${lang}/blog`} className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        {t('back-to-blogs')}
                    </Link>
                </Button>

                <article className="max-w-3xl mx-auto">
                    <div className="aspect-video overflow-hidden rounded-lg mb-8">
                        <img
                            src={blockService.getImageUrl(blog.images[0].url)}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h1 className="text-3xl font-bold text-foreground mb-6">
                        {blog.title}
                    </h1>

                    <p className="text-sm text-muted-foreground mb-6 font-bold">
                        {blog.startDate}
                    </p>

                    <p
                        className="text-muted-foreground leading-relaxed whitespace-pre-line"
                        dangerouslySetInnerHTML={{__html: blog.description}}
                    >
                        {/*{blog.description}*/}
                    </p>
                </article>
            </div>
        </HeaderLayout>
    );
};

export default BlogDetails;
