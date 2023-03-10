import { defineStore } from 'pinia'

export const useUserStore = defineStore('storedUser',
	{

		state: () => ({
			name: "Paul",
			currentStepIndex: 0,
			bgCurrentIndex: 0,
			stepsCount: 0,
			navigation: {
				stepGrabbed: false,
				navbar: {
					isMoving: false,
					position: { x:0, y:0 }
				}
			},
			bgHomeCount: 92,
			animation: {
				config: {
					short: 220,
					medium: 300,
					long: 700
				}
			},
			sound: {
				enabled: true
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

			// BACKGROUND
			setBgCurrentIndex(newIndex){
				if( newIndex <= 4 ){
					this.bgCurrentIndex = newIndex
				} else {
					this.bgCurrentIndex = 0
				}
			},
			setBgCurrentIndexIncrement(){
				if( this.bgCurrentIndex < this.bgHomeCount ){
					this.bgCurrentIndex++
				}
			},

			setBgCurrentIndexDecrement(){
				if( this.bgCurrentIndex > 0 ){
					this.bgCurrentIndex--
				}
			},


			// NAVIGATION
			setStepGrabbed( bool ){
				this.navigation.stepGrabbed = bool
			},

			setNavigationNavbarPosition( obj ){
				this.navigation.navbar.position = obj
			},

			setNavigationNavbarIsMoving( bool ){
				this.navigation.navbar.isMoving = bool
			}
		},

		// @TODO : restablish at true later
		persist: false

	}

)
