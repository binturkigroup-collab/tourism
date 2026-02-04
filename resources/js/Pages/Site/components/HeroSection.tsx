import { Button } from "@/Pages/Site/components/ui/button";
import { Github, Linkedin, Mail, Smartphone } from "lucide-react";
import MenuLink from "@/models/Link/MenuLink";
import CustomIcon from "@/Components/Icon/Icon";
import React from "react";
import CustomLinks from "@/Pages/Site/components/CustomLinks";

const HeroSection: React.FC<{socialLinks: MenuLink [], contactLinks: MenuLink []}> = ({socialLinks, contactLinks}) => {

    return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-subtle px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Full-Stack Developer
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2">
            Building robust web applications with
          </p>
          <p className="text-lg md:text-xl text-accent font-medium mb-8">
            Laravel • Node.js • React • Angular
          </p>
        </div>

        <div className="mb-12 animate-fade-in-delay">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Passionate about creating efficient, scalable solutions with modern technologies.
            Experienced in CI/CD pipelines, version control, and agile development practices.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
            <a href="#projects">
                <Button variant="hero" size="lg" className="group">
                    View My Work
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Button>
            </a>
            <CustomLinks socialLinks={socialLinks} contactLinks={contactLinks}></CustomLinks>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
