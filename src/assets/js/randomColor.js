/**获取随机的颜色 */
export default function getRandomColor(){
    let x=Math.ceil(Math.random()*256)
    let y=Math.ceil(Math.random()*256)
    let z=Math.ceil(Math.random()*256)
    return `rgb(${x},${y},${z})`
}