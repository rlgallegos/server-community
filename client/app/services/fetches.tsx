


async function FetchTipsAndStats(email: string){
    const [tipsResponse, statisticsResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/tips/${email}`),
        fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/tipstatistics/${email}`),
      ])
  
      if (tipsResponse.ok && statisticsResponse.ok) {
        const tipsData = await tipsResponse.json()
        const statisticsData = await statisticsResponse.json()
        const response = {
            tips: tipsData,
            statistics: statisticsData 
        }
        return response
      } else {
        throw new Error('Failed to Retrieve Data')
      }
}
export {FetchTipsAndStats}