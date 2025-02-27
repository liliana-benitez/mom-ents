import React, { useState, useEffect } from "react"

const PuzzleCard = () => {
  const [pieces, setPieces] = useState([])
  const [completed, setCompleted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    initializePuzzle()
  }, [])

  const initializePuzzle = () => {
    const shuffledPositions = Array.from({ length: 25 }, (_, i) => i).sort(
      () => Math.random() - 0.5
    )

    const shuffledPieces = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      correctPosition: i,
      currentPosition: shuffledPositions[i]
    }))

    setPieces(shuffledPieces)
    setCompleted(false)
    setShowPopup(false)
  }

  const handleDragStart = (e, pieceId) => {
    e.dataTransfer.setData("pieceId", pieceId)
  }

  const handleDrop = (e, targetPosition) => {
    const pieceId = e.dataTransfer.getData("pieceId")
    setPieces((prev) =>
      prev.map((piece) =>
        piece.id === parseInt(pieceId)
          ? { ...piece, currentPosition: targetPosition }
          : piece
      )
    )
  }

  const handleDragOver = (e) => e.preventDefault()

  useEffect(() => {
    const isCompleted = pieces.every(
      (piece) => piece.correctPosition === piece.currentPosition
    )
    if (isCompleted && pieces.length > 0) {
      setCompleted(true)
      setShowPopup(true)
    }
  }, [pieces])

  const toggleHint = () => {
    setShowHint((prev) => !prev)
  }

  return (
    <div className="flex flex-col items-center justify-center bg-pink-50 h-screen">
      <h1 className="text-2xl font-bold mb-4 text-pink-300">
        💓 Happy Valentine's Day 💓
      </h1>

      {/* Wrapping puzzle and hint in a flex container */}
      <div className="flex gap-8">
        {/* Puzzle Grid */}
        <div
          className="grid grid-cols-5 gap-2 w-80 h-80 border-4 border-dashed"
          style={{ position: "relative" }}
        >
          {Array.from({ length: 25 }, (_, position) => (
            <div
              key={position}
              className="w-16 h-16 border border-gray-300"
              onDrop={(e) => handleDrop(e, position)}
              onDragOver={handleDragOver}
              style={{
                position: "absolute",
                top: Math.floor(position / 5) * 64,
                left: (position % 5) * 64
              }}
            >
              {pieces.map(
                (piece) =>
                  piece.currentPosition === position && (
                    <img
                      key={piece.id}
                      src={`/assets/${piece.id}.jpeg`}
                      alt={`Piece ${piece.id}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, piece.id)}
                      className="w-full h-full"
                    />
                  )
              )}
            </div>
          ))}
        </div>

        {/* Hint (Original Image) */}
        {showHint && (
          <div>
            <h2 className="text-lg font-bold text-pink-300 text-center">
              Original Image:
            </h2>
            <img
              src="/assets/original.png"
              alt="Original Image"
              className="mt-2 w-80 h-80 border-2 border-pink-300"
            />
          </div>
        )}
      </div>

      {completed && (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold text-pink-300">🎉 You did it! 🎉</h2>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={initializePuzzle}
          className="mt-4 px-4 py-2 bg-pink-300 text-white rounded-lg"
        >
          Reset Puzzle
        </button>
        <button
          onClick={toggleHint}
          className="mt-4 px-4 py-2 bg-pink-300 text-white rounded-lg"
        >
          {showHint ? "Hide Hint" : "Show Hint"}
        </button>
      </div>

      {/* Popup for the message */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-pink-300">
              Happy Valentine's Day
            </h2>
            <p className="text-lg mt-4 text-pink-600">❤️ I love you ❤️</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 px-4 py-2 bg-pink-300 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PuzzleCard
