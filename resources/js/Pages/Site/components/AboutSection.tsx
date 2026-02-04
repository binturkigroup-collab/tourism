import { Card } from "@/Pages/Site/components/ui/card";
import React from "react";
import {Block} from "@/models/block/Block";
import BlockProps from "@/Interfaces/Site/BlockProps";

const AboutSection: React.FC<{aboutMe: BlockProps}> = ({aboutMe}) => {
  return (
    <section className="py-20 px-6 bg-gradient-subtle">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {aboutMe.title}
          </h2>
          <p className="text-xl text-muted-foreground" dangerouslySetInnerHTML={{ __html: aboutMe.brief }} >

          </p>
        </div>

        <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-border shadow-card">
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: aboutMe.description }} >

          </div>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;
