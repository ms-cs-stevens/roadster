import { useEffect, useState, useRef, useCallback } from 'react';

export function useFirestoreQuery(query) {
  const [docs, setDocs] = useState([]);

  const queryRef = useRef(query);

  useEffect(() => {
    if (!queryRef?.curent?.isEqual(query)) {
      queryRef.current = query;
    }
  });

  useEffect(() => {
    if (!queryRef.current) {
      return null;
    }
    const unsubscribe = queryRef.current.onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocs(data);
    });

    return unsubscribe;
  }, [queryRef]);

  return docs;
}

export function useAuthState(auth) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(() => auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    return unsubscribe;
  }, [auth, initializing]);

  return { user, initializing };
}

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export function useMedia(queries, values, defaultValue) {
  const mediaQueryLists = queries.map(q => window.matchMedia(q));
  const getValue = useCallback(() => {
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  }, [mediaQueryLists, values, defaultValue]);

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach(mql => mql.addListener(handler));
    return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
  }, [getValue, mediaQueryLists]);

  return value;
}