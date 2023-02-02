import { defineStore } from 'pinia'

export const useUserStore = defineStore('storedUser',
	{

		state: () => ({
			name: "Paul"
		}),

		actions: {
			changeName( newName ){
				this.name = newName
			}
		},

		// persist: true
		persist: {
			storage: persistedState.localStorage,
		},

	}

)
