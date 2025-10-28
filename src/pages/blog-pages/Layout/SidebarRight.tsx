
const SidebarRight = () => {
    return (
        <aside className="w-96 border-l border-[var(--color-border-soft)] bg-black p-4">
            <div className="rounded-[var(--radius-card)] border-1 border-gray-500 p-4 backdrop-blur-md">
                <h2 className="font-semibold text-lg mb-2 text-white">Xu hướng</h2>
                <ul className="space-y-2 text-[var(--color-text-secondary)]">
                    <li>#Công nghệAI</li>
                    <li>#LậpTrình</li>
                    <li>#ReactNative</li>
                    <li>#Vite</li>
                    <li>#fyp</li>
                </ul>
            </div>
        </aside>
    )
}

export default SidebarRight