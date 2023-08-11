import {
  useCallback, useRef, useState, createRef, useEffect,
} from 'react';

export default function useAnimetedList() {
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);
  const [items, setItems] = useState([]);

  const animateRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId);
    removeListener();

    animationEndListeners.current.delete(itemId);
    animateRefs.current.delete(itemId);

    setItems((prevState) => prevState.filter((item) => item.id !== itemId));
    setPendingRemovalItemsIds((prevState) => prevState.filter((id) => itemId !== id));
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animateRef = animateRefs.current.get(itemId);
      const animatedElement = animateRef?.current;
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if (animatedElement && !alreadyHasListener) {
        const onAnimationEnd = () => {
          handleAnimationEnd(itemId);
        };
        const removeListener = () => {
          animatedElement.removeEventListiner('animationend', onAnimationEnd);
        };
        animationEndListeners.current.set(itemId, removeListener);
      }
    });
  }, [pendingRemovalItemsIds, handleAnimationEnd]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;

    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const handleRemoveItems = useCallback((id) => {
    setPendingRemovalItemsIds(
      (prevState) => [...prevState, id],
    );
  }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animateRef = animateRefs.current.get(itemId);

    if (!animateRef) {
      animateRef = createRef();
      animateRefs.current.set(itemId, animateRef);
    }

    return animateRef;
  }, []);

  const renderList = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id);
      const animateRef = getAnimatedRef(item.id);

      return renderItem(item, {
        isLeaving,
        animateRef,
      });
    })
  ), [getAnimatedRef, items, pendingRemovalItemsIds]);

  return {
    setItems,
    handleRemoveItems,
    renderList,
  };
}
