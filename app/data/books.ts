export type Book = {
    id: string
    title: string
    description: string
    price: number
    cover: string
    file: string
    chapters: Chapter[]
    badges: string[]
}

export type Chapter = {
    title: string
    dot?: "red" | "black" | "green"
    subtitles?: string[]
}

const books: Book[] = [
    {
        id: "get-fit-uncle-john",
        title: "Get Right With Uncle John",
        description:
            "A complete fitness plan with multiple training levels, exercise videos, and everything you need to get started.",
        price: 24.99,
        cover: "/GetRightWithUncleJohn.jpeg",
        file: "GetRightWithUncleJohn.epub",
        badges: ["Instant download", "Beginner friendly"],
        chapters: [
            { title: "Whats Good!" },
            { title: "How to use this fitness plan?" },
            { title: "Training Red", dot: "red" },
            { title: "Training Black", dot: "black" },
            { title: "Training Green", dot: "green" },
            { title: "Training Schedule"},
            { title: "Reference Page" },
            { 
                title: "Exercise Video Library", 
                subtitles: ["Chest", "Back", "Legs", "Shoulders"],
            },
        ]  
    }
    // ---- Add More Books Here ----
    // {
    //  id:"advanced-training",
    //  title: "Advanced Training With Uncle John",
    //  description: "Take your fitenss to the next level!!",
    //  price: 24.99,
    //  cover: "/advanced-cover.jpeg",
    //  file: "AdvancedTraining.epub",
    //  badges: ["Instant download", "Intermediate"],
    //  chapters:[...]
    // },
]

export function getAllBooks(): Book[] {
    return books
}

export function getBookById(id: string): Book | undefined {
    return books.find((book) => book.id === id)
}