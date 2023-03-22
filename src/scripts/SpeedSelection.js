import { FASTBALL } from "./PitchSelect"

export const buttonSpeed = document.querySelector('#button-speed')
export const select = document.querySelector('#grid-offspeed')
export const fast = document.querySelector('#grid-fastball-speed')
export const speedOptions = document.querySelectorAll('.speed-option')
export const selectLabel = document.querySelector('#select-label-speed')
export const pitchSelection = document.getElementsByClassName('pitch-cell active')
export const handSelection = document.getElementsByClassName('select-hand active')

export function toggleHiddenSpeed(){
    if(pitchSelection== null)return
    if(pitchSelection[0].innerText == FASTBALL){
        select.classList.add('hidden-speed')
        fast.classList.remove('hidden-speed')
    }
    if(pitchSelection[0].innerText !== FASTBALL){
        fast.classList.add('hidden-speed')
        select.classList.remove('hidden-speed')
    }
}