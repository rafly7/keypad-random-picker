const AfterNameWinner = ({listWinner, index}: any) => {
    const splitNameWinner = listWinner[listWinner.length-index-1].result
    return (
      splitNameWinner.map((val: any, index: number) => (
        <p key={index} className="tracking-[0.5px] rounded-[10px] bg-[#2d3436] dark:bg-[#535c68] inline-flex py-[0.5rem] px-[1.25rem] flex-wrap flex-col m-[3px] text-white font-bold">{val}</p>
      ))
    )
  }

  export default AfterNameWinner