import Image from "next/image"
import PageLayout from "../components/PageLayout"
import Link from "next/link"

const chapters = [
    {title: "Whats Good!!"},
    {title: "How to use this fitness plan?"},
    {title: "Training Red", dot: "red"},
    {title: "Training Black", dot: "black"},
    {title: "Training Green", dot: "green"},
    {title: "Training Schedule"},
    {title: "Reference Page"},
    {title: "Exercise Video Library",
        subtitles: [ "Chest", "Back", "Legs", "Shoulders"],
    },

]

const previews = [
    {
        src: "/intro-screenshot.jpeg",
        label: "Introduction",
    },
    {
        src: "/program-calendar.jpeg",
        label: "Program Calendar",
    },
    {
        src: "/exercise-video-library-preview.jpeg",
        label: "Exercise Video Library",
    },
    {
        src: "/preview-chest-videos.jpeg",
        label: "Chest Videos",
    },
    {
        src: "/preview-back-videos.jpeg",
        label: "Back Videos",
    },
    {
        src: "/preview-leg-videos.jpeg",
        label: "Leg Videos",
    },
    {
        src: "/preview-shoulder-videos.jpeg",
        label: "Shoulder Videos",
    },
]

export default function PreviewPage() {
    return (
        <PageLayout>
            <div className="px-4 sm:px-6 py-8 max-w-4x1 page-enter">

                <h1 className="text-2xl front-medium mb-2" style={{ color: "var(--text-main)" }}>Inside the Book </h1>
                <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
                    Take a look at what&apos;s waiting for you inside<strong style={{ color: "var(--text-main)" }}> Get Fit With Uncle John</strong>
                </p>

                {/* Chapter List*/}
                <section className="mb-10">
                    <h2 className="text-base font-medium mb-4" style={{ color: "var(--text-main)" }}>Chapters</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {chapters.map((chapter) => (
                            <div
                                key={chapter.title}
                                className="rounded-x1 p-4 hover-lift cursor-pointer"
                                style={{ color: "var(--accent)", border: "0.5px solid var(--border)" }}
                                >
                                <p className="text-sm font-medium flex items-center gap-2" style={{ color: "var(--text-on-accent)" }}>
                                    {chapter.dot === "red" && (
                                        <span className="w-2 h-2 rounded-full inline-block" style={{ background: "var(--gold-bright)" }} />

                                    )}
                                    {chapter.dot === "black" && (
                                        <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#1A0A08" }} />
                                        
                                    )}
                                    {chapter.dot === "green" && (
                                        <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#4CAF50" }} />
                                        
                                    )}
                                    {chapter.title}
                                </p>

                                {chapter.subtitles && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {chapter.subtitles.map((sub) => (
                                            <span
                                                key={sub}
                                                className="text-xs px-2 py-1 rounded-lg"
                                                style={{ background: "rgba(0,0,0,0.2)", color: "var(--gold-bright)" }}
                                                >
                                                    {sub}
                                                </span>
                                        ))}
                                        </div>
                                )}
                                </div>
                        ))}
                    </div>
                </section>

                {/* Preview Section */}
                <section className="mb-10">
                    <h2 className="text-base font-medium mb-4" style={{ color: "var(--text-main)" }}>Preview Pages</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {previews.map((preview) => (
                            <div
                                key={preview.src}
                                className="rounded-x1 overflow-hidden hover-lift"
                                style={{ background: "var(--accent)", border: "0.5px solid var(--border)" }}
                            >
                                <div className="relative w-full aspect-[4/3]">
                                    <Image
                                        src={preview.src}
                                        alt={preview.label}
                                        fill
                                        className="object-cover"
                                        />
                                </div>
                                <p className="text-sm font-medium px-4 py-3" style={{ color: "var(--text-on-accent)" }}>{preview.label}</p>
                                </div>
                        ))}
                    </div>
                </section>

                {/* CTA at the bottom */}
                <section className="text-center py-8" style={{ borderTop: "0.5px solid var (--border)" }}>
                    <h2 className="text-lg font-medium mb-2" style={{ color: "var(--text-main)" }}>Ready to get started?</h2>
                    <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
                        Get the full plan, all exercises, and the video library.
                    </p>
                    <Link 
                        href="/"
                        className="inline-block text-sm font-medium px-7 py-3 rounded-lg btn-animate"
                        style={{ background: "var(--accent)", color: "#fff" }}
                        >
                            Buy Now - $24.99
                        </Link>
                </section>

            </div>
        </PageLayout>
    )
}