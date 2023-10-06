type IObj = Record<any, any>
export function objIsEmpty(obj: IObj) {
  return Object.keys(obj).length === 0 ? true : false
}
