import { useSearchParams } from 'react-router-dom'

export const useGetSearchParams = (names: string[]) => {
  const [searchParams] = useSearchParams()

  let res = ''
  let counter = 0
  names.forEach((name) => {
    const param = searchParams.get(name)

    if (param) {
      res += `${counter !== 0 ? '&' : ''}${name}=${param}`
      counter++
    }
  })
  return res
}
