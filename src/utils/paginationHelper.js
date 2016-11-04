export function startIndex(currentIndex, total, perPage) {
  if (currentIndex===1){
    return 0
  } else {
    return (currentIndex-1) * perPage
  }
}

export function endIndex(currentIndex, total, perPage) {
  if (total < currentIndex ){
    return total
  } else {
    return (currentIndex * perPage)
  }
}