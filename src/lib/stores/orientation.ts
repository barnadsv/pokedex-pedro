/* eslint-disable @typescript-eslint/no-explicit-any */
import { readable } from 'svelte/store';
import { browser } from '$app/environment'

const getRawOrientation: any = (e: any) => {
  if ( !e ) {
    return { alpha: 0, beta: 0, gamma: 0 }
  } else {
    return { alpha: e.alpha, beta: e.beta, gamma: e.gamma }
  }
}

const getOrientationObject = (e: any) => {
  const orientation = getRawOrientation(e);
  return {
    absolute: orientation,
    relative: { 
      alpha: orientation.alpha - baseOrientation.alpha, 
      beta: orientation.beta - baseOrientation.beta, 
      gamma: orientation.gamma - baseOrientation.gamma, 
    }
  }
}

let firstReading = true;
let baseOrientation = getRawOrientation();

export const resetBaseOrientation = () => {
  firstReading = true;
  baseOrientation = getRawOrientation();
}

export const orientation = readable( getOrientationObject, function start( set ) {

  // https://developer.mozilla.org/en-US/docs/Web/API/Window/ondeviceorientation
  const handleOrientation: any = function(e: { alpha: number; beta: number; gamma: number } | undefined) {

    if ( firstReading ) {
      firstReading = false;
      baseOrientation = getRawOrientation(e);
    }

    const o = getOrientationObject(e);
    set( o );
  };

  if (browser) window.addEventListener("deviceorientation", handleOrientation, true);

  return function stop() {
    if (browser) window.removeEventListener("deviceorientation", handleOrientation, true);
  }

});