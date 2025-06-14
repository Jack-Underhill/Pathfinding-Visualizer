function CanvasGrid() {
    return (
        <div className="flex justify-center items-center">
            <canvas
                width={500}
                height={500}
                className="border border-white bg-black"
            />
        </div>
    )
}

export default CanvasGrid;