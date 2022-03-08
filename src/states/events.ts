import constate from "constate";
import { useCallback, useState } from "react";
import { WellEventData } from "@completium/event-well-crank"

export const eventMockup : WellEventData = {
  block : "BL1iKL7XjsMNREMYerhAkC9C8hdnBYrq4mF72c9PkyBk3cLQFQJ",
  op : "onna7P1tgB8UYDyDZGn8xACiNoEbCotQ1CNGtL4tdhXrnGSQ38d",
  source : "KT19EAMugKU416cbA9jL1XcukWArfpv4dLYu",
  time : (new Date()).toISOString()
}

function useEventsState() {
  const [events, setEvents] = useState<Array<WellEventData>>([]);
  const [nbNewEvents, setNbEvents] = useState(0);
  const openEvents = useCallback(() => setNbEvents(prev => 0), [])
  const addEvent = useCallback((e : WellEventData) => {
      setEvents(prev => prev.concat([e]))
      setNbEvents(prev => prev + 1)
  }, [])
  const clearEvents = useCallback(() => {
    setEvents([])
    setNbEvents(0)
  }, [])
  return { events, nbNewEvents, openEvents, addEvent, clearEvents };
}

export const [EventsStateProvider, useEvents, useNbNewEvents, useOpenEvents, useAddEvent, useClearEvents] = constate(
  useEventsState,
  value => value.events,
  value => value.nbNewEvents,
  value => value.openEvents,
  value => value.addEvent, // becomes useSwitchOn
  value => value.clearEvents, // becomes useSwitchOff
);