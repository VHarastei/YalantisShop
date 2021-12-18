type PropsType = {
  title: string
  value: string | number
  icon: string
}

export const ProductDescriptionItem: React.FC<PropsType> = ({ title, value, icon }) => {
  return (
    <div className="flex mb-4 w-1/2">
      <img
        src={icon}
        width={64}
        alt="origin icon"
        className="p-1 mr-2 h-16 bg-green-500 rounded-lg"
      />
      <div>
        <h3 className="text-xl font-semibold text-gray-500">{title}</h3>
        <h2 className="text-2xl font-bold ">{value}</h2>
      </div>
    </div>
  )
}
