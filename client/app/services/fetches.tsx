
const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API

async function fetchTipsAndStats(email: string){
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

async function fetchEditTips(id: number, tip: string){
    const res = await fetch(`${API_URL}/tip/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: tip
    })
    if (res.ok){
        const data = await res.json()
        return data
    } else {
        throw new Error('Failed to Update Tip')
    }
}

async function fetchRSSFeeds(){
    const res = await fetch(`${API_URL}/rss_feeds`, {
        cache: 'no-cache'
    })
    if (res.ok){
        const data = await res.json()
        return data['data']
    } else {
        throw new Error('Failed to Fetch RSS Data')
    }
}



export {fetchTipsAndStats, fetchEditTips, fetchRSSFeeds}


