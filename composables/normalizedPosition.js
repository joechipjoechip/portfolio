import { ref } from 'vue'

import { useEventListener } from "@vueuse/core"

export function useMouseNormalised( element ) {
  // Can handle :
  // - HTMLElement : specific element as reference for the compute
  // - empty : general window as reference for the compute

  // The aim of this function is to provide mouse position
  // with this format : [-1, 1] (from -1 to 1)
  // for both x and y

  const x = ref(0)
  const y = ref(0)
  const isWindow = !element


  // DO THE MAGIC

  
	if( event.touches?.[0] ){

		console.log("compute in touches")
		

			const goodTouch = event.touches[0]
		
		x.value = Math.min(1,
			Math.max(
			-1,
			(((goodTouch.clientX - left) / width) - 0.5) * 2
			)
		)

		y.value = Math.min(1,
			Math.max(
			-1,
			(((goodTouch.clientY - top) / height) - 0.5) * -2
			)
		)
		
	} else {

		console.log("compute in winow")

		if( isWindow ){

		x.value = (((event.clientX +  window.innerWidth / 2) /  window.innerWidth) - 1) * 2

		y.value = (((event.clientY +  window.innerHeight / 2) /  window.innerHeight) - 1) * -2

		} else {

		x.value = (((event.offsetX +  element.value.offsetWidth / 2) /  element.value.offsetWidth) - 1) * 2

		y.value = (((event.offsetY +  element.value.offsetHeight / 2) /  element.value.offsetHeight) - 1) * -2

		}

	}
    


  	return { x, y }

}
