const chapters = [
    {title: "Whats Good!!"},
    {title: "How to use this fitness plan?"},
    {title: "Training Red", dot: "red"},
    {title: "Training Black", dot: "black"},
    {title: "Training Green", dot: "green"},
    {title: "Training Schedule"},
    {title: "Reference Page"},
    {title: "Exercise Video Library",
        subtitles: [ "Chest", "Back", "Legs", "Shoulders"]
    },
]

export default function Chapters() {
    return(
        <section className="px-6 py-8 border-b border-gray-200">

      <h2 className="text-base font-medium mb-4">What's inside</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {chapters.map((chapter) => (
          <div
            key={chapter.title}
            className="bg-white border border-gray-200 rounded-xl p-4"
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
    )
}