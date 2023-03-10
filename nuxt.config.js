// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig(
	{
		ssr: false,

		css: ['@/assets/styles/main.scss'],

		vite: {
			css: {
				preprocessorOptions: {
					scss: {
						additionalData: '@import "@/assets/styles/_variables.scss"; @import "@/assets/styles/_mixins.scss";'
					}
				}
			}
		},

		modules: [
			'@vueuse/motion/nuxt',
			'@pinia/nuxt',
			'@pinia-plugin-persistedstate/nuxt'
		],

		piniaPersistedstate: {
			storage: 'localStorage'
		},

		app: {
			// pageTransition: { 
			// 	name: 'page', 
			// 	mode: 'out-in' 
			// },
			layoutTransition: { 
				name: 'layout', 
				mode: 'out-in' 
			},

			head: {
				title: 'Front-End Developer - Lionel Orsini',
				script: [
					{ src: "./js/sound/sfxr.js", tagPosition: "head" },
					{ src: "./js/sound/riffwave.js", tagPosition: "head" },
				]
			},
		},		
		
		motion: {
			directives: {
				'pop-bottom': {
					initial: {
						scale: 1,
						opacity: 0,
						y: 20
					},
					enter: {
						scale: 1,
						opacity: 1,
						y: 0,

						transition: {
							duration: 1000
						}
					},
				}
			}
		}
	}

)
