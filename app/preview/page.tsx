import Image from "next/image"
import Sidebar from "../components/Sidebar"
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
        src: "/into-screenshot.jpeg",
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
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 px-6 py-8 max-w-4xl">

                <h1 className="text-2xl front-medium mb-2">Inside the Book </h1>
                <p className="text-sm text-gray-500 mb-8">Take a look at what&apos;s waiting for you inside<strong> Get Fit With Uncle John</strong>
                </p>

                {/* Chapter List*/}
                <section className="mb-10">
                    <h2 className="text-base font-medium mb-4">Chapters</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {chapters.map((chapter) => (
                            <div
                                key={chapter.title}
                                className="bg-white border border-gray-200 rounded-x1 p-4"
                                >
                                <p className="text-sm font-medium flex items-center gap-2">
                                    {chapter.dot === "red" && (
                                        <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />

                                    )}
                                    {chapter.dot === "black" && (
                                        <span className="w-2 h-2 rounded-full bg-black inline-block" />
                                        
                                    )}
                                    {chapter.dot === "green" && (
                                        <span className="w-2 h-2 rounded-full bg-green-600 inline-block" />
                                        
                                    )}
                                    {chapter.title}
                                </p>

                                {chapter.subtitles && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {chapter.subtitles.map((sub) => (
                                            <span
                                                key={sub}
                                                className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-lg"
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
                    <h2 className="text-base font-medium mb-4">Preview Pages</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {previews.map((preview) => (
                            <div
                                key={preview.src}
                                className="border border-gray-200 rounded-x1 overflow-hidden bg-white"
                            >
                                <div className="relative w-full aspect-[4/3]">
                                    <Image
                                        src={preview.src}
                                        alt={preview.label}
                                        fill
                                        className="object-cover"
                                        />
                                </div>
                                <p className="text-sm font-medium px-4 py-3">{preview.label}</p>
                                </div>
                        ))}
                    </div>
                </section>

                {/* CTA at the bottom */}
                <section className="text-center py-8 border-t border-gray-200">
                    <h2 className="text-lg font-medium mb-2">Ready to get started?</h2>
                    <p className="text-sm text-gray-500 mb-5">
                        Get the full plan, all exercises, and the video library.
                    </p>
                    <Link 
                        href="/"
                        className="inline-block bg-black text-white tex-sm font-medium px-7 py-3 rounded-lg hover:bg-gray-800 transistion-colors"
                        >
                            Buy Now - $24.99
                        </Link>
                </section>

            </main>
        </div>
    )
}