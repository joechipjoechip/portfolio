export function useGetEventPosition( event ){
    let x = 0
    let y = 0

    if( event.touches?.[0] ){
        x = event.touches[0].clientX
        y = event.touches[0].clientY
    } else {
        x = event.offsetX
        y = event.offsetY
    }

    return { x, y }
}