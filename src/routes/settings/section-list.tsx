type Props = {
  list: object,
}

//makes a list from a passed object with each key and value pair
export const SectionList = ({list}: Props) => {
  const listArr = Object.entries(list);
  
  function splitCamelCase(str: string) {
    const result = str.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  return (
    <>
      {listArr.map(([key, value]) => (
        <div className="mb-3" key={key}>
          <p className="font-text text-sm opacity-60">{splitCamelCase(key)}</p>
          <p className="font-text">{value}</p>
        </div>
      ))}
      
    </>
  )
}