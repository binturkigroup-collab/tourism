// import { motion } from "framer-motion";

interface BoardMemberProps {
    name: string;
    title: string;
    image: string;
    delay: number;
}

export const BoardMember = ({ name, title, image, delay }: BoardMemberProps) => {
    return (
        <div
            // initial={{ opacity: 0, y: 30 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
            className="group"
        >
            <div className="relative overflow-hidden rounded-2xl shadow-card-luxury transition-all duration-500 hover:shadow-luxury">
                <div className="aspect-square overflow-hidden">
                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
                <div className="p-6 text-center bg-card">
                    <h3 className="text-2xl font-bold text-secondary mb-2">{name}</h3>
                    <p className="text-primary-foreground/80" dangerouslySetInnerHTML={{__html: title}}></p>
                </div>
            </div>
        </div>
    );
};
