import {atom} from "nanostores"



export const ACTIVE = 'active'
export const CLICK = 'pointerdown'
export const TOGGLE_CLASS = 'hidden-pitch'
export const FASTBALL =  'Fastball'
export const SLIDER =  'Slider'
export const CHANGEUP =  'Change-up'
export const CURVE =  'Curve'
export const SPLITER =  'Spliter'
export const TWELVESIXCURVE =  '12-6 Curve'
export const RIGHT = 'Right'
export const LEFT = 'Left'

export const righthandClockPositions = new Map ([
    [ FASTBALL, 12], 
    [ SLIDER, 3],
    [ CHANGEUP, 8],
    [ CURVE, 5],
    [ SPLITER, 6],
    [ TWELVESIXCURVE, 6 ]]
)

export const fastballSpeeds = new Map ([
    [ '25', 70], 
    [ '30', 80],
    [ '35', 85],
    [ '40', 90],
    [ '45', 95],
    [ '50', 100 ],
    [ '55', 105 ],
    [ '60', 115 ],
    [ '65', 120 ]]
)

export const offspeedSpeeds = new Map ([
    [ '25', 50], 
    [ '30', 60],
    [ '35', 65],
    [ '40', 70],
    [ '45', 75],
    [ '50', 80 ],
    [ '55', 85 ],
    [ '60', 95 ],
    [ '65', 100 ]]
)
export const selectOptions = (array, select) => {
    select.addEventListener(CLICK, ()=> {
        array.forEach(selection => selection.classList.remove(ACTIVE))
        select.classList.add(ACTIVE); 
        console.log(select.innerText)
    })}



export let handedness = atom('STATE MANAGE')
    
export const convertClockPositions = (pitchObject) => {
        const activeClass = document.querySelector('.select-hand.active')
        if(activeClass==null)return
        const hand = activeClass.innerText
        if(hand == LEFT) {
            handedness.set(LEFT)
            pitchObject.set(SLIDER, 9)
            pitchObject.set(CHANGEUP, 4)
            pitchObject.set(CURVE, 7)
            console.log(handedness)
        } 
        if (hand == RIGHT){
            handedness.set(RIGHT)
            pitchObject.set(SLIDER, 3)
            pitchObject.set(CHANGEUP, 8)
            pitchObject.set(CURVE, 5)
            console.log(handedness)
        }
        return pitchObject
    }

/*
const pitchSelect = document.querySelectorAll('.pitch-cell');
const select = document.querySelector(CHANGEUP)
const button = document.querySelector('#button')
const pitchOptions = document.querySelectorAll('.option-pitch')
const selectLabel = document.querySelector('#select-label-pitch')
const selectHandedness = document.querySelectorAll('.select-hand')



const selectOptions = (array, select) => {
    select.addEventListener(CLICK, ()=> {
        array.forEach(selection => selection.classList.remove(ACTIVE))
        select.classList.add(ACTIVE); 
        console.log(select.innerText)
    })}
    
const setSelectTitle = (event) => {
    const divElement = document.querySelector(`div[id="${event.target.id}"]`).textContent
    selectLabel.innerText = divElement
    }
    
pitchSelect.forEach(pitch => selectOptions(pitchSelect,pitch))
selectHandedness.forEach(hand => selectOptions(selectHandedness,hand))


pitchOptions.forEach(option => {
    option.addEventListener(CLICK, event => {
        setSelectTitle(event)
        
    })
})

const handselect = convertClockPositions(righthandClockPositions)
console.log(handselect)

button.addEventListener(CLICK, function(event){
    event.preventDefault()
})*/