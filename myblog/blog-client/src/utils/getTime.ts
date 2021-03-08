export function getTime():string {
  let date = new Date;
  let year:number = date.getFullYear()
  let month:number = date.getMonth() + 1
  let day:number = date.getDate()
  let time:string = year+'-'+month+'-'+day;
  return time
}
