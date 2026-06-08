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
        <section 
            className="px-6 py-8"
            style={{ background: "var(--bg)", borderBottom: "0.5px solid var(--border)" }}
            >

      <h2 className="text-base font-medium mb-4" style={{ color: "var(--text-main)" }}>
        What&apos;s inside
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {chapters.map((chapter) => (
          <div
            key={chapter.title}
            className="rounded-xl p-4"
            style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
          >
            <p className="text-sm font-medium flex items-center gap-2" style={{ color: "var(--text-main)" }}>
              {chapter.dot === "red" && (
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: "var(--accent)" }} />
              )}
              {chapter.dot === "black" && (
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: "var(--text-main)" }} />
              )}
              {chapter.dot === "green" && (
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: "var(--green)" }} />
              )}
              {chapter.title}
            </p>

            {chapter.subtitles && (
              <div className="flex flex-wrap gap-1 mt-2">
                {chapter.subtitles.map((sub) => (
                  <span
                    key={sub}
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{ background: "var(--gold-bg)", color: "var(--gold-text)" }}
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