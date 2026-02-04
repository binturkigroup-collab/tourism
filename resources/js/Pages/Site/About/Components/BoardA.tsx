import React from 'react';
import {BoardMember} from "@/Pages/Site/About/Components/BoardMember";
import boardMember1 from "@/assets/board-member-1.jpg";
import boardMember2 from "@/assets/board-member-2.jpg";
import boardMember3 from "@/assets/board-member-3.jpg";
// import {motion} from "framer-motion";
import BlockProps from "@/Interfaces/Site/BlockProps";
import {useTranslation} from "react-i18next";
import Container from "typedi";
import "reflect-metadata";
import BlockService from "@/Services/BlockService/BlockService";

const BoardA: React.FC<{directors: BlockProps []}> = ({directors}) => {
    const {t} = useTranslation();
    const blockService = Container.get(BlockService);
    return (
        <section
            // initial={{opacity: 0, y: 30}}
            // animate={{opacity: 1, y: 0}}
            // transition={{duration: 0.8, delay: 0.4}}
            className="mb-24"
        >
            <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                    {t('board-title')}
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    {t('board-hero')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {directors.map((dir, index) => (
                    <BoardMember
                        key={`dir-${dir.title}-${index}`}
                        name={dir.title}
                        title={dir.brief}
                        image={blockService.getImageUrl(dir.images[0].url)}
                        delay={0.6 + 0.1*index}
                    />
                ))}
            </div>

            {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">*/}
            {/*    <BoardMember*/}
            {/*        name="Ahmed Al-Mansouri"*/}
            {/*        title="Chairman & CEO"*/}
            {/*        image={boardMember1}*/}
            {/*        delay={0.6}*/}
            {/*    />*/}
            {/*    <BoardMember*/}
            {/*        name="Layla Hassan"*/}
            {/*        title="Chief Operating Officer"*/}
            {/*        image={boardMember2}*/}
            {/*        delay={0.7}*/}
            {/*    />*/}
            {/*    <BoardMember*/}
            {/*        name="Michael Richards"*/}
            {/*        title="Chief Financial Officer"*/}
            {/*        image={boardMember3}*/}
            {/*        delay={0.8}*/}
            {/*    />*/}
            {/*</div>*/}
        </section>
    );
};

export default BoardA;
