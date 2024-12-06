type Props = {
  list: object,
}

//makes a list from a passed object with each key and value pair
export const SectionList = ({list}: Props) => {
  const listArr = Object.entries(list);

  return (
    <>
      {listArr.map(([key, value]) => (
        <div>
          <p className="font-text text-sm opacity-60">{key}</p>
          <p className="font-text">{value}</p>
        </div>
      ))}
      
    </>
  )
}