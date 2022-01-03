import { useSearchParams } from 'react-router-dom'

export const useGetSearchParams = (names: string[]) => {
  const [searchParams] = useSearchParams()

  let res = ''
  names.forEach((name, index) => {
    const param = searchParams.get(name)
    if (param) {
      res += `${index !== 0 ? '&' : ''}${name}=${param}`
    }
  })
  return res
}
