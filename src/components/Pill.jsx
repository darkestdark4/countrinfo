const Pill = ({type, bgcolor, value, addprop = null}) => {
  if(type === 'standard') {
    return <span className={`${bgcolor} mr-2 my-1 px-4 py-1 rounded-xl text-xs`}>{value}</span>
  } else if(type === 'link') {
    return <>
      <a href={addprop.link} target="_blank" rel="noreferrer"
         className={`${bgcolor} mr-2 px-4 py-1 rounded-xl text-xs hover:${addprop.hover}`}>
        {value}
      </a>
    </>
  }
}

export default Pill