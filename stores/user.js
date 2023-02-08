import { defineStore } from 'pinia'

export const useUserStore = defineStore('storedUser',
	{

		state: () => ({
			name: "Paul",
			currentStepIndex: 1,
			stepsCount: 0,
			navigation: {
				navbarPosition: { x:0, y:0 }
			}
		}),

		actions: {
			setName( newName ){
				this.name = newName
			},

			setCurrentStepIndex(newIndex){
				if( newIndex <= this.stepsCount - 1 ){
					this.currentStepIndex = newIndex
				}
			},

			setCurrentStepIndexIncrement(){
				if( this.currentStepIndex < this.stepsCount - 1 ){
					this.currentStepIndex++
				}
			},

			setCurrentStepIndexDecrement(){
				if( this.currentStepIndex > 0 ){
					this.currentStepIndex--
				}
			},

			setStepsCount( size ){
				this.stepsCount = size
			},


			// NAVIGATION
			setNavigationNavbarPosition( obj ){
				this.navigation.navbarPosition = obj
			}
		},

		// @TODO : restablish at true later
		persist: false

	}

)
