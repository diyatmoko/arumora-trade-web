import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: "power3.out", duration: 0.7 });

export { gsap, ScrollTrigger };
