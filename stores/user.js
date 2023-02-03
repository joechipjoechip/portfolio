import { defineStore } from 'pinia'

export const useUserStore = defineStore('storedUser',
	{

		state: () => ({
			name: "Paul",
			currentStep: "bio"
		}),

		actions: {
			setName( newName ){
				this.name = newName
			},

			setCurrentStep( newStep ){
				this.currentStep = newStep
			}
		},

		persist: true

	}

)
