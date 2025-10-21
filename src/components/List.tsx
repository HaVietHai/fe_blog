import ImageGrid from "./ImageGrip"


interface IPost {
    id: string,
    userName: string,
    title: string,
    content?: string,
    authorId: string,
    images?: string[]
}

const List = () => {

    const items: IPost[] = [
        {
            id: "1",
            userName:"Hai",
            title: "Good morning erverone.",
            authorId: "1",
            images:[
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeyw8j4TzY9s0k-miFnBLwIZkXRAyrM96lxA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeyw8j4TzY9s0k-miFnBLwIZkXRAyrM96lxA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeyw8j4TzY9s0k-miFnBLwIZkXRAyrM96lxA&s"
            ]
        },
        {
            id: "2",
            userName: "Hai",
            title: `Hôm nay trời đẹp quá! 🌤️
              Exclusive via Binance Wallet
              🔥 Join the Googie revolution!
              Claim your share of the $1,000,000 airdrop — simple, fun, and exclusive for early holders.`,
            authorId: "1"
        },
        {
            id: "3",
            userName: "Hai",
            title: "Good morning erverone.",
            authorId: "1",
            images: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEohhRgHf993CiRrnHaVTp8x_pHqDZU9957Q&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEohhRgHf993CiRrnHaVTp8x_pHqDZU9957Q&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEohhRgHf993CiRrnHaVTp8x_pHqDZU9957Q&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEohhRgHf993CiRrnHaVTp8x_pHqDZU9957Q&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEohhRgHf993CiRrnHaVTp8x_pHqDZU9957Q&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEohhRgHf993CiRrnHaVTp8x_pHqDZU9957Q&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEohhRgHf993CiRrnHaVTp8x_pHqDZU9957Q&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEohhRgHf993CiRrnHaVTp8x_pHqDZU9957Q&s"
            ]
        },
        {
            id: "4",
            userName: "Hai",
            title: `Hôm nay trời đẹp quá! 🌤️
              Exclusive via Binance Wallet
              🔥 Join the Googie revolution!
              Claim your share of the $1,000,000 airdrop — simple, fun, and exclusive for early holders.`,
            authorId: "1"
        },
    ]

    return (
        <>
            {items.map((item) => (
                <div key={item.id} className="bg-[var(--color-brand-dark)] p-4 rounded-[var(--radius-card)] border border-[var(--color-border-soft)]">
                    <div className="flex flex-row">
                        <img alt="UserAvatar" className="w-12 h-12 rounded-full" />
                        <div className="flex flex-col ml-3 flex-1">
                            <div className="flex flex-row">
                                <p className="text-[var(--color-text-main)] text-sm font-bold">{item.userName}</p>
                                <span className="text-sm ml-1 text-[var(--color-text-secondary)]">• 2h</span>
                            </div>
                            <p className="text-[var(--color-text-main)] mt-1 break-words">{item.title}</p>
                            {item.images && (
                                <ImageGrid images={item.images}/>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default List