import { useSearchParams } from 'react-router-dom'

export const useGetSearchParams = (names: string[]) => {
  const [searchParams] = useSearchParams()

  let res = ''
  names.forEach((name) => {
    const param = searchParams.get(name)
    if (param) {
      res += `&${name}=${param}`
    }
  })
  return res
}
