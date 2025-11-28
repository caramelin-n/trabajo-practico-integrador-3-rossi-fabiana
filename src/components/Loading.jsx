export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 border-8 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-700 font-medium text-xl">Loading...</p>
      </div>
    </div>
  )
}