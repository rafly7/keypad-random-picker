const ResultNameWinner = ({listWinner, index}: any) => {
    const splitNameWinner = listWinner[listWinner.length-index-1].result
    return (
      splitNameWinner.map((val: any, index: number) => (
        <div key={index} className="mb-[10px] me-[10px] rounded-[10px] bg-[#95afc0] dark:bg-[#535c68] inline-flex flex-wrap flex-col py-[0.5rem] px-[1.25rem]">
          <div className="inline flex-col flex-wrap">
            <p className="font-bold text-white inline flex-col text-[20px] flex-wrap">{val}</p>
          </div>
        </div>
      ))
    )
  }

  export default ResultNameWinner