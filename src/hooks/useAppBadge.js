import { useState } from 'react';

function useAppBadge() {
  const [counter, setCounter] = useState(1);

  function setBadge() {
    setCounter(counter + 1);
    if (navigator.setAppBadge) {
      navigator.setAppBadge(counter);
    } else if (navigator.setClientBadge) {
      navigator.setClientBadge();
    }
  }

  function clearBadge() {
    setCounter(1);
    if (navigator.clearAppBadge) {
      navigator.clearAppBadge();
    } else if (navigator.clearClientBadge) {
      navigator.clearClientBadge();
    }
  }

  return [setBadge, clearBadge];
}

export default useAppBadge;
