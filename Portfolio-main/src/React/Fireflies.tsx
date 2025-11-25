import { useEffect, useRef } from "react";

const Fireflies = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const particles: Firefly[] = [];
        const particleCount = 50;

        class Firefly {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            alpha: number;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = -Math.random() * 0.5;
                this.size = Math.random() * 3 + 2;
                this.alpha = Math.random();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= 0.001;

                if (this.y < -10 || this.alpha <= 0) {
                    this.x = Math.random() * canvas.width;
                    this.y = canvas.height + 10;
                    this.vy = -Math.random() * 0.5;
                    this.alpha = 1;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(164, 118, 255, ${this.alpha})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Firefly());
        }

        let animationFrameId: number;

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
        />
    );
};

export default Fireflies;
