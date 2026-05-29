import { useSyncExternalStore } from "react";
import { getStoreSnapshot, subscribeStore, type StoreState } from "@/data/store";

export function useStore(): StoreState {
  return useSyncExternalStore(subscribeStore, getStoreSnapshot, getStoreSnapshot);
}

export function useServices() {
  return useStore().services;
}

export function useDoctors() {
  return useStore().doctors;
}

export function useHospitals() {
  return useStore().hospitals;
}

export function useCostItems() {
  return useStore().costItems;
}

export function useBlogPosts() {
  return useStore().blogPosts;
}
