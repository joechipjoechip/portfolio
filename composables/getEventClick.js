export function useEventClick( event ){
    let x = 0
    let y = 0

    if( event.touches?.[0] ){
        console.log("composable click : mobile : event : ", event)
        x = event.touches[0].clientX
        y = event.touches[0].clientY
    } else {
        console.log("composable click : mobile : desktop : ", event)
        x = event.x
        y = event.y
    }

    return { x, y }
}