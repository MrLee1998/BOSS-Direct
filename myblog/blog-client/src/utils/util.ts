export function setLocal (key:string, value:string)  {
   sessionStorage.setItem(key, value)
}

export function getLocal (key:string) {
  return sessionStorage.getItem(key)
}

export function deleteLocal (key:string)  {
  return sessionStorage.removeItem(key)
}