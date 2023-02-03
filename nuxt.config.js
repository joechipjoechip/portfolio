// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig(
	{
		ssr: false,

		// buildModules: [
		// 	'nuxt-use-motion'
		// ],

		modules: [
			// '@vueuse/nuxt',
			'@vueuse/motion/nuxt',
			'@pinia/nuxt',
			'@pinia-plugin-persistedstate/nuxt'
		],

		piniaPersistedstate: {
			storage: 'localStorage'
		},

		app: {
			pageTransition: { 
				name: 'page', 
				mode: 'out-in' 
			},
			layoutTransition: { 
				name: 'layout', 
				mode: 'out-in' 
			}
		},		
		
		motions: {
			directives: {
			'pop-bottom': {
					initial: {
						scale: 0,
						opacity: 0,
						y: 100
					},
					visible: {
						scale: 1,
						opacity: 1,
						y: 0
					},
				}
			}
		}
	}

)
